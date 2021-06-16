import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import TrendingItem from "./trendingItem";
import Carousel, {
  slidesToShowPlugin,
  slidesToScrollPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = {
  trendingContainerGrid: {
    display: "flex",
    justifyContent: "space-around",
    padding: "3vh 5vw",
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
          Trending Stories
        </Typography>
      </Grid>

      {limit < width ? (
        data.map((el) => (
          <TrendingItem
            title={el.title}
            thumbnail={el.thumbnail}
            key={el.title}
            id={el.id}
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
                numberOfSlides: 2.05,
              },
            },
            {
              resolve: slidesToScrollPlugin,
              options: {
                numberOfSlides: 2.05,
              },
            },
          ]}
        >
          {data.map((el) => (
            <TrendingItem
              title={el.title}
              thumbnail={el.thumbnail}
              key={el.title}
              id={el.id}
            />
          ))}
        </Carousel>
      )}
    </Grid>
  );
};

export default compose(
  React.memo,
  withWindowConsumer,
  withStyles(useStyles)
)(TrendingContainer);
