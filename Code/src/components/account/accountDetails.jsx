import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { DialogBox } from "../";

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

const AccountDetails = ({ classes, detailedInfo }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [type, setType] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  console.log(data);

  const handleData = (data, myType) => {
    setData(data);
    setType(myType);
    setTimeout(() => {
      handleClickOpen();
    }, 500);
  };

  return (
    <Grid item md={6} xs={12} className={classes.accountContainer}>
      {data ? (
        <DialogBox
          title={type}
          data={data}
          open={open}
          handleClose={handleClose}
          type={type}
        />
      ) : null}

      <Typography color="primary" variant="h4">
        Account Info
      </Typography>
      <Grid item xs={12}>
        <Typography color="primary" variant="h6">
          Role:
        </Typography>
        <Typography variant="subtitle1">{detailedInfo.type}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="primary" variant="h6">
          Followed Authors:
        </Typography>
        {detailedInfo.followed_authors.length ? (
          <>
            <Typography variant="subtitle1">
              {detailedInfo.followed_authors.length} authors
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              onClick={() => {
                handleData(detailedInfo.followed_authors, "Authors");
              }}
              style={{ cursor: "pointer" }}
            >
              Expand
            </Typography>
          </>
        ) : (
          "None"
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography color="primary" variant="h6">
          Followed Tags:
        </Typography>

        {detailedInfo.followed_tags.length ? (
          <>
            <Typography variant="subtitle1">
              {detailedInfo.followed_tags.length} tags
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              onClick={() => {
                handleData(detailedInfo.followed_tags, "Tags");
              }}
              style={{ cursor: "pointer" }}
            >
              Expand
            </Typography>
          </>
        ) : (
          "None"
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography color="primary" variant="h6">
          Followed Locations:
        </Typography>
        {detailedInfo.followed_locations.length ? (
          <>
            <Typography variant="subtitle1">
              {detailedInfo.followed_locations.length} locations
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              onClick={() => {
                handleData(detailedInfo.followed_locations);
              }}
              style={{ cursor: "pointer" }}
            >
              Expand
            </Typography>
          </>
        ) : (
          "None"
        )}
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(useStyles))(AccountDetails);
