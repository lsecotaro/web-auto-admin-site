import React from "react";
import {
    Link
} from "react-router-dom";

import './toolbar.css';
import DrawerToggleButton from "../sidedrawer/drawerToggleButton";
import ProductMenu from "../product/productMenu";

const Toolbar = props => (
  <header className="toolbar">
      <nav className="toolbar_navegation">
          <div className="toolbar_toggle-button">
              <DrawerToggleButton click={props.drawerClickHandler}/>
          </div>
          <div className="toolbar_logo"> <Link to={"/"}> THE LOGO</Link></div>
          <div className="spacer"/>
          <div className="toolbar_navegation-items">
              <ul>
                  <li><Link to={"/product-form"}>Administrar</Link></li>
                  <ProductMenu items={props.items} backendBaseUrl={props.backendBaseUrl}/>
              </ul>

          </div>
      </nav>
  </header>
);

export default Toolbar;