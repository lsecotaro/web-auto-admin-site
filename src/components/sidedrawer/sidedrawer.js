import React from 'react';
import './sidedrawer.css';

const SideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                {props.items.map((item) => (
                    <li><a href="/">{item.name}</a></li>
                ))}
            </ul>
        </nav>
    );
};

export default SideDrawer;