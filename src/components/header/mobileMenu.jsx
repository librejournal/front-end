import React from "react";

import { Typography, Menu, MenuItem, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { compose } from "recompose";

const useStyles = () => ({});

const MobileMenu = ({ classes, loggedUser, anchorEl, handleClose }) => (
  <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
  >
    <MenuItem onClick={handleClose}>
      <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
        <Typography color="primary">Home</Typography>
      </Link>
    </MenuItem>
    <MenuItem onClick={handleClose}>
      <Link to="/about" style={{ textDecoration: "none", width: "100%" }}>
        <Typography color="primary">About</Typography>
      </Link>
    </MenuItem>
    {loggedUser.token ? (
      <MenuItem onClick={handleClose}>
        <Link
          to={"/dashboard"}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Typography color="primary">Dashboard</Typography>
        </Link>
      </MenuItem>
    ) : null}

    <MenuItem onClick={handleClose}>
      <Link
        to={loggedUser.token === "" ? "/login" : "/account"}
        style={{ textDecoration: "none", width: "100%" }}
      >
        {loggedUser.token && loggedUser.has_pending_referral ? (
          <Badge badgeContent={"!"} color="error">
            <Typography color="primary">
              {loggedUser.token === "" ? "Login" : "Account"}
            </Typography>
          </Badge>
        ) : (
          <Typography color="primary">
            {loggedUser.token === "" ? "Login" : "Account"}
          </Typography>
        )}
      </Link>
    </MenuItem>
  </Menu>
);

export default compose(withStyles(useStyles))(MobileMenu);
