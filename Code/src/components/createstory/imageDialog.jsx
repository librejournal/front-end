import React, { useState, useEffect } from "react";
import { Dialog, Typography, Grid, Button } from "@material-ui/core";
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

const ImageDialog = ({
  classes,
  open,
  handleClose,
  storyId,
  token,
  storyDetails,
}) => {
  const [imageFile, setImageFile] = useState(null);

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

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <Grid
        container
        alignItems="space-evenly"
        justify="center"
        style={{
          padding: "10%",
          margin: "auto",
        }}
      >
        {storyDetails ? (
          <Grid item xs={12}>
            <img
              src={`data:image/jpeg;base64,${storyDetails.thumbnail.data}`}
              alt={`thumbnail-${storyDetails.thumbnail.id}`}
            />
            <Typography
              color="primary"
              variant="subtitle1"
              style={{
                textAlign: "center",
                borderBottom: "0.2px solid lightgray",
              }}
            >
              Current Thumbnail
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
    </Dialog>
  );
};

export default withStyles(useStyles)(ImageDialog);
