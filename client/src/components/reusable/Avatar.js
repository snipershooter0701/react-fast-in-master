import React from 'react';

const Avatar = ({ src, alt, size }) => {
    const getSize = (size) => {
        switch (size) {
            case 'small':
                return 'avatar-small';
            case 'large':
                return 'avatar-large';
            default:
                return 'avatar-medium';
        }
    };

    return (
        <div className='avatar-container '>
            <img src={src} alt={alt} className={`avatar ${getSize(size)}`} />
        </div>
    );
};

export default Avatar;
