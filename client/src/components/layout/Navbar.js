import React, { useContext, useEffect, useState, Fragment } from 'react';
import InternalLink from '../reusable/InternalLink';
import AuthContext from '../../context/auth/authContext';
import Avatar from '../reusable/Avatar';
import IconButton from '../reusable/IconButton';
import ChevronDown from '../icons/ChevronDown';
import logo from '../../assets/img/logo.png';
import UserIcon from '../../assets/img/profile.png';
import Menu from '../icons/Menu';
import Dropdown from '../reusable/Dropdown';
import ClickAwayListener from 'react-click-away-listener';
import { useHistory, useLocation } from 'react-router-dom';
import userContext from '../../context/users/userContext';
import systemContext from '../../context/System/systemContext';
import LoginModal from '../modals/LoginModal';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const history = useHistory();

    const { isAuthenticated, logout, user, loadUser } = useContext(AuthContext);
    const { profile, getUserProfile } = useContext(userContext);
    const { loginModal, closeLoginModal } = useContext(systemContext);

    const location = useLocation();

    const navLinks = [
        { label: 'home', path: '/' },
        { label: 'about', path: '/about' },
        { label: 'recipes', path: '/recipes' },
    ];

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user) {
            getUserProfile(user._id);
        }
        // eslint-disable-next-line
    }, [user]);

    const handleLogout = () => {
        setShowDropdown(false);
        history.push('/');
        logout();
    };

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const guestLink = (
        <Fragment>
            <InternalLink to='/login' className='login'>
                login
            </InternalLink>
            <InternalLink
                to='/register'
                variant='button'
                className='register primary small rounded-md'
            >
                sign up
            </InternalLink>
        </Fragment>
    );

    const authLink = (
        <div className='navbar-user-container'>
            <ClickAwayListener onClickAway={closeDropdown}>
                <div className='navbar-user'>
                    <Avatar
                        src={profile?.image?.location || UserIcon}
                        alt={profile?.image?.key || 'User icon'}
                        size='small'
                    />
                    <div
                        className='navbar-user__dropdown-trigger'
                        onClick={toggleDropdown}
                    >
                        <div className='navbar-user__message'>
                            HI, {user ? user.username : 'User'}
                        </div>
                        <IconButton>
                            <ChevronDown
                                fill='white'
                                width='20px'
                                height='20px'
                            />
                        </IconButton>
                    </div>
                </div>
                <Dropdown onClose={closeDropdown} open={showDropdown}>
                    {user ? (
                        <InternalLink
                            className='dropdown'
                            to={`/profile/${user._id}`}
                        >
                            Profile
                        </InternalLink>
                    ) : (
                        ''
                    )}
                    {user && user.type === 'admin' ? (
                        <InternalLink className='dropdown' to='/admin'>
                            Dashboard
                        </InternalLink>
                    ) : (
                        ''
                    )}

                    <button className='dropdown' onClick={handleLogout}>
                        logout
                    </button>
                </Dropdown>
            </ClickAwayListener>
        </div>
    );

    if (location.pathname.includes('/admin')) {
        return (
            <Fragment>
                <div className='navbar'>
                    <div className='container'>
                        <div className='logo-container'>
                            <InternalLink to='/'>
                                <img src={logo} alt='Feast In Logo' />
                            </InternalLink>
                        </div>
                        <nav className={showMenu ? '' : 'collapsed'}>
                            {isAuthenticated ? authLink : guestLink}
                        </nav>
                        <div
                            className='menu-container'
                            onClick={() => setShowMenu((prev) => !prev)}
                        >
                            <Menu fill='#f15a2e' width='30px' height='30px' />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <div className='navbar'>
            <div className='container'>
                <div className='logo-container'>
                    <InternalLink to='/'>
                        <img src={logo} alt='Feast In Logo' />
                    </InternalLink>
                </div>
                <nav className={showMenu ? '' : 'collapsed'}>
                    <div className='nav-link-container'>
                        {navLinks.map(({ label, path }, index) => (
                            <InternalLink key={index} to={path}>
                                {label}
                            </InternalLink>
                        ))}
                    </div>
                    {isAuthenticated ? authLink : guestLink}
                </nav>
                <div
                    className='menu-container'
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    <Menu fill='#f15a2e' width='30px' height='30px' />
                </div>
            </div>
            <LoginModal open={loginModal} closeModal={closeLoginModal} />
        </div>
    );
};

export default Navbar;
