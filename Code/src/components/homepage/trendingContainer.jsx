import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import TrendingItem from "./trendingItem";
import Carousel, { slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = {
    trendingContainerGrid: {
        display: "flex",
        justifyContent: "space-around",
        padding: "3vh 5vw",
        "-webkit-box-shadow": "inset 0px 0.1vh 2px 0px rgba(0,0,0,0.8)",
        "-moz-box-shadow": "inset 0px 0.1vh 2px 0px rgba(0,0,0,0.8)",
        "box-shadow": "inset 0px 0.1vh 2px 0px rgba(0,0,0,0.8)",
    },
    titleText: {
        padding: "1vh 0",
        "& p": {
            color: "#1687a7",
        },
    },
};

const TrendingContainer = ({ data, classes, limit, width }) => {
    return (
        <Grid container className={classes.trendingContainerGrid}>
            <Grid item className={classes.titleText} xs={12}>
                <Typography color="primary" variant="h5">
                    Trending News
                </Typography>
            </Grid>

            {limit < width ? (
                data.map((el) => (
                    <TrendingItem title={el.title} imageUrl={el.imageUrl} />
                ))
            ) : (
                <Carousel
                    plugins={[
                        "fastSwipe",
                        "centered",

                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: 2,
                            },
                        },
                    ]}
                >
                    {data.map((el) => (
                        <TrendingItem title={el.title} imageUrl={el.imageUrl} />
                    ))}
                </Carousel>
            )}
        </Grid>
    );
};

export default compose(
    withWindowConsumer,
    withStyles(useStyles)
)(TrendingContainer);
