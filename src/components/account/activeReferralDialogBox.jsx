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

const DialogBox = ({ open, handleClose, data, loggedUser, classes }) => {
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
              <Typography color="primary" variant="h6">
                {el.to_profile.user.username}
              </Typography>
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
