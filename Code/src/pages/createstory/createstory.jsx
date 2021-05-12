import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { PreviewStory, CreateStory } from "../../components";

const useStyles = {
  createStoryPageContainer: {
    padding: "1vh 3vw",
    display: "flex",
    flexDirection: "column",
  },
  previewTitle: {
    borderBottom: "2px solid gray",
  },
};

const CreateStoryPage = ({ classes }) => {
  const [storyInfo, setStoryInfo] = useState([]);

  const addStoryInfo = (info, id) => {
    if (storyInfo.filter((el) => el.id === id).length !== 0) {
      const newStoryInfo = storyInfo.map((el) =>
        el.id === id ? (el = info) : el
      );
      setStoryInfo(newStoryInfo);
    } else {
      setStoryInfo([...storyInfo, { ...info }]);
    }
  };

  const deleteStoryInfo = (id) => {
    const newStoryInfo = storyInfo.filter((el) => el.id !== id);
    setStoryInfo(newStoryInfo);
  };

  return (
    <Grid container className={classes.createStoryPageContainer}>
      <Typography variant="h2" color="primary" className={classes.previewTitle}>
        Preview
      </Typography>
      {storyInfo.length === 0 ? (
        <Typography variant="h6">
          Preview of your story will appear as you add more elements below.
        </Typography>
      ) : (
        <PreviewStory storyInfo={storyInfo} />
      )}

      <CreateStory
        storyInfo={storyInfo}
        addStoryInfo={addStoryInfo}
        deleteStoryInfo={deleteStoryInfo}
      />
    </Grid>
  );
};

export default withStyles(useStyles)(CreateStoryPage);
