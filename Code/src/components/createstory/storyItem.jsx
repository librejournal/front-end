import React, { useState } from "react";

import {
  Typography,
  Grid,
  Breadcrumbs,
  Input,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { v4 as uuidv4 } from "uuid";

import PlusLogo from "../../assets/logo/plusLogo.svg";

const useStyles = {
  storyItemGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #1687a7",
    borderRadius: "15px",
    maxWidth: "1500px",
    margin: "3vh auto",
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
  formControl: {
    minWidth: "120px",
    margin: "1vh 2vw",
  },
  inputLabelTitle: {
    color: "#1687a7",
  },
  menuItem: {
    color: "#1687a7",
  },
  sliderContainer: {
    width: "50%",
    padding: "2vh 2vw",
  },
};

const StoryItem = ({ classes, addStoryInfo, deleteStoryInfo }) => {
  const [state, setState] = useState(1);
  const [uuid, setUuid] = useState(uuidv4());
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState("h6");
  const [imageSize, setImageSize] = useState("20");

  const handleChange = (event) => {
    setTextSize(event.target.value);
  };

  const addTitle = (text, id) => {
    const info = {
      type: "title",
      id,
      content: text,
    };
    addStoryInfo(info, id);
    setState(31);
  };

  console.log(imageSize);
  const valuetext = (value) => {
    setImageSize(value);
    return `${value}`;
  };

  const addText = (text, size, id) => {
    const info = {
      type: "text",
      size,
      id,
      content: text,
    };
    addStoryInfo(info, id);
    setState(41);
  };

  const addImage = (url, id) => {
    const info = {
      type: "image",
      url,
      id,
      size: imageSize,
    };
    addStoryInfo(info, id);
    setState(511);
  };

  const deleteItem = (id) => {
    deleteStoryInfo(id);
    setState(1);
    setText("");
  };

  console.log(text);
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
              onClick={() => deleteItem(uuid)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ) : null}
      {state === 4 ? (
        <Grid item xs={12} className={classes.titleAdd}>
          <Input
            color="primary"
            placeholder="Enter your text"
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
            InputLabelProps={{
              style: { color: "#1687a7" },
            }}
          />
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="textSize" className={classes.inputLabelTitle}>
                Text Size
              </InputLabel>
              <Select
                labelId="textSize"
                displayEmpty
                value={textSize}
                onChange={handleChange}
              >
                <MenuItem value={"h3"} className={classes.menuItem}>
                  h3
                </MenuItem>
                <MenuItem value={"h4"} className={classes.menuItem}>
                  h4
                </MenuItem>
                <MenuItem value={"h5"} className={classes.menuItem}>
                  h5
                </MenuItem>
                <MenuItem value={"h6"} className={classes.menuItem}>
                  h6
                </MenuItem>
                <MenuItem value={"subtitle1"} className={classes.menuItem}>
                  subtitle1
                </MenuItem>
                <MenuItem value={"subtitle2"} className={classes.menuItem}>
                  subtitle2
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.titleAddButtonSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addText(text, textSize, uuid)}
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
      {state === 41 ? (
        <Grid item xs={12} className={classes.titleAdd}>
          <Typography color="primary" variant="h6">
            Text: {text}
          </Typography>
          <Grid item xs={12} className={classes.titleAddButtonSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState(4)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteItem(uuid)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      ) : null}
      {state === 5 ? (
        <Grid item xs={12} className={classes.titleAdd}>
          <Grid item xs={12} className={classes.titleAddButtonSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState(51)}
            >
              Enter URL
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState(52)}
            >
              Upload a photo
            </Button>
          </Grid>
        </Grid>
      ) : null}
      {state === 51 ? (
        <Grid item xs={12} className={classes.titleAdd}>
          <Input
            color="primary"
            placeholder="Enter URL"
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
            InputLabelProps={{
              style: { color: "#1687a7" },
            }}
          />
          <Grid item xs={12} className={classes.sliderContainer}>
            <Typography color="primary" variant="subtitle1">
              Change size of the image
            </Typography>
            <Slider
              defaultValue={imageSize}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              step={5}
              marks
              min={5}
              max={50}
            />
          </Grid>
          <Grid item xs={12} className={classes.titleAddButtonSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addImage(text, uuid)}
            >
              Add Image
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
      {state === 511 ? (
        <Grid item xs={12} className={classes.titleAdd}>
          <Typography color="primary" variant="h6">
            Image
          </Typography>
          <Grid item xs={12} className={classes.titleAddButtonSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setState(51)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteItem(uuid)}
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
