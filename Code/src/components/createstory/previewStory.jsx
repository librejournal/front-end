import React from "react";

import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = {
  titleItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2vh 0",
  },
};

const PreviewStory = ({ classes, storyInfo }) => {
  return (
    <Grid container>
      {storyInfo.map((el) =>
        el.type === "title" ? (
          <Grid item xs={12} className={classes.titleItem}>
            <Typography variant="h3" color="primary">
              {el.content}
            </Typography>
          </Grid>
        ) : null
      )}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(PreviewStory);
