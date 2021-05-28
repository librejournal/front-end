import React from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import StarboardItem from "./starboardItem";
import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

import Carousel, {
    slidesToShowPlugin,
    arrowsPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = () => ({
    starboardContainer: {
        width: (props) => (props.width < props.limit ? null : "25%"),
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
    arrowActive: {
        fill: "#1687a7",
    },
    arrowDeactive: {
        fill: "white",
    },
});

const StarboardContainer = ({
    classes,
    title1,
    title2,
    data1,
    data2,
    limit,
    width,
}) => {
    return (
        <Grid container className={classes.starboardContainer}>
            {limit < width ? (
                <>
                    <StarboardItem title={title1} data={data1} />
                    <StarboardItem title={title2} data={data2} />
                </>
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
                        {
                            resolve: arrowsPlugin,
                            options: {
                                arrowLeft: (
                                    <ArrowBackIosIcon
                                        className={classes.arrowActive}
                                    />
                                ),
                                arrowLeftDisabled: (
                                    <ArrowBackIosIcon
                                        className={classes.arrowDeactive}
                                    />
                                ),
                                arrowRight: (
                                    <ArrowForwardIosIcon
                                        className={classes.arrowActive}
                                    />
                                ),
                                arrowRightDisabled: (
                                    <ArrowForwardIosIcon
                                        className={classes.arrowDeactive}
                                    />
                                ),
                                addArrowClickHandler: true,
                            },
                        },
                    ]}
                >
                    <StarboardItem title={title1} data={data1} />
                    <StarboardItem title={title2} data={data2} />
                </Carousel>
            )}
        </Grid>
    );
};

export default compose(
    withWindowConsumer,
    withStyles(useStyles)
)(StarboardContainer);
