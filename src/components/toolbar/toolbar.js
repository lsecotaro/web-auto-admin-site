import React from "react";
import './toolbar.css';
import DrawerToggleButton from "../sidedrawer/drawerToggleButton";

const Toolbar = props => (
  <header className="toolbar">
      <nav className="toolbar_navegation">
          <div className="toolbar_toggle-button">
              <DrawerToggleButton click={props.drawerClickHandler}/>
          </div>
          <div className="toolbar_logo"> <a href="/"> THE LOGO</a></div>
          <div className="spacer"/>
          <div className="toolbar_navegation-items">
              <ul>
                  {props.items.map((item) => (
                      <li><a href="/">{item.name}</a></li>
                  ))}
              </ul>
          </div>
      </nav>
  </header>
);

export default Toolbar;