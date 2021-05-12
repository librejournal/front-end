import React from "react";

import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = {
  previewContainer: {
    maxWidth: "1000px",
    margin: "auto",
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
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    margin: "3vh 0",
  },
};

const PreviewStory = ({ classes, storyInfo }) => {
  return (
    <Grid container className={classes.previewContainer}>
      {storyInfo.map((el) =>
        el.type === "title" ? (
          <Grid item xs={12} className={classes.titleItem}>
            <Typography variant="h3" key={el.id} color="primary">
              {el.content}
            </Typography>
          </Grid>
        ) : el.type === "text" ? (
          <Grid item xs={12} className={classes.textItem}>
            <Typography variant={el.size} key={el.id}>
              {el.content}
            </Typography>
          </Grid>
        ) : el.type === "image" ? (
          <Grid
            item
            xs={12}
            className={classes.imageItem}
            style={{
              backgroundImage: `url(${el.url})`,
              height: `${el.size}vh`,
            }}
          />
        ) : null
      )}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(PreviewStory);
