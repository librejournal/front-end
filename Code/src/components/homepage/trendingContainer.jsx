import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import TrendingItem from "./trendingItem";

const useStyles = {
  trendingContainerGrid: {
    display: "flex",
    justifyContent: "space-around",
    padding: "3vh 5vw",
  },
  titleText: {
    padding: "1vh 0",
    "& p": {
      color: "#1687a7",
    },
  },
};

const TrendingContainer = ({ data, classes }) => {
  return (
    <Grid container className={classes.trendingContainerGrid}>
      <Grid item className={classes.titleText} xs={12}>
        <Typography color="primary" variant="h5">
          Trending News
        </Typography>
      </Grid>
      {data.map((el) => (
        <TrendingItem title={el.title} imageUrl={el.imageUrl} />
      ))}
    </Grid>
  );
};

export default withStyles(useStyles)(TrendingContainer);
