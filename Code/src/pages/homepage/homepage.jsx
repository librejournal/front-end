import React, { useState } from "react";

import {
    TrendingContainer,
    StoryContainer,
    StarboardContainer,
} from "../../components";
import { Breadcrumbs, Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { mockupDataStarboard, mockupDataStory } from "../../constants/index";

import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

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
    homePageSelectionText: {
        cursor: "pointer",
        color: "gray",
    },
    homePageSelectionTextActive: {
        cursor: "pointer",
    },
};

const Homepage = ({ classes, limit, width }) => {
    const [container, setContainer] = useState("Stories");
    const changeContainer = (value) => setContainer(value);

    return (
        <Grid container justify="center" className={classes.homepageContainer}>
            <TrendingContainer data={mockupDataStory} />
            {limit < width ? null : (
                <Breadcrumbs separator="|" aria-label="breadcrumb">
                    <Typography
                        color="primary"
                        variant="h6"
                        onClick={() => changeContainer("Stories")}
                        className={
                            container === "Stories"
                                ? classes.homePageSelectionTextActive
                                : classes.homePageSelectionText
                        }
                    >
                        Stories
                    </Typography>
                    <Typography
                        color="primary"
                        variant="h6"
                        onClick={() => changeContainer("Starboard")}
                        className={
                            container === "Starboard"
                                ? classes.homePageSelectionTextActive
                                : classes.homePageSelectionText
                        }
                    >
                        Starboard
                    </Typography>
                </Breadcrumbs>
            )}
            {limit < width ? (
                <>
                    <StoryContainer data={mockupDataStory} />
                    <StarboardContainer
                        title1="Top Authors"
                        title2="Top Locations"
                        data1={mockupDataStarboard.author}
                        data2={mockupDataStarboard.location}
                    />
                </>
            ) : container === "Stories" ? (
                <StoryContainer data={mockupDataStory} />
            ) : (
                <StarboardContainer
                    title1="Top Authors"
                    title2="Top Locations"
                    data1={mockupDataStarboard.author}
                    data2={mockupDataStarboard.location}
                />
            )}
        </Grid>
    );
};

export default compose(withWindowConsumer, withStyles(useStyles))(Homepage);
