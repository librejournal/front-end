import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import StoryItem from "./storyItem";

const useStyles = () => ({
  storyContainerGrid: {
    display: "flex",
    justifyContent: "space-between",
    width: "max(60%,1000px)",
    alignContent: "center",
    flexDirection: "column",
    padding: "2vh 0",
  },
});

const StoryContainer = ({ classes, data }) => {
  return (
    <Grid container className={classes.storyContainerGrid}>
      <Grid container className={classes.titleText}>
        <Typography color="primary" variant="h5">
          Stories
        </Typography>
      </Grid>
      {data.slice(0, 3).map((el) => (
        <StoryItem title={el.title} imageUrl={el.imageUrl} like={el.like} />
      ))}
    </Grid>
  );
};

export default withStyles(useStyles)(StoryContainer);
