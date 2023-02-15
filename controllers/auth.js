const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Token = require('../models/token');
const Profile = require('../models/profile');
const userValidation = require('../middlewares/validations/userValidation');
const isAdmin = require('../helpers/roleTypes');
const JwtHelper = require('../helpers/JwtHelper');
const config = require('../config/keys');

const router = express.Router();
router.use(cors());

// @route 	POST /api/auth/register
// @desc 	Create new user
// @access	Public/Private
router.post('/register', [userValidation], async (req, res) => {
    const userData = ({ username, email, password, type } = req.body);

    // Authorization check when type of user to be created is an admin
    if (type && isAdmin(type)) {
        const token = req.header('access-token');
        if (!token)
            return res.status(401).json({
                success: false,
                message: 'Access token is not provided',
            });
        try {
            const secret = process.env.JWT_TOKEN_SECRET || config.JWT_SECRET;
            const decoded = jwt.verify(token, secret);

            if (decoded && !isAdmin(decoded.type)) {
                return res.status(403).json({
                    success: false,
                    message:
                        'Action denied. You do not have permission to perform this request',
                });
            }
        } catch (error) {
            const message = JwtHelper.handleError(error);
            return res.status(401).json({ success: false, message });
        }
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: 'An account with that email already exists',
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        hash && (userData.password = hash);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while encrypting password',
        });
    }

    try {
        const newUser = await User.create(userData);

        if (newUser) {
            const { _id, username, email, type } = newUser;
            const payload = {
                _id,
                username,
                email,
                type,
            };
            await Profile.create({ user: _id });
            const tokens = await generateTokens(payload);

            res.status(200)
                .cookie('firt', tokens.refresh_token, {
                    httpOnly: true,
                    maxAge: 2592000000,
                })
                .json({ success: true, access_token: tokens.access_token });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: 'Error creating account' });
    }
});

// @route 	POST /api/auth/login
// @desc 	Authenticate user
// @access 	Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: 'User does not exist' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

    try {
        const authenticated = await bcrypt.compare(password, user.password);

        if (authenticated) {
            const { _id, username, email, type } = user;
            const payload = {
                _id,
                username,
                email,
                type,
            };

            const tokens = await generateTokens(payload);

            res.status(200)
                .cookie('firt', tokens.refresh_token, {
                    httpOnly: true,
                    maxAge: 2592000000,
                })
                .json({ success: true, access_token: tokens.access_token });
        } else {
            return res
                .status(401)
                .json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route	DELETE /api/auth/logout
// @desc 	Logout user
// @access	Private
router.delete('/logout', async (req, res) => {
    const { firt: refresh_token } = req.cookies;

    if (!refresh_token) {
        return res
            .status(400)
            .json({ success: false, message: 'Refresh token not set' });
    }

    try {
        const decoded = jwt.verify(
            refresh_token,
            process.env.JWT_REFRESH_TOKEN_SECRET || config.JWT_REFRESH_SECRET
        );
        const { _id } = decoded;

        if (!_id) {
            return res
                .status(401)
                .json({ success: false, message: 'No payload present' });
        }

        const refreshTokensFound = await Token.find({ belongs_to: _id });

        if (!refreshTokensFound || !refreshTokensFound.length) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token does not belong to anyone',
            });
        }
        try {
            await Promise.all(
                refreshTokensFound.map(async (storedToken) => {
                    // Compare provided refresh token with existing refresh tokens in db
                    if (
                        bcrypt.compare(refresh_token, storedToken.refresh_token)
                    ) {
                        // Deletes the token for that device.
                        await Token.findByIdAndDelete(storedToken._id);
                    }
                })
            );

            res.clearCookie('firt');
            res.status(200).json({
                success: true,
                message: 'Succesfully logged out',
            });
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    } catch (error) {
        const message = JwtHelper.handleError(error);
        return res.status(401).json({ success: false, message });
    }
});

// @route 	/api/auth/token
// @desc 	Create new access token
// @access	Public
router.post('/token', async (req, res) => {
    const { firt: refresh_token } = req.cookies;
    let tokenId = '';

    if (!refresh_token) {
        return res
            .status(401)
            .json({ success: false, message: 'Refresh token not set' });
    }
    //Verify token and check for matching token in DB
    try {
        const decoded = jwt.verify(
            refresh_token,
            process.env.JWT_REFRESH_TOKEN_SECRET || config.JWT_REFRESH_SECRET
        );
        const { _id } = decoded;
        if (!_id) {
            return res
                .status(401)
                .json({ success: false, message: 'No payload present' });
        }

        const refreshTokensFound = await Token.find({ belongs_to: _id });

        if (!refreshTokensFound || !refreshTokensFound.length) {
            return res.status(401).json({
                success: false,
                message: 'Refresh token does not belong to anyone',
            });
        }

        try {
            let found = false;

            refreshTokensFound.map((refreshToken) => {
                if (bcrypt.compare(refresh_token, refreshToken.refresh_token)) {
                    tokenId = refreshToken._id;
                    found = true;
                }
            });
            if (!found) {
                return res.status(401).json({
                    success: false,
                    message: 'Refresh Token does not match existing tokens',
                });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: error.message });
        }
    } catch (error) {
        const message = JwtHelper.handleError(error);
        return res.status(401).json({ success: false, message });
    }

    //Create new access token, generate new refresh token and update old refresh token in db
    try {
        const { _id, username, email, type } = jwt.verify(
            refresh_token,
            process.env.JWT_REFRESH_TOKEN_SECRET || config.JWT_REFRESH_SECRET
        );
        const payload = {
            _id,
            username,
            email,
            type,
        };
        const access_token = JwtHelper.generateAccessToken(payload);
        const new_refresh_token = JwtHelper.generateRefreshToken(payload);
        try {
            const saltRounds = 10;
            const hashedNewRefreshToken = await bcrypt.hash(
                new_refresh_token,
                saltRounds
            );

            try {
                await Token.findOneAndUpdate(
                    { _id: tokenId },
                    {
                        refresh_token: hashedNewRefreshToken,
                        lastModifiedDate: new Date(),
                    }
                );
            } catch (error) {
                console.log('Error while updating new refresh token');
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error while encrypting refresh token',
            });
        }

        if (access_token)
            return res.status(200).json({ success: true, access_token });
    } catch (error) {
        const message = JwtHelper.handleError(error);
        return res.status(401).json({ success: false, message });
    }
});

const generateTokens = async (payload) => {
    const access_token = JwtHelper.generateAccessToken(payload);
    const refresh_token = JwtHelper.generateRefreshToken(payload);
    const tokenData = {
        refresh_token,
        belongs_to: payload._id,
    };
    // Encrypting refresh token before storing in DB
    try {
        const saltRounds = 10;
        const hashedToken = await bcrypt.hash(refresh_token, saltRounds);
        hashedToken && (tokenData.refresh_token = hashedToken);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while encrypting refresh token',
        });
    }

    try {
        await Token.create(tokenData);
    } catch (error) {
        console.log(error.message);
    }

    return {
        access_token,
        refresh_token,
    };
};

module.exports = router;
