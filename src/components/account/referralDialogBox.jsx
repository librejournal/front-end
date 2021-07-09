import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import axios from "axios";
import Swal from "sweetalert2";

import { compose } from "recompose";

import { connect } from "react-redux";
import { mapStateToPropsHome } from "../../redux/mapFunctions";

const useStyles = () => ({
  buttonContainer: {
    maxWidth: "500px",
    maxHeight: "20vh",
  },
  button: {
    margin: "1% 0",
  },
});

const DialogBox = ({
  open,
  handleClose,
  data,
  loggedUser,
  classes,
  getReferrals,
}) => {
  const sendReferral = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/profiles/referrals/`;
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
        getReferrals();
        handleClose();
      })
      .catch((err) => {
        Swal.fire("User already have a pending referral request.");
        handleClose();
      });
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        Choose a user below to send referral
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          className={classes.buttonContainer}
          justify="space-around"
        >
          {data.map((el) =>
            el.type === "READER" ? (
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => sendReferral(el.id)}
              >
                {el.user.username}
              </Button>
            ) : null
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="contained"
          onClick={handleClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default compose(
  connect(mapStateToPropsHome),
  withStyles(useStyles)
)(DialogBox);
