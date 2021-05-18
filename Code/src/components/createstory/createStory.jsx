import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import StoryItem from "../createstory/storyItem";

const useStyles = {
  createStoryGrid: {
    padding: "3vh 2vw",
  },
};

const CreateStory = ({ classes, setStoryInfo, storyInfo, storyId, token }) => {
  const [length, setLength] = useState(storyInfo.length + 1);
  useEffect(() => {
    setLength(storyInfo.length + 1);
  }, [storyInfo]);

  console.log(length);
  return (
    <Grid contaniner className={classes.createStoryGrid}>
      {[...Array(length)].map((x, i) => (
        <StoryItem
          storyInfo={storyInfo}
          setStoryInfo={setStoryInfo}
          id={i + 1}
          key={i}
          storyId={storyId}
          token={token}
        />
      ))}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(CreateStory);
