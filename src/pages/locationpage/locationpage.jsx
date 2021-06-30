import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LocationInfo } from "../../components";

const useStyles = () => ({
  userPageContainer: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const LocaitonPage = ({ classes, location }) => {
  const [locationText, setLocationText] = useState(
    window.location.hash.split("#")[1]
  );
  return (
    <Grid container className={classes.userPageContainer}>
      <LocationInfo locationText={locationText} />
    </Grid>
  );
};

export default withStyles(useStyles)(LocaitonPage);
