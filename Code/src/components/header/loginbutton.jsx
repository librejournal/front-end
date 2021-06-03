import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToPropsHeader } from "../../redux/mapFunctions";

const useStyles = () => ({
    loginButton: {
        display: "flex",
    },
    loginButtonIcon: {
        display: "flex",
        alignItems: "center",
        "& svg": {
            fill: "white",
            height: "2rem",
        },
    },
});

const LoginButton = ({ classes, loggedUser }) => (
    <Link
        to={loggedUser.token === "" ? "/login" : "/account"}
        style={{ textDecoration: "none" }}
    >
        {loggedUser.token === "" ? (
            <Grid item xs={12} className={classes.loginButton}>
                <Grid item xs={4} className={classes.loginButtonIcon}>
                    <AccountCircleIcon />
                </Grid>
                <Grid item xs={8}>
                    <Typography color="secondary" variant="h6">
                        Login
                    </Typography>
                    <Typography color="secondary" variant="subtitle2">
                        or Register
                    </Typography>
                </Grid>
            </Grid>
        ) : (
            <Typography className={classes.headerMenuTextElements}>
                Account
            </Typography>
        )}
    </Link>
);

export default compose(
    connect(mapStateToPropsHeader),
    withStyles(useStyles)
)(LoginButton);
