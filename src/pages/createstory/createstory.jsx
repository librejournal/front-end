import React, { useState, useEffect, memo } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { mapStateToCreateStoryPage } from "../../redux/mapFunctions";

import axios from "axios";
import { Redirect } from "react-router-dom";

import Swal from "sweetalert2";

import {
  PreviewStory,
  CreateStory,
  TagsArea,
  LocationArea,
  TitleDialog,
  ImageDialog,
} from "../../components";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = {
  createStoryPageContainer: {
    padding: "0 3vw",
    display: "flex",
    textAlign: "center",
    overflowY: "auto",
  },
  previewTitle: {
    borderBottom: "2px solid gray",
  },
  createStoryLeftContainer: {
    height: "65vh",
    maxHeight: "65vh",
    overflowY: "auto",
  },
  createStoryRightContainer: {
    height: "60vh",
    overflowY: "auto",
    maxWidth: "600px",
    margin: "2vh auto ",
    padding: "2rem 1rem",
    background: "white",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    borderRadius: "15px",
  },
  createStoryTitle: {
    borderBottom: "2px solid lightgray",
    padding: "1rem",
  },
  createStoryInfoPanel: {
    padding: "0.5rem 0 0 0",
    display: "flex",
    justifyContent: "space-around",
  },
  createStoryBottomGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "7vh",
    borderTop: "2px solid lightgray",
    padding: "1vh 5vw",
  },
  bottomButton: {
    margin: "2vh 0 1vh 0",
  },
};

const CreateStoryPage = ({ classes, loggedUser, limit, width, location }) => {
  const [storyInfo, setStoryInfo] = useState([]);
  const [tagInfo, setTagInfo] = useState({ tags: [] });
  const [locationInfo, setLocationInfo] = useState({ locations: [] });
  const [storyId, setStoryId] = useState(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);

  const [success, setSuccess] = useState(false);
  const [storyDetails, setStoryDetails] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const swalWithSuccess = () => {
    setSuccess(true);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Draft is saved",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  console.log(storyDetails);

  const getStoryInfo = async (id) => {
    axios
      .get(`http://localhost:9001/api/stories/drafts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setStoryInfo(data.components);
        setStoryId(data.id);
        setTagInfo(data.tags);
        setLocationInfo(data.locations);
        setStoryTitle(data.title);
        setStoryDetails(data);
      })
      .catch((error) => console.log(error));
  };

  const getStoryInfoNotDraft = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/${id}/`;
    await axios
      .patch(
        url,
        {
          is_draft: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((response) => {
        getStoryInfo(id);
      })
      .catch((err) => console.log(err));
  };

  const publishStory = async () => {
    axios
      .post(`http://localhost:9001/api/stories/${storyId}/publish`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Story is ${
            location.state !== undefined ? "edited" : "published"
          }`,
          showConfirmButton: false,
          timer: 2000,
        });
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const createNewStory = async () => {
    const info = {
      author: loggedUser.profile_id,
    };

    await axios
      .post("http://localhost:9001/api/stories/", info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        getStoryInfo(response.data.id);
      })
      .catch((err) => console.log(err));
  };

  const openTitleDialog = () => {
    setOpen(true);
  };

  const openImageDialog = () => {
    setOpenImage(true);
  };

  useEffect(() => {
    if (typeof location.state !== "undefined") {
      if (typeof location.state.editId !== "undefined") {
        getStoryInfo(location.state.editId);
      } else {
        getStoryInfoNotDraft(location.state.storyId);
      }
    } else {
      createNewStory();
    }
  }, []);

  return (
    <Grid container className={classes.createStoryPageContainer}>
      {storyDetails ? (
        <>
          <TitleDialog
            open={open}
            handleClose={handleClose}
            publishStory={publishStory}
            token={loggedUser.token}
            storyId={storyId}
            title={storyTitle}
            storyDetails={storyDetails}
          />
          <ImageDialog
            open={openImage}
            handleClose={handleCloseImage}
            publishStory={publishStory}
            token={loggedUser.token}
            storyId={storyId}
            title={storyTitle}
            storyDetails={storyDetails}
          />
        </>
      ) : null}

      <Grid item xs={12} className={classes.createStoryTitle}>
        <Typography color="primary" variant="h4">
          {location.state !== undefined ? "Edit" : "Create"} a story
        </Typography>
      </Grid>

      {storyDetails ? (
        <Grid item xs={12} className={classes.createStoryInfoPanel}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => openTitleDialog()}
          >
            Title Information
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => openImageDialog()}
          >
            Thumbnail Information
          </Button>
        </Grid>
      ) : null}

      <Grid item xs={12} md={6} className={classes.createStoryLeftContainer}>
        <CreateStory
          storyInfo={storyInfo}
          setStoryInfo={setStoryInfo}
          id={storyInfo.length}
          storyId={storyId}
          token={loggedUser.token}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.createStoryRightContainer}>
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
      <Grid container className={classes.createStoryBottomGrid}>
        <Grid item xs={6} md={4}>
          <TagsArea
            tagInfo={tagInfo}
            setTagInfo={setTagInfo}
            storyId={storyId}
            loggedUser={loggedUser}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <LocationArea
            locationInfo={locationInfo}
            setLocationInfo={setLocationInfo}
            loggedUser={loggedUser}
            storyId={storyId}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          className={limit > width ? classes.bottomButton : null}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              typeof location.state !== "undefined"
                ? typeof location.state.storyId !== "undefined"
                  ? publishStory()
                  : swalWithSuccess()
                : swalWithSuccess()
            }
          >
            {location.state ? "Edit" : "Create"} a story
          </Button>
          {success ? <Redirect push to="/dashboard" /> : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default compose(
  memo,
  withWindowConsumer,
  connect(mapStateToCreateStoryPage),
  withStyles(useStyles)
)(CreateStoryPage);
