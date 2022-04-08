import React from "react";
import { Link } from "react-router-dom";

import { withLocation } from "../../HOC";

class NavLink extends React.Component {
  render() {
    const { children, location, to, ...props } = this.props;
    const isActive =
      location.pathname === "/" + to ||
      (location.pathname === "/" && to === "all")
        ? "nav-link nav-link__active"
        : "nav-link";

    return (
      <Link to={to} {...props} className={isActive}>
        {children}
      </Link>
    );
  }
}

export default withLocation(NavLink);
