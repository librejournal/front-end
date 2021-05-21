import React from "react";

import {
  TrendingContainer,
  StoryContainer,
  StarboardContainer,
} from "../../components";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { mockupDataStarboard, mockupDataStory } from "../../constants/index";

const useStyles = {
  firstAdv: {
    border: "1px solid black",
    height: "250px",
    margin: "2vh 0",
  },
  homepageContainer: {
    maxWidth: "1920px",
    margin: "auto",
  },
};

const Homepage = ({ classes }) => {
  return (
    <Grid container justify="center" className={classes.homepageContainer}>
      <TrendingContainer data={mockupDataStory} />
      <Grid item xs={10} alignContent="center" className={classes.firstAdv} />

      <StoryContainer data={mockupDataStory} />
      <StarboardContainer
        title1="Top Authors"
        title2="Top Locations"
        data1={mockupDataStarboard.author}
        data2={mockupDataStarboard.location}
      />
    </Grid>
  );
};

export default withStyles(useStyles)(Homepage);
