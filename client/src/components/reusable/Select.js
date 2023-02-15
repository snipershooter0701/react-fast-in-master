import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import Dropdown from './Dropdown';
import ChevronDown from '../icons/ChevronDown';

const Select = ({ options, value, onChange }) => {
    const [open, setOpen] = useState(false);

    const closeDropdown = () => {
        setOpen(false);
    };

    const setValue = (selectedValue) => {
        onChange(selectedValue);
        closeDropdown();
    };

    return (
        <ClickAwayListener onClickAway={closeDropdown}>
            <div className='select-container'>
                <ChevronDown fill='#f15a2e' width='20px' height='20px' />
                <div className='selected' onClick={() => setOpen(true)}>
                    {value}
                </div>
                <Dropdown onClose={closeDropdown} open={open}>
                    {options.map(({ label, value }) => (
                        <div key={value} onClick={() => setValue(value)}>
                            {label}
                        </div>
                    ))}
                </Dropdown>
            </div>
        </ClickAwayListener>
    );
};

export default Select;
