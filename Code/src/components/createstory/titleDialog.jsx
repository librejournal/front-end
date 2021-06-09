import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  Grid,
  Input,
  ListItem,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

const TitleDialog = ({ classes, open, handleClose, storyId, token, title }) => {
  const [text, setText] = useState(title);

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
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        Enter title for your story
      </DialogTitle>
      <List>
        <ListItem>
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
            <Grid item xs={12} className={classes.titleAddButtonSection}>
              <Button
                variant="contained"
                color="primary"
                disabled={text === ""}
                onClick={() => {
                  editTitle(text);
                  handleClose();
                }}
              >
                Save Title
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default withStyles(useStyles)(TitleDialog);
