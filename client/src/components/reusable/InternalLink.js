import React from 'react';
import { Link } from 'react-router-dom';
import getClass from '../../utils/getClass';

const InternalLink = ({
    to,
    props,
    variant,
    className = '',
    onClick,
    children,
}) => {
    const prefix = 'link';
    const options = ['underlined', 'button', 'text'];

    return (
        <Link
            to={{
                pathname: to,
                props,
            }}
            onClick={onClick}
            className={`internal-link ${className} ${getClass(
                prefix,
                options,
                variant
            )}`}
        >
            {children}
        </Link>
    );
};

export default InternalLink;
