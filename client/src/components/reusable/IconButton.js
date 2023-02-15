import React from 'react';
import getClass from '../../utils/getClass';

const IconButton = ({ size = 'medium', children, onClick, className }) => {
    const prefix = 'icon';
    const options = ['small', 'medium', 'large'];

    return (
        <div
            className={`icon-button ${className} ${getClass(
                prefix,
                options,
                size
            )}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default IconButton;
