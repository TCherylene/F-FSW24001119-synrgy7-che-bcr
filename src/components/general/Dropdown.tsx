import React, { useState } from 'react';
import {
    Dropdown as DropdownComponent,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';

function Dropdown({ direction, classMenu, classButton, classItem, dataValue }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="d-flex p-5">
            <DropdownComponent className="filter__dropdown w-100" isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                <DropdownToggle className={classButton} caret>Dropdown</DropdownToggle>
                <DropdownMenu className={classMenu} >
                    <DropdownItem className={classItem} data-value={dataValue}>Dengan Supir</DropdownItem>
                </DropdownMenu>
            </DropdownComponent>
        </div>
    );
}

Dropdown.propTypes = {
    direction: PropTypes.string,
};

export default Dropdown;