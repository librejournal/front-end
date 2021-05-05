import React, { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";

import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
    signinContainer: {
        width: "max(25vw,250px)",
        padding: "2vh 2vw",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
        border: "2px solid #1687a7",
    },
});

const SigninForm = ({ classes }) => {
    const initialState = {
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    };
    const [user, setUser] = useState(initialState);

    const addInfo = (infoType) => (event) =>
        setUser({ ...user, [infoType]: event.target.value });

    const registerRequest = async (info) => {
        await axios
            .post("http://localhost:9001/api/auth/register", info, {
                headers: {
                    "Content-Type": "application/json",
                    //"Access-Control-Allow-Origin": "*",
                    //"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
            })
            .then(function (response) {
                Swal.fire(
                    "Register Success",
                    "We have sent an e-mail to you. Don't forget to verify your account before continue",
                    "success"
                );
                setUser(initialState);
            })
            .catch(function (error) {
                const passwordError = error.response.data.password;
                const emailError = error.response.data.email;
                setUser(initialState);
                Swal.fire(
                    "Register Failed",
                    emailError === undefined ? passwordError[0] : emailError[0],
                    "error"
                );
            });
    };

    return (
        <Grid container justify="center" className={classes.signinContainer}>
            <Typography color="primary" variant="h4">
                Register Form
            </Typography>
            <>
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="Username"
                    value={user.username}
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                    onChange={addInfo("username")}
                />
                <TextField
                    error={
                        user.email === "" || user.email.includes("@")
                            ? false
                            : true
                    }
                    id="standard-basic"
                    color="primary"
                    label="Email"
                    value={user.email}
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                    onChange={addInfo("email")}
                />
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="Password"
                    type="password"
                    value={user.password}
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                    onChange={addInfo("password")}
                />
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="First Name"
                    value={user.first_name}
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                    onChange={addInfo("first_name")}
                />
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="Last Name"
                    value={user.last_name}
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                    onChange={addInfo("last_name")}
                />
            </>
            <Button
                variant="contained"
                color="primary"
                onClick={() => registerRequest(user)}
            >
                REGISTER
            </Button>
        </Grid>
    );
};

export default withStyles(useStyles)(SigninForm);
