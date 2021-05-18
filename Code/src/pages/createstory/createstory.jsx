import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { mapStateToCreateStoryPage } from "../../redux/mapFunctions";

import axios from "axios";

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

const CreateStoryPage = ({ classes, loggedUser }) => {
  const getStoryInfo = async () => {
    axios
      .get("http://localhost:9001/api/stories/drafts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          const data = response.data[0];
          setStoryInfo(data.components);
          setStoryId(data.id);
          //setTagInfo(data.tags);
          //setLocationInfo(data.locations);
        }
      })
      .catch((error) => console.log(error));
  };

  const [storyInfo, setStoryInfo] = useState([]);
  const [tagInfo, setTagInfo] = useState({ tags: [] });
  const [locationInfo, setLocationInfo] = useState({ locations: [] });
  const [storyId, setStoryId] = useState(null);

  useEffect(() => {
    getStoryInfo();
  }, []);

  return (
    <Grid container className={classes.createStoryPageContainer}>
      <Grid item xs={12} className={classes.createStoryTitle}>
        <Typography color="primary" variant="h3">
          Create a new story
        </Typography>
      </Grid>
      <Grid item xs={6} className={classes.createStoryLeftContainer}>
        <CreateStory
          storyInfo={storyInfo}
          setStoryInfo={setStoryInfo}
          id={storyInfo.length}
          storyId={storyId}
          token={loggedUser.token}
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

export default compose(
  connect(mapStateToCreateStoryPage),
  withStyles(useStyles)
)(CreateStoryPage);
