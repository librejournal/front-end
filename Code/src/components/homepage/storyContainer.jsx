import React from "react";

import { Grid, Typography, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import StoryItem from "./storyItem";

import Carousel, {
    slidesToShowPlugin,
    autoplayPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = () => ({
    storyContainerGrid: {
        padding: "3vh 5vw",
        margin: 0,
        maxWidth: "900px",
    },
    titleText: {},
});

const StoryContainer = ({ classes, data, limit, width }) => {
    return (
        <Container className={classes.storyContainerGrid}>
            <Grid item xs={12} className={classes.titleText}>
                <Typography color="primary" variant="h5">
                    Stories
                </Typography>
            </Grid>
            {limit < width ? (
                data
                    .slice(0, 3)
                    .map((el) => (
                        <StoryItem
                            title={el.title}
                            imageUrl={el.imageUrl}
                            like={el.like}
                        />
                    ))
            ) : (
                <Carousel
                    plugins={[
                        "fastSwipe",
                        "centered",
                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: 1.05,
                            },
                        },
                    ]}
                >
                    {data.slice(0, 3).map((el) => (
                        <StoryItem
                            title={el.title}
                            imageUrl={el.imageUrl}
                            like={el.like}
                        />
                    ))}
                </Carousel>
            )}
        </Container>
    );
};

export default compose(
    withWindowConsumer,
    withStyles(useStyles)
)(StoryContainer);
