import React, { useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import {
  mapStateToPropsLogin,
  mapDispatchToPropsLogin,
} from "../../redux/mapFunctions";

const useStyles = () => ({
  loginContainer: {
    width: "max(20vw,250px)",
    padding: "2vh 2vw",
    height: "500px",
    maxHeight: "50vh",
    overflowY: "auto",
    display: "flex",
    alignItems: "space-around",
    justifyContent: "center",
    textAlign: "center",
    border: "2px solid #1687a7",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    background: "white",
  },
  bottomText: {
    color: "gray",
    "& strong": {
      color: "#1687a7",
      cursor: "pointer",
    },
  },
});

const LoginForm = ({ classes, onLoginUser, mobileState, setMobileState }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const addInfo = (infoType) => (event) =>
    setUser({ ...user, [infoType]: event.target.value });

  const loginRequest = async (info) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/auth/login`;
    await axios
      .post(url, info, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.data.token;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have logged on successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        onLoginUser(token);
        <Redirect to="/account" />;
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
      <Grid container justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => loginRequest(user)}
        >
          LOG IN
        </Button>
      </Grid>

      {mobileState === "Login" ? (
        <Typography
          color="secondary"
          variant="subtitle2"
          className={classes.bottomText}
        >
          If you don't have an account{" "}
          <strong onClick={() => setMobileState("SignIn")}>click here</strong>{" "}
          to go sign-in page.
        </Typography>
      ) : null}
    </Grid>
  );
};

export default compose(
  connect(mapStateToPropsLogin, mapDispatchToPropsLogin),
  withStyles(useStyles)
)(LoginForm);
