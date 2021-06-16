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
import LoginImage from "../../assets/images/pexels-maria-orlova-4947860.jpg";
import { connect } from "react-redux";
import { mapStateToPropsStarboard } from "../../redux/mapFunctions";

const useStyles = () => ({
  starboardContainer: {
    maxHeight: "150vh",
    padding: "3vh 0",
    alignItems: "center",
    position: "sticky",
    top: "20px",
  },

  arrowActive: {
    fill: "#1687a7",
  },
  arrowDeactive: {
    fill: "white",
  },
  loginGrid: {
    width: "100%",
    maxHeight: "30vh",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: "10px",
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
  loggedUser,
}) => {
  return (
    <Grid item xs={12} md={3} className={classes.starboardContainer}>
      {limit < width ? (
        <Grid container style={{ position: "sticky", top: "30px" }}>
          <StarboardItem title={title1} data={data1} />

          <StarboardItem title={title2} data={data2} />
        </Grid>
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
                arrowLeft: <ArrowBackIosIcon className={classes.arrowActive} />,
                arrowLeftDisabled: (
                  <ArrowBackIosIcon className={classes.arrowDeactive} />
                ),
                arrowRight: (
                  <ArrowForwardIosIcon className={classes.arrowActive} />
                ),
                arrowRightDisabled: (
                  <ArrowForwardIosIcon className={classes.arrowDeactive} />
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
  connect(mapStateToPropsStarboard),
  withStyles(useStyles)
)(StarboardContainer);
