import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LoginForm, SigninForm } from "../../components";
import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = () => ({
  loginpageContainer: {
    height: "80vh",
    maxWidth: "1600px",
    margin: "auto",
  },
});

const LoginPage = ({ classes, limit, width }) => {
  const [mobileState, setMobileState] = useState("Login");
  return (
    <Grid
      container
      className={classes.loginpageContainer}
      justify="space-evenly"
      alignContent="center"
    >
      {limit < width ? (
        <>
          <LoginForm />
          <SigninForm />{" "}
        </>
      ) : mobileState === "SignIn" ? (
        <SigninForm mobileState={mobileState} setMobileState={setMobileState} />
      ) : (
        <LoginForm mobileState={mobileState} setMobileState={setMobileState} />
      )}
    </Grid>
  );
};

export default compose(withWindowConsumer, withStyles(useStyles))(LoginPage);
