import React from "react";
import { Link } from "react-router-dom";

import { withLocation } from "../../HOC";

class NavLink extends React.Component {
  render() {
    const { children, location, to, ...props } = this.props;
//  active 7af
    const isActive =
      location.pathname === "/" + to ||
      (location.pathname === "/" && to === "all")
        ? "nav-link__active"
        : "";

    return (
      <Link to={to} {...props} className={isActive}>
        {children}
      </Link>
    );
  }
}

export default withLocation(NavLink);
