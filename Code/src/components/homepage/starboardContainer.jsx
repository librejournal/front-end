import React from "react";

import { Grid, Button } from "@material-ui/core";
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
import LoginImage from "../../assets/images/pexels-jessica-lewis-606539.jpg";
import { connect } from "react-redux";
import { mapStateToPropsStarboard } from "../../redux/mapFunctions";
import { Link } from "react-router-dom";

const useStyles = () => ({
  starboardContainer: {
    width: (props) => (props.width < 1200 ? null : "25%"),
    maxHeight: "1500px",
    display: "flex",
    justifyContent: "space-evenly",
    alignContent: "space-evenly",
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
  loginGrid: {
    backgroundImage: `url(${LoginImage})`,
    height: "20vh",
    backgroundSize: "100% auto",
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
    <Grid container className={classes.starboardContainer}>
      {limit < width ? (
        <>
          {loggedUser.token ? null : (
            <Grid item xs={12} className={classes.loginGrid}>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button color="secondary" variant="contained">
                  Click here to login / register
                </Button>
              </Link>
            </Grid>
          )}
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
