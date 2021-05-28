import React, { useState } from "react";
import { Chip, Grid, Dialog, Button, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

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

const LocationInfo = ({
    classes,
    locationInfo,
    setLocationInfo,
    storyId,
    loggedUser,
}) => {
    const [open, setOpen] = useState(false);
    const [locationText, setLocationText] = useState("");
    const icon = <AddCircleIcon />;
    const cancelIcon = <CancelIcon />;

    const handleClickOpen = () => {
        setOpen(true);
        setLocationText("");
    };

    const handleClose = () => {
        setOpen(false);
        setLocationText("");
    };

    const addNewTag = async (value) => {
        let newLocation = locationInfo.includes(`${value}`)
            ? { locations: [...locationInfo, value] }
            : { locations: locationInfo };
        await axios
            .patch(
                `http://localhost:9001/api/stories/${storyId}/`,
                locationInfo,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${loggedUser.token}`,
                    },
                }
            )
            .then(() => {
                console.log(newLocation);
            })
            .catch((err) => console.log(err));

        setOpen(false);
    };

    const deleteTag = (value) => {
        const newLocations = locationInfo.locations.filter(
            (el) => !(el === value)
        );
        setLocationInfo({ locations: newLocations });
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
                            label="Enter location"
                            value={locationText}
                            InputLabelProps={{
                                style: { color: "#1687a7" },
                            }}
                            onChange={(event) =>
                                setLocationText(event.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.dialogButtonGrid}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addNewTag(locationText);
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
                    label="Add locations"
                    onClick={() => handleClickOpen()}
                    className={classes.chip}
                />
                {locationInfo.length
                    ? locationInfo.map((el) => (
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

export default compose(withStyles(useStyles))(LocationInfo);
