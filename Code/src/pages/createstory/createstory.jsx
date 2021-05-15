import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  PreviewStory,
  CreateStory,
  TagsArea,
  LocationArea,
} from "../../components";

const useStyles = {
  createStoryPageContainer: {
    padding: "1vh 3vw",
    display: "flex",
    alignContent: "flex-start",
    textAlign: "center",
    height: "80vh",
    overflowY: "auto",
  },
  previewTitle: {
    borderBottom: "2px solid gray",
  },
  createStoryLeftContainer: {
    marginTop: "3vh",
    height: "65vh",
    maxHeight: "65vh",
    overflowY: "auto",
  },
  createStoryRightContainer: {
    marginTop: "3vh",
    height: "65vh",
    maxHeight: "65vh",
    overflowY: "auto",
  },
  createStoryTitle: {
    height: "3vh",
  },
  createStoryBottomGrid: {
    paddingTop: "2vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "5vh",
  },
};

const CreateStoryPage = ({ classes }) => {
  const [storyInfo, setStoryInfo] = useState([]);
  const [tagInfo, setTagInfo] = useState({ tags: [] });
  const [locationInfo, setLocationInfo] = useState({ locations: [] });

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
      <Grid item xs={12} className={classes.createStoryTitle}>
        <Typography color="primary" variant="h2">
          Create a new story
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.createStoryLeftContainer}>
        <CreateStory
          storyInfo={storyInfo}
          addStoryInfo={addStoryInfo}
          deleteStoryInfo={deleteStoryInfo}
        />
      </Grid>
      <Grid item xs={6} className={classes.createStoryRightContainer}>
        <Typography
          variant="h4"
          color="primary"
          className={classes.previewTitle}
        >
          Preview
        </Typography>
        {storyInfo.length === 0 ? (
          <Typography variant="h6">
            Preview of your story will appear as you add more elements below.
          </Typography>
        ) : (
          <PreviewStory storyInfo={storyInfo} />
        )}
      </Grid>
      <Grid container xs={12} className={classes.createStoryBottomGrid}>
        <Grid item xs={4}>
          <TagsArea tagInfo={tagInfo} setTagInfo={setTagInfo} />
        </Grid>

        <Grid item xs={4}>
          <LocationArea
            locationInfo={locationInfo}
            setLocationInfo={setLocationInfo}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="primary">
            Create a story
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(CreateStoryPage);
