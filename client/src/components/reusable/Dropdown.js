import React from 'react';

const Dropdown = ({ open, children }) => {
    return (
        <div className={`dropdown-container ${open ? 'collapsed' : ''}`}>
            {children}
        </div>
    );
};

export default Dropdown;
