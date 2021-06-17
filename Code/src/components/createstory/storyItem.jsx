import React, { useState, useEffect } from "react";

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

import PlusLogo from "../../assets/logo/plusLogo.svg";
import axios from "axios";

import Swal from "sweetalert2";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

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
    background: "white",
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
    marginTop: "1.5vh",
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
    padding: "2vh 2vw 0 2vw",
  },
  midSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowGrid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "60%",
    "& svg": {
      color: "#1687a7",
      height: "5vh",
      width: "1.5rem",
      cursor: "pointer",
    },
  },
};

const StoryItem = ({
  classes,
  id,
  storyInfo,
  storyId,
  token,
  setStoryInfo,
  orderArray,
  setOrderArray,
  length,
  icon,
}) => {
  const [state, setState] = useState(1);
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState("h6");
  const [imageSize, setImageSize] = useState("10");
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

    uploadImage(formData);
  };

  const handleChange = (event) => {
    setTextSize(event.target.value);
  };

  const orderArrayFunction = (type) => {
    const itemOrder = storyInfo.order_id;
    let newArray = [];
    switch (type) {
      case "delete":
        newArray = orderArray.map((el) =>
          el.order_id > itemOrder
            ? { id: el.id, order_id: el.order_id - 1 }
            : { id: el.id, order_id: el.order_id }
        );
        return newArray;

      case "up":
        newArray = orderArray.map((el, ind) =>
          el.order_id === itemOrder
            ? { id: id, order_id: el.order_id - 1 }
            : itemOrder - el.order_id === 1
            ? { id: orderArray[ind].id, order_id: el.order_id + 1 }
            : el
        );
        return newArray;

      case "down":
        newArray = orderArray.map((el, ind) =>
          el.order_id === itemOrder
            ? { id: id, order_id: el.order_id + 1 }
            : el.order_id - itemOrder === 1
            ? { id: orderArray[ind].id, order_id: el.order_id - 1 }
            : el
        );
        return newArray;

      default:
        return orderArray;
    }
  };

  const updateStoryInfo = async (id) => {
    await axios
      .get(`http://localhost:9001/api/stories/drafts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setStoryInfo(data.components);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const updateOrderInfo = async (type) => {
    const newOrder = orderArrayFunction(type);

    await setOrderArray(newOrder);
    await axios
      .post(
        `http://localhost:9001/api/stories/${storyId}/components/order`,
        newOrder,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => updateStoryInfo(storyId))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setState(1);
    switch (storyInfo.type) {
      case "TITLE":
        setState(31);
        setText(storyInfo.text);
        setTextSize(storyInfo.type_setting);
        break;
      case "TEXT":
        setState(41);
        setText(storyInfo.text);
        setTextSize(storyInfo.type_setting);
        break;
      case "IMAGE":
        setState(511);
        setText(storyInfo.text);
        setTextSize(storyInfo.type_setting);
        break;
      default:
        setState(1);
        break;
    }
  }, [storyInfo, orderArray]);

  const valuetext = (value) => {
    setImageSize(value);
    return `${value}`;
  };

  const addTitle = async (text) => {
    const info = {
      type: "TITLE",
      text: text,
      type_setting: "title",
      story: storyId,
    };
    setState(31);
    axios
      .post(`http://localhost:9001/api/stories/${storyId}/components/`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        updateStoryInfo(storyId);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addText = (text, size) => {
    const info = {
      type: "TEXT",
      type_setting: size,
      text: text,
      story: storyId,
    };

    axios
      .post(`http://localhost:9001/api/stories/${storyId}/components/`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        updateStoryInfo(storyId);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setState(41);
  };

  const addImageUrl = (url) => {
    const info = {
      type: "IMAGE_URL",
      text: url,
      story: storyId,
      type_setting: imageSize,
    };
    axios
      .post(`http://localhost:9001/api/stories/${storyId}/components/`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        updateStoryInfo(storyId);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Add Success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setState(511);
  };

  const uploadImage = async (file) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/files/upload`;
    await axios
      .post(url, file, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(async (response) => {
        const componentUrl = `${process.env.REACT_APP_DB_HOST}/api/stories/${storyId}/components/`;
        const info = {
          type: "IMAGE",
          text: response.data.id,
          picture: response.data.id,
          story: storyId,
          type_setting: imageSize,
        };
        await axios
          .post(componentUrl, info, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          })
          .then((response) => {
            updateStoryInfo(storyId);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Add Success",
              showConfirmButton: false,
              timer: 2000,
            });
            console.log(response);
            setState(51);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = async (id) => {
    const deletedItemId = storyInfo.id;

    await axios
      .delete(
        `http://localhost:9001/api/stories/${storyId}/components/${deletedItemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        updateStoryInfo(storyId);
        updateOrderInfo("delete");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Delete Success",
          showConfirmButton: false,
          timer: 2000,
        });
        setState(1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editItem = async (id, type, value, type_setting) => {
    let editItemId = storyInfo.id;

    const info = {
      type: type,
      type_setting: type_setting,
      text: value,
      story: storyId,
    };

    await axios
      .patch(
        `http://localhost:9001/api/stories/${storyId}/components/${editItemId}`,
        info,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        updateStoryInfo(storyId);
        updateOrderInfo("edit");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Edit Success",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid item xs={12} className={classes.storyItemGrid}>
      <Grid item xs={1} className={classes.arrowGrid}>
        {icon ? (
          storyInfo.order_id === 1 ? null : (
            <ArrowUpwardIcon onClick={() => updateOrderInfo("up")} />
          )
        ) : null}
        {icon ? (
          storyInfo.order_id === length ? null : (
            <ArrowDownwardIcon onClick={() => updateOrderInfo("down")} />
          )
        ) : null}
      </Grid>
      <Grid item className={classes.midSection} xs={10}>
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
              multiline
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
                onClick={() => addTitle(text, id)}
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
            <Input
              color="primary"
              placeholder="Enter your title"
              fullWidth
              multiline
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
                onClick={() => editItem(id, "TITLE", text, "h2")}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteItem(id)}
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
              multiline
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
                  <MenuItem value={"h1"} className={classes.menuItem}>
                    h1
                  </MenuItem>
                  <MenuItem value={"h2"} className={classes.menuItem}>
                    h2
                  </MenuItem>
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
                onClick={() => addText(text, textSize, id)}
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
            <Input
              color="primary"
              placeholder="Enter your text"
              fullWidth
              multiline
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
                  <MenuItem value={"h1"} className={classes.menuItem}>
                    h1
                  </MenuItem>
                  <MenuItem value={"h2"} className={classes.menuItem}>
                    h2
                  </MenuItem>
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
                onClick={() => editItem(id, "TEXT", text, textSize)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteItem(id)}
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
                  Upload
                </Button>
              </label>
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
                step={5}
                marks
                min={5}
                max={100}
              />
            </Grid>
            <Grid item xs={12} className={classes.titleAddButtonSection}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addImageUrl(text)}
              >
                Add Image
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteItem(id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ) : null}
        {state === 511 ? (
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
                step={5}
                marks
                min={5}
                max={100}
              />
            </Grid>
            <Grid item xs={12} className={classes.titleAddButtonSection}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => editItem(id, "IMAGE", text, imageSize)}
              >
                Edit Image
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deleteItem(id)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default compose(withStyles(useStyles))(StoryItem);
