import React, { useState, useEffect } from "react";

import axios from "axios";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";

import { connect } from "react-redux";

import {
    mapStateToPropsLogin,
    mapDispatchToPropsLogin,
} from "../../redux/mapFunctions";

const useStyles = () => ({
    loginContainer: {
        width: "max(25vw,250px)",
        padding: "2vh 2vw",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
        border: "2px solid #1687a7",
    },
});

const LoginForm = ({ classes, loggedUser, onLoginUser, onStateUser }) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (loggedUser.token !== "") {
            window.location.href = "/account";
        }
    }, [loggedUser.token]);

    const addInfo = (infoType) => (event) =>
        setUser({ ...user, [infoType]: event.target.value });

    const registerRequest = async (info) => {
        await axios
            .post("http://localhost:9001/api/auth/login", info, {
                headers: {
                    "Content-Type": "application/json",

                    //"Access-Control-Allow-Origin": "*",
                    //"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            })
            .then((response) => {
                const token = response.data.token;
                onLoginUser(token);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Grid container justify="center" className={classes.loginContainer}>
            <Typography color="primary" variant="h4">
                Login Form
            </Typography>
            <>
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="Email"
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                    onChange={addInfo("email")}
                />
                <TextField
                    id="standard-basic"
                    color="primary"
                    type="password"
                    label="Password"
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                    onChange={addInfo("password")}
                />
            </>
            <Button
                variant="contained"
                color="primary"
                onClick={() => registerRequest(user)}
            >
                LOG IN
            </Button>
        </Grid>
    );
};

export default compose(
    connect(mapStateToPropsLogin, mapDispatchToPropsLogin),
    withStyles(useStyles)
)(LoginForm);
