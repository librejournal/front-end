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
    midSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
    const [imageSize, setImageSize] = useState("20");

    const handleChange = (event) => {
        setTextSize(event.target.value);
    };

    const updateStoryInfo = async () => {
        await axios
            .get("http://localhost:9001/api/stories/drafts", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            })
            .then((response) => {
                if (response.data.length > 0) {
                    const data = response.data[0];
                    setStoryInfo(data.components);
                }
            })
            .catch((error) => console.log(error));
    };

    const updateOrderInfo = async (type) => {
        const itemOrder = storyInfo.order_id;
        const newOrder =
            type === "delete"
                ? orderArray.map((el) =>
                      el.order_id > itemOrder
                          ? { id: el.id, order_id: el.order_id - 1 }
                          : { id: el.id, order_id: el.order_id }
                  )
                : type === "up"
                ? orderArray.map(
                      (el) =>
                          (el.order_id =
                              itemOrder - 1
                                  ? { id: el.id, order_id: el.order_id + 1 }
                                  : (el.order_id = itemOrder
                                        ? {
                                              id: el.id,
                                              order_id: el.order_id - 1,
                                          }
                                        : el))
                  )
                : orderArray;
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
            .then((response) => console.log(response))
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
            case "IMAGE_URL":
                setState(511);
                setText(storyInfo.url);
                setTextSize(storyInfo.type_setting);
                break;
            default:
                setState(1);
                break;
        }
    }, [storyInfo]);

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
            .post(
                `http://localhost:9001/api/stories/${storyId}/components/`,
                info,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() => {
                updateStoryInfo();
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
            .post(
                `http://localhost:9001/api/stories/${storyId}/components/`,
                info,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then(() => {
                updateStoryInfo();
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

    const addImage = (url) => {
        const info = {
            type: "IMAGE",
            url,
            story: storyId,
            size: imageSize,
        };
        axios
            .post(
                `http://localhost:9001/api/stories/${storyId}/components/`,
                info,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log(response);
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
        //addStoryInfo(info, id);
        setState(511);
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
                updateStoryInfo();
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

    const editItem = (id, type, value, type_setting) => {
        let editItemId = storyInfo.id;

        const info = {
            type: type,
            type_setting: type_setting,
            text: value,
            story: storyId,
        };

        axios
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
                updateStoryInfo();
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
            <Grid item xs={1}>
                {icon ? (
                    storyInfo.order_id === 1 ? null : (
                        <ArrowUpwardIcon
                            onClick={() => updateOrderInfo("up")}
                        />
                    )
                ) : null}
                {icon ? (
                    storyInfo.order_id === length ? null : (
                        <ArrowDownwardIcon
                            onClick={() => updateOrderInfo("down")}
                        />
                    )
                ) : null}
            </Grid>
            <Grid item className={classes.midSection} xs={10}>
                {state === 1 ? (
                    <img
                        src={PlusLogo}
                        alt="plus"
                        onClick={() => setState(2)}
                    />
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
                        <Grid
                            item
                            xs={12}
                            className={classes.titleAddButtonSection}
                        >
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
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            InputLabelProps={{
                                style: { color: "#1687a7" },
                            }}
                        />
                        <Grid
                            item
                            xs={12}
                            className={classes.titleAddButtonSection}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    editItem(id, "TITLE", text, "h2")
                                }
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
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            InputLabelProps={{
                                style: { color: "#1687a7" },
                            }}
                        />
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel
                                    id="textSize"
                                    className={classes.inputLabelTitle}
                                >
                                    Text Size
                                </InputLabel>
                                <Select
                                    labelId="textSize"
                                    displayEmpty
                                    value={textSize}
                                    onChange={handleChange}
                                >
                                    <MenuItem
                                        value={"h1"}
                                        className={classes.menuItem}
                                    >
                                        h1
                                    </MenuItem>
                                    <MenuItem
                                        value={"h2"}
                                        className={classes.menuItem}
                                    >
                                        h2
                                    </MenuItem>
                                    <MenuItem
                                        value={"h3"}
                                        className={classes.menuItem}
                                    >
                                        h3
                                    </MenuItem>
                                    <MenuItem
                                        value={"h4"}
                                        className={classes.menuItem}
                                    >
                                        h4
                                    </MenuItem>
                                    <MenuItem
                                        value={"h5"}
                                        className={classes.menuItem}
                                    >
                                        h5
                                    </MenuItem>
                                    <MenuItem
                                        value={"h6"}
                                        className={classes.menuItem}
                                    >
                                        h6
                                    </MenuItem>
                                    <MenuItem
                                        value={"subtitle1"}
                                        className={classes.menuItem}
                                    >
                                        subtitle1
                                    </MenuItem>
                                    <MenuItem
                                        value={"subtitle2"}
                                        className={classes.menuItem}
                                    >
                                        subtitle2
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            className={classes.titleAddButtonSection}
                        >
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
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            InputLabelProps={{
                                style: { color: "#1687a7" },
                            }}
                        />
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel
                                    id="textSize"
                                    className={classes.inputLabelTitle}
                                >
                                    Text Size
                                </InputLabel>
                                <Select
                                    labelId="textSize"
                                    displayEmpty
                                    value={textSize}
                                    onChange={handleChange}
                                >
                                    <MenuItem
                                        value={"h1"}
                                        className={classes.menuItem}
                                    >
                                        h1
                                    </MenuItem>
                                    <MenuItem
                                        value={"h2"}
                                        className={classes.menuItem}
                                    >
                                        h2
                                    </MenuItem>
                                    <MenuItem
                                        value={"h3"}
                                        className={classes.menuItem}
                                    >
                                        h3
                                    </MenuItem>
                                    <MenuItem
                                        value={"h4"}
                                        className={classes.menuItem}
                                    >
                                        h4
                                    </MenuItem>
                                    <MenuItem
                                        value={"h5"}
                                        className={classes.menuItem}
                                    >
                                        h5
                                    </MenuItem>
                                    <MenuItem
                                        value={"h6"}
                                        className={classes.menuItem}
                                    >
                                        h6
                                    </MenuItem>
                                    <MenuItem
                                        value={"subtitle1"}
                                        className={classes.menuItem}
                                    >
                                        subtitle1
                                    </MenuItem>
                                    <MenuItem
                                        value={"subtitle2"}
                                        className={classes.menuItem}
                                    >
                                        subtitle2
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            className={classes.titleAddButtonSection}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    editItem(id, "TEXT", text, textSize)
                                }
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
                        <Grid
                            item
                            xs={12}
                            className={classes.titleAddButtonSection}
                        >
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
                        <Grid
                            item
                            xs={12}
                            className={classes.titleAddButtonSection}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addImage(text, id)}
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
                        <Grid
                            item
                            xs={12}
                            className={classes.titleAddButtonSection}
                        >
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
