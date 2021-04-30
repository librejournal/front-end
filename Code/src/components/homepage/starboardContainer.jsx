import React from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import StarboardItem from "./starboardItem";

const useStyles = () => ({
  starboardContainer: {
    width: "25%",
    display: "flex",
    justifyContent: "space-around",
    alignContent: "space-around",
  },
  storyboardBigadvGrid: {
    height: "35vh",
    border: "1px solid black",
    width: "max(10vw,250px)",
  },
  storyboardSmalladvGrid: {
    height: "15vh",
    border: "1px solid black",
    width: "max(10vw,250px)",
  },
});

const StarboardContainer = ({ classes, title1, title2, data1, data2 }) => {
  return (
    <Grid container className={classes.starboardContainer}>
      <StarboardItem title={title1} data={data1} />
      <Grid item xs={12} className={classes.storyboardBigadvGrid} />
      <StarboardItem title={title2} data={data2} />
      <Grid item xs={12} className={classes.storyboardSmalladvGrid} />
    </Grid>
  );
};

export default withStyles(useStyles)(StarboardContainer);
