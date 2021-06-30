import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import runtimeEnv from "@mars/heroku-js-runtime-env";

import { compose } from "recompose";

import { connect } from "react-redux";
import { mapStateToPropsHome } from "../../redux/mapFunctions";

const useStyles = () => ({});

const DialogBox = ({ open, handleClose, data, loggedUser }) => {
  const env = runtimeEnv();

  const sendReferral = async (id) => {
    const url = `${env.REACT_APP_DB_HOST}/api/profiles/referrals/`;
    await axios
      .post(
        url,
        { to_profile: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("You have sent referral to user.");
        handleClose();
      })
      .catch((err) => {
        Swal.fire(err.response.data.detail);
        handleClose();
      });
  };
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        Choose a user below to send referral
      </DialogTitle>
      <DialogContent>
        {data.map((el) =>
          el.type === "READER" ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => sendReferral(el.id)}
            >
              {el.user.username}
            </Button>
          ) : null
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="primary">
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleClose}
          color="primary"
          autoFocus
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default compose(
  connect(mapStateToPropsHome),
  withStyles(useStyles)
)(DialogBox);
