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
    minWidth: "25vw",
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

  console.log(tagInfo);

  const handleClickOpen = () => {
    setOpen(true);
    setTagText("");
  };

  const handleClose = () => {
    setOpen(false);
    setTagText("");
  };

  const handleSetTag = (data) => {
    setTags(data);
    setDialogStep(3);
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

  if (tags & tagInfo) console.log([...tagInfo, tags]);

  const attachTagToStory = (tag) => {
    let info = tagInfo.map((el) => el.id);
    info.push(tag);
    console.log(info);
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
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  const deleteTag = (tag) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`;
    axios
      .patch(
        url,
        { tags: [tag] },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((resp) => console.log(resp))
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
                InputLabelProps={{
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
                InputLabelProps={{
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
            {tags.map((el) => (
              <Grid item xs={12} className={classes.dialogButtonGrid}>
                <Typography color="primary" variant="h6">
                  {el.tag}
                </Typography>
              </Grid>
            ))}
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="h6">
                Click the tag you want to add.
              </Typography>
            </Grid>
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
                InputLabelProps={{
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
                Search a new
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
                onClick={() => deleteTag(el.id)}
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
