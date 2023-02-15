import React from 'react';

const ExternalLink = ({ to, children, className }) => (
    <a
        href={to}
        target='_blank'
        rel='noreferrer noopener'
        className={`internal-link ${className}`}
    >
        {children}
    </a>
);

export default ExternalLink;
