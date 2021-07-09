import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import { compose } from "recompose";

import { connect } from "react-redux";
import { mapStateToPropsHome } from "../../redux/mapFunctions";
import axios from "axios";

const useStyles = () => ({
  buttonContainer: {
    maxWidth: "500px",
    maxHeight: "20vh",
  },
  button: {
    margin: "1% 0",
  },
});

const DialogBox = ({ open, handleClose, data, loggedUser, classes }) => {
  const deleteReferral = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/profiles/referrals/${id}/`;
    await axios
      .delete(url, {
        headers: {
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then(
        (resp) =>
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deletion Success",
            showConfirmButton: false,
            timer: 2000,
          }),
        handleClose(),
        setTimeout(() => window.location.reload(), 2000)
      )
      .catch((err) => console.log(err));
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        Active referrals that you have sent listed below
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          className={classes.buttonContainer}
          justify="space-around"
        >
          {data.map((el) =>
            !el.accepted ? (
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Typography color="primary" variant="h6">
                  {el.to_profile.user.username}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => deleteReferral(el.id)}
                  color="primary"
                >
                  {" "}
                  Delete{" "}
                </Button>
              </Grid>
            ) : null
          )}
          {!data.length ? (
            <Typography color="primary" variant="h6">
              there is no referral request pending.
            </Typography>
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="primary">
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
