import React from 'react';
import ReactModal from 'react-modal';
import InternalLink from '../reusable/InternalLink';

const SessionModal = ({ open, setOpen }) => {
    return (
        <ReactModal
            contentLabel='Session modal'
            isOpen={open}
            className='session-modal modal'
        >
            <h3>Session Expired</h3>
            <h5>Please click on the button to login again.</h5>
            <div className='button-container'>
                <InternalLink
                    to='/login'
                    variant='button'
                    className='rounded-md primary'
                    onClick={() => setOpen(false)}
                >
                    Log in
                </InternalLink>
            </div>
        </ReactModal>
    );
};

export default SessionModal;
