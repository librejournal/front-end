import React, { useState } from "react";
import { Chip, Grid, Dialog, Button, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";

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
    const icon = <AddCircleIcon />;
    const cancelIcon = <CancelIcon />;

    const handleClickOpen = () => {
        setOpen(true);
        setTagText("");
    };

    const handleClose = () => {
        setOpen(false);
        setTagText("");
    };

    const addNewTag = async (value) => {
        let newTag = tagInfo.includes(`${value}`)
            ? [...tagInfo]
            : [...tagInfo, value];
        await axios
            .patch(
                `http://localhost:9001/api/stories/drafts/${storyId}`,
                { tags: newTag },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${loggedUser.token}`,
                    },
                }
            )
            .then(() => {
                setTagInfo([...tagInfo, value]);
                console.log(newTag);
            })
            .catch((err) => console.log(err));

        setOpen(false);
    };

    const deleteTag = (value) => {
        const newTags = tagInfo.tags.filter((el) => !(el === value));
        setTagInfo({ tags: newTags });
    };

    return (
        <Grid item xs={12}>
            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={open}
            >
                <Grid container className={classes.dialogContainer}>
                    <Grid item xs={12} className={classes.dialogTextField}>
                        <TextField
                            id="standard-basic"
                            color="primary"
                            label="Enter tag"
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
                                addNewTag(tagText);
                            }}
                        >
                            Add Tag
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
                              label={el}
                              onClick={() => deleteTag(el)}
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
