import React from 'react';
import ReactModal from 'react-modal';
import InternalLink from '../reusable/InternalLink';

const LoginModal = ({ open, closeModal }) => {
    return (
        <ReactModal
            contentLabel='Login modal'
            isOpen={open}
            className='login-modal modal'
            onRequestClose={closeModal}
        >
            <h3>Please log in to proceed</h3>
            <h5>You must be logged in to perform this action.</h5>
            <div className='button-container'>
                <InternalLink
                    to='/login'
                    variant='button'
                    className='rounded-md primary'
                    onClick={closeModal}
                >
                    Log in
                </InternalLink>
            </div>
        </ReactModal>
    );
};

export default LoginModal;
