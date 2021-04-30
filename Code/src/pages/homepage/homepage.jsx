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
    },
};

const Homepage = ({ classes }) => (
    <Grid container justify="center">
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

export default withStyles(useStyles)(Homepage);
