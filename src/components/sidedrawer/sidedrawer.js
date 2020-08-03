import React from 'react';
import './sidedrawer.css';
import ProductMenu from "../product/productMenu";

const SideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <ul>
                <ProductMenu backendBaseUrl={props.backendBaseUrl}/>
            </ul>
        </nav>
    );
};

export default SideDrawer;