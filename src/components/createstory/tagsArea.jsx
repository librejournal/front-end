import React, { useState } from "react";
import {
  Chip,
  Grid,
  Dialog,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Swal from "sweetalert2";

import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";

const useStyles = () => ({
  tagsArea: {},
  dialogContainer: {
    height: "20vh",
    width: "100%",
  },
  dialogButtonGrid: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  dialogTextField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const TagsArea = ({ classes, tagInfo, setTagInfo, storyId, loggedUser }) => {
  const [open, setOpen] = useState(false);
  const [tagText, setTagText] = useState("");
  const [tags, setTags] = useState(null);
  const [dialogStep, setDialogStep] = useState(1);
  const icon = <AddCircleIcon />;
  const cancelIcon = <CancelIcon />;

  const handleClickOpen = () => {
    setOpen(true);
    setTagText("");
  };

  const handleClose = () => {
    setOpen(false);
    setTagText("");
    setTimeout(() => {
      setDialogStep(1);
    }, 500);
  };

  const handleSetTag = (data) => {
    setTags(data);
    setDialogStep(3);
  };

  const updateStoryInfo = async () => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setTagInfo(data.tags);
      })
      .catch((error) => console.log(error));
  };

  const attachTagToStory = (tag) => {
    let info = tagInfo.map((el) => el.id);
    info.push(tag);
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`;
    axios
      .patch(
        url,
        { tags: info },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        updateStoryInfo();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tag added",
          showConfirmButton: false,
          timer: 2000,
        });
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const unattachTagToStory = (tag) => {
    let info = tagInfo.map((el) => el.id).filter((el) => el !== tag);
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`;
    axios
      .patch(
        url,
        { tags: info },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tag deleted",
          showConfirmButton: false,
          timer: 2000,
        });
        updateStoryInfo();
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const searchTag = async (value) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/tags?search=${value}`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        response.data.length ? handleSetTag(response.data) : setDialogStep(2);
      })
      .catch((err) => console.log(err));
  };

  const createTag = async (value) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/tags`;
    await axios
      .post(
        url,
        { tag: value },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((response) => {
        setTags(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tag is created",
          showConfirmButton: false,
          timer: 2000,
        });
        attachTagToStory(response.data.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid item xs={12}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {dialogStep === 1 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="h6">
                Search for existing tags
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dialogTextField}>
              <TextField
                id="standard-basic"
                color="primary"
                placeholder="Enter tag"
                value={tagText}
                inputlabelprops={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) => setTagText(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  searchTag(tagText);
                }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : null}
        {dialogStep === 2 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="h6">
                No tag found
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="subtitle2">
                You can either add a new tag or try to search different one.
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dialogTextField}>
              <TextField
                id="standard-basic"
                color="primary"
                placeholder="Enter tag"
                value={tagText}
                inputlabelprops={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) => setTagText(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  searchTag(tagText);
                }}
              >
                Search for a new tag
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(4)}
              >
                Create a new tag
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : null}
        {dialogStep === 3 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography variant="h6" color="primary">
                Tags are listed below, click the tag you want to add
              </Typography>
            </Grid>
            {tags.map((el) => (
              <Grid item xs={12} className={classes.dialogButtonGrid}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => attachTagToStory(el.id)}
                >
                  {el.tag}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(1)}
              >
                Search for a new tag
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(4)}
              >
                Create a new tag
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : null}
        {dialogStep === 4 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="h6">
                Enter the new tag name
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dialogTextField}>
              <TextField
                id="standard-basic"
                color="primary"
                placeholder="Enter tag"
                value={tagText}
                inputlabelprops={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) => setTagText(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(1)}
              >
                Search a new tag
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => createTag(tagText)}
              >
                Create a new tag
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Dialog>

      <Grid item xs={12} className={classes.tagsArea}>
        <Chip
          icon={icon}
          label="Add tags"
          onClick={() => handleClickOpen()}
          className={classes.chip}
        />
        {tagInfo.length
          ? tagInfo.map((el) => (
              <Chip
                label={el.tag}
                onClick={() => unattachTagToStory(el.id)}
                className={classes.chip}
                icon={cancelIcon}
                color="primary"
                variant="outlined"
              />
            ))
          : null}
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(useStyles))(TagsArea);
