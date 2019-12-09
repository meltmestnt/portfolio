import React, { Component } from "react";
import SearchField from "./../components/SearchField";
import RefreshComponent from "./../components/RefreshComponent";
import MenuBurger from "./../components/MenuBurger";
export class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-content">
          <MenuBurger></MenuBurger>
          <RefreshComponent></RefreshComponent>
          <SearchField placeh="City or Zip code"></SearchField>
        </div>
      </div>
    );
  }
}

export default Navbar;
