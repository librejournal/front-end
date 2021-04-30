import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import StoryItem from "./storyItem";

const useStyles = () => ({
    storyContainerGrid: {
        display: "flex",
        justifyContent: "space-around",
        width: "60%",
        alignContent: "center",
        minHeight: "2500px",
        flexDirection: "column",
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
            {data.map((el) => (
                <StoryItem
                    title={el.title}
                    imageUrl={el.imageUrl}
                    like={el.like}
                />
            ))}
        </Grid>
    );
};

export default withStyles(useStyles)(StoryContainer);
