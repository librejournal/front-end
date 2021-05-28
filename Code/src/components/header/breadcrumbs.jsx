import React from "react";

import { Typography, Breadcrumbs } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { compose } from "recompose";

const useStyles = () => ({
    headerMenuTextElements: {
        cursor: "pointer",
    },
});

const MyBreadcrumbs = ({ classes, loggedUser }) => (
    <Breadcrumbs separator="|" aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none" }}>
            <Typography className={classes.headerMenuTextElements}>
                Home
            </Typography>
        </Link>
        <Link
            to={loggedUser.token === "" ? "/menu2" : "/stories"}
            style={{ textDecoration: "none" }}
        >
            <Typography className={classes.headerMenuTextElements}>
                {loggedUser.token === "" ? "Menu#2" : "Stories"}
            </Typography>
        </Link>
        <Link
            to={loggedUser.token === "" ? "/menu3" : "/createstory"}
            style={{ textDecoration: "none" }}
        >
            <Typography className={classes.headerMenuTextElements}>
                {loggedUser.token === "" ? "Menu#3" : "Create a story"}
            </Typography>
        </Link>
        <Link
            to={loggedUser.token === "" ? "/login" : "/account"}
            style={{ textDecoration: "none" }}
        >
            <Typography className={classes.headerMenuTextElements}>
                {loggedUser.token === "" ? "Login/Register" : "Account"}
            </Typography>
        </Link>
    </Breadcrumbs>
);

export default compose(withStyles(useStyles))(MyBreadcrumbs);
