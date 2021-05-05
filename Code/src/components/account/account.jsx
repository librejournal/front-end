import React from "react";

import Swal from "sweetalert2";

import { Grid, Typography, Button } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import {
    mapStateToAccount,
    mapDispatchToAccount,
} from "../../redux/mapFunctions";

const useStyles = () => ({
    accountContainer: {
        width: "max(25vw,250px)",
        padding: "2vh 2vw",
        minHeight: "60vh",
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        border: "2px solid #1687a7",
        alignItems: "center",
    },
});

const Account = ({ classes, loggedUser, onLogoutUser }) => {
    const logoutRequest = async () => {
        await axios
            .post(
                "http://localhost:9001/api/auth/logout",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${loggedUser.token}`,

                        //"Access-Control-Allow-Origin": "*",
                        //"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    },
                }
            )
            .then((response) => {
                onLogoutUser();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have logged out successfully",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Grid container justify="center" className={classes.accountContainer}>
            <Typography color="primary" variant="h4">
                Account Info
            </Typography>
            <Grid item xs={12}>
                <Typography color="primary" variant="h6">
                    Username:
                </Typography>
                <Typography variant="subtitle1">
                    {loggedUser.username}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="primary" variant="h6">
                    Email:
                </Typography>
                <Typography variant="subtitle1">{loggedUser.email}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="primary" variant="h6">
                    First Name:
                </Typography>
                <Typography variant="subtitle1">
                    {loggedUser.first_name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="primary" variant="h6">
                    Last Name:
                </Typography>
                <Typography variant="subtitle1">
                    {loggedUser.last_name}
                </Typography>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={() => logoutRequest()}
            >
                LOGOUT
            </Button>
        </Grid>
    );
};

export default compose(
    connect(mapStateToAccount, mapDispatchToAccount),
    withStyles(useStyles)
)(Account);
