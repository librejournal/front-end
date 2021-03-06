import React from "react";
import _ from "underscore";

import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = {
  previewContainer: {
    margin: " 0 auto",
  },
  titleItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2vh 0",
  },
  textItem: {
    padding: "1vh 1vw",
  },
  imageItem: {
    "& img": {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const PreviewStory = ({ classes, storyInfo, likeCount, dislikeCount }) => {
  const storyInfoArray = _.sortBy(storyInfo, "order_id");
  return (
    <Grid container className={classes.previewContainer}>
      {storyInfoArray.map((el) =>
        el.type === "TITLE" ? (
          <Grid item xs={12} className={classes.titleItem} key={el.id}>
            <Typography variant="h3" color="primary">
              {el.text}
            </Typography>
          </Grid>
        ) : el.type === "TEXT" ? (
          <Grid item xs={12} className={classes.textItem} key={el.id}>
            <Typography variant={el.type_setting}>{el.text}</Typography>
          </Grid>
        ) : el.type === "IMAGE" ? (
          <Grid item xs={12} className={classes.imageItem} key={el.id}>
            <img
              src={`data:image/jpeg;base64,${el.picture.data}`}
              alt={`url(${el.text})`}
              style={{
                width: `${el.type_setting}%`,
              }}
            />
          </Grid>
        ) : el.type === "IMAGE_URL" ? (
          <Grid item xs={12} className={classes.imageItem} key={el.id}>
            <img
              src={`${el.text}`}
              alt={`url(${el.text})`}
              style={{
                width: `${el.type_setting}%`,
              }}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(PreviewStory);
