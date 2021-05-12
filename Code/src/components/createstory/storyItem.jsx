import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Breadcrumbs,
  Input,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { v4 as uuidv4 } from "uuid";

import PlusLogo from "../../assets/logo/plusLogo.svg";

const useStyles = {
  storyItemGrid: {
    margin: "5vh 5vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #1687a7",
    borderRadius: "15px",
    minHeight: "10vh",
    "& img": {
      cursor: "pointer",
      maxHeight: "50px",
    },
  },
  breadcrumbsText: {
    "&:hover": {
      color: "#1687a7",
      cursor: "pointer",
    },
  },
  titleAdd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1vh 3vw",
  },
  titleAddButtonSection: {
    padding: "1vh 1vw",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "3vh",
  },
};

const StoryItem = ({ classes, addStoryInfo, deleteStoryInfo }) => {
  const [state, setState] = useState(1);
  const [uuid, setUuid] = useState(uuidv4());
  const [text, setText] = useState("");

  const addTitle = (title, id) => {
    const info = {
      type: "title",
      id,
      content: title,
    };
    addStoryInfo(info, id);
    setState(31);
  };

  const deleteTitle = (id) => {
    deleteStoryInfo(id);
    setState(1);
  };
  return (
    <Grid item xs={12} className={classes.storyItemGrid}>
      {state === 1 ? (
        <img src={PlusLogo} alt="plus" onClick={() => setState(2)} />
      ) : null}
      {state === 2 ? (
        <Breadcrumbs separator="|" aria-label="breadcrumb">
          <Typography
            className={classes.breadcrumbsText}
            variant="h5"
            onClick={() => setState(3)}
          >
            Title
          </Typography>
          <Typography
            className={classes.breadcrumbsText}
            variant="h5"
            onClick={() => setState(4)}
          >
            Text
          </Typography>
          <Typography
            className={classes.breadcrumbsText}
            variant="h5"
            onClick={() => setState(5)}
          >
            Image
          </Typography>
        </Breadcrumbs>
      ) : null}
      {state === 3 ? (
        <Grid item xs={12} className={classes.titleAdd}>
          <Input
            color="primary"
            placeholder="Enter your title"
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
            InputLabelProps={{
              style: { color: "#1687a7" },
            }}
          />
          <Grid item xs={12} className={classes.titleAddButtonSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addTitle(text, uuid)}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState(2)}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      ) : null}
      {state === 31 ? (
        <Grid item xs={12} className={classes.titleAdd}>
          <Typography color="primary" variant="h6">
            Title: {text}
          </Typography>
          <Grid item xs={12} className={classes.titleAddButtonSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState(3)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteTitle(uuid)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(StoryItem);
