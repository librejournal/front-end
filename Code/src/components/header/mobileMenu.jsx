import React from "react";

import { Typography, Menu, MenuItem } from "@material-ui/core";
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
            <Link
                to={loggedUser.token === "" ? "/menu2" : "/stories"}
                style={{ textDecoration: "none", width: "100%" }}
            >
                <Typography color="primary">
                    {loggedUser.token === "" ? "Menu#2" : "Stories"}
                </Typography>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link
                to={loggedUser.token === "" ? "/menu3" : "/createstory"}
                style={{ textDecoration: "none", width: "100%" }}
            >
                <Typography color="primary">
                    {loggedUser.token === "" ? "Menu#3" : "Create a story"}
                </Typography>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <Link
                to={loggedUser.token === "" ? "/login" : "/account"}
                style={{ textDecoration: "none", width: "100%" }}
            >
                <Typography color="primary">
                    {loggedUser.token === "" ? "Login" : "Account"}
                </Typography>
            </Link>
        </MenuItem>
    </Menu>
);

export default compose(withStyles(useStyles))(MobileMenu);
