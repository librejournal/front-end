import React, { useState } from "react";

import { Grid, Typography, Input, Button, TextField } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";

import Swal from "sweetalert2";

const useStyles = () => ({
  accountContainer: {
    padding: "2vh 2vw",
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    border: "2px solid #1687a7",
    alignItems: "center",
    maxWidth: "450px",
    margin: "2vh",
    background: "white",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
  },
});

const PasswordReset = ({ classes, detailedInfo }) => {
  const [text, setText] = useState("");
  const [state, setState] = useState(1);

  const sendEmail = async (email) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/auth/password-reset?email=${email}`;
    await axios
      .get(url)
      .then((response) => {
        setState(2);
        setText("");
        Swal.fire(
          "Password Reset",
          "We have sent an e-mail to you. Please check your inbox."
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid item md={6} xs={12} className={classes.accountContainer}>
      {state === 1 ? (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">
              Please enter your e-mail below and send 'Send e-mail' button.
              <br />
              <br />
              We will sent you an e-mail to complete password reset.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              color="primary"
              placeholder="Enter your email"
              fullWidth
              multiline
              value={text}
              onChange={(event) => setText(event.target.value)}
              InputLabelProps={{
                style: { color: "#1687a7" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendEmail(text)}
            >
              Send e-mail
            </Button>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">
              Enter your password below.
              <br />
              <br />
              Once you click 'Reset Password' button, your password will be
              changed.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-basic"
              color="primary"
              type="password"
              label="Password"
              value={text}
              onChange={(event) => setText(event.target.value)}
              InputLabelProps={{
                style: { color: "#1687a7" },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Reset Password
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(PasswordReset);
