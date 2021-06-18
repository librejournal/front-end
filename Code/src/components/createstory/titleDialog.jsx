import React, { useState, useEffect } from "react";
import {
  Dialog,
  Typography,
  Grid,
  Input,
  Button,
  Stepper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import axios from "axios";

const useStyles = () => ({
  titleAdd: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& button": {
      marginTop: "2vh",
    },
  },
});

const TitleDialog = ({
  classes,
  open,
  handleClose,
  storyId,
  token,
  title,
  storyDetails,
}) => {
  const [text, setText] = useState(title);
  const [activeStep, setActiveStep] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  console.log(storyDetails);
  const onFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };
  useEffect(() => {
    if (imageFile) {
      onFileUpload(imageFile);
    }
  }, [imageFile]);

  const onFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    uploadThumbnail(formData);
  };

  const uploadThumbnail = async (file) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/files/upload`;
    await axios
      .post(url, file, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(async (response) => {
        const url = `${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`;
        await axios
          .patch(
            url,
            { thumbnail: response.data.id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
              },
            }
          )
          .then((response) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thumbnail Uploaded",
              showConfirmButton: false,
              timer: 2000,
            });
            handleClose();
            console.log(response);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleNext = () => setActiveStep(activeStep + 1);

  useEffect(() => {
    setText(title);
  }, [title]);

  const editTitle = async (title) => {
    const info = {
      title: title,
    };

    await axios
      .patch(`http://localhost:9001/api/stories/drafts/${storyId}`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        handleNext();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <Stepper variant="progress" activeStep={activeStep}>
        {activeStep === 0 ? (
          <Grid
            container
            alignItems="space-evenly"
            justify="center"
            style={{ height: "20vh", width: "20vw", padding: "10%" }}
          >
            <Typography
              color="primary"
              variant="subtitle1"
              style={{
                textAlign: "center",
                borderBottom: "0.2px solid lightgray",
              }}
            >
              Enter title for your story
            </Typography>

            <Grid item xs={12} className={classes.titleAdd}>
              <Input
                color="primary"
                placeholder="Enter your title"
                fullWidth
                multiline
                value={text}
                defaultValue={text}
                onChange={(event) => setText(event.target.value)}
                InputLabelProps={{
                  style: { color: "#1687a7" },
                }}
              />
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={text === ""}
                  onClick={() => {
                    editTitle(text);
                  }}
                >
                  Save Title
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            alignItems="space-evenly"
            justify="center"
            style={{
              height: "20vh",
              width: "20vw",
              padding: "10%",
              margin: "auto",
            }}
          >
            {storyDetails.thumbnail ? (
              <Grid item xs={12}>
                <Typography
                  color="primary"
                  variant="subtitle1"
                  style={{
                    textAlign: "center",
                    borderBottom: "0.2px solid lightgray",
                  }}
                >
                  Upload a Thumbnail for your story
                </Typography>
              </Grid>
            ) : null}
            <Grid item xs={12} className={classes.titleAdd}>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={onFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.button}
                >
                  Upload Thumbnail
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} className={classes.titleAdd}>
              {storyDetails.thumbnail ? (
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  className={classes.button}
                  onClick={() => handleClose()}
                >
                  Use existing thumbnail
                </Button>
              ) : null}
            </Grid>
          </Grid>
        )}
      </Stepper>
    </Dialog>
  );
};

export default withStyles(useStyles)(TitleDialog);
