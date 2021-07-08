import React, { useState } from "react";
import { Dialog, Typography, Grid, Input, Button } from "@material-ui/core";
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
  imageGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const TitleDialog = ({ classes, open, handleClose, storyId, token, title }) => {
  const [text, setText] = useState(title);

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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Title Added",
          showConfirmButton: false,
          timer: 2000,
        });
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
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
            value={text || ""}
            defaultValue={text}
            onChange={(event) => setText(event.target.value)}
            inputlabelprops={{
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
    </Dialog>
  );
};

export default withStyles(useStyles)(TitleDialog);
