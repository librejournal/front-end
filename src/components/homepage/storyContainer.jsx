import React from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import StoryItem from "./storyItem";

import Carousel, {
  slidesToShowPlugin,
  slidesToScrollPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = () => ({
  storyContainerGrid: {
    padding: "3vh 5vw",
    margin: 0,
  },
});

const StoryContainer = ({ classes, data, limit, width }) => {
  return (
    <Grid item xs={12} md={7} className={classes.storyContainerGrid}>
      {limit < width ? (
        data.map((el) => (
          <StoryItem
            title={el.title}
            thumbnail={el.thumbnail}
            like={el.like_count}
            key={el.uuid}
            likeCount={el.like_count}
            dislikeCount={el.dislike_count}
            author={el.author.user.username}
            date={el.modified ? el.modified : el.created}
            id={el.id}
            state={el.author}
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
                numberOfSlides: 1,
              },
            },
            {
              resolve: slidesToScrollPlugin,
              options: {
                numberOfSlides: 1,
              },
            },
          ]}
        >
          {data.map((el) => (
            <StoryItem
              title={el.title}
              thumbnail={el.thumbnail}
              like={el.like_count}
              key={el.uuid}
              likeCount={el.like_count}
              dislikeCount={el.dislike_count}
              author={el.author.user.username}
              date={el.modified ? el.modified : el.created}
              id={el.id}
              state={el.author}
            />
          ))}
        </Carousel>
      )}
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  withStyles(useStyles)
)(StoryContainer);
