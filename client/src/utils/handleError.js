import axios from 'axios';
import setAuthToken from './setAuthToken';

const handleError = async (error, callback = false) => {
    if (error.response && error.response.data) {
        if (!error.response.data.success) {
            switch (error.response.data.message) {
                case 'Your token has expired please login again to continue':
                    try {
                        const res = await axios.post('/api/auth/token');
                        if (res.data.success) {
                            localStorage.setItem(
                                'token',
                                res.data.access_token
                            );
                            setAuthToken(res.data.access_token);
                            if (callback) {
                                return callback();
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    return;
                case 'Refresh token not set':
                    // force logout, prompt modal
                    console.log(error.response.data);
                    return;
                case 'Unauthorized request':
                    console.log('unauthorized');
                    return;
                default:
                    console.log(error);
                    return;
            }
        }
    } else {
        console.error(error);
    }
    console.log(error);
};

export default handleError;
