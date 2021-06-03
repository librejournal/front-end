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
import { ParallaxBanner } from "react-scroll-parallax";
import Background from "../../assets/images/ekrulila-3957616.jpg";
import Typed from "react-typed";

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
    typedDiv: {
        position: "absolute",
        height: "100%",
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        textAlign:'center',
        "& span": { color: "white", fontSize: "2rem" },
    },
};

const Homepage = ({ classes, limit, width }) => {
    const [container, setContainer] = useState("Stories");
    const changeContainer = (value) => setContainer(value);

    return (
        <Grid container justify="center" className={classes.homepageContainer}>
            <ParallaxBanner
                className="your-class"
                layers={[
                    {
                        image: Background,
                        amount: 0.5,
                    },
                ]}
                style={{
                    height: "35vh",
                }}
            >
                <div className={classes.typedDiv}>
                    <Typed
                        strings={["Time to share your experience"]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </div>
            </ParallaxBanner>

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
