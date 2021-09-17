import React, { useState } from "react";
import {
  Chip,
  Grid,
  Dialog,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import runtimeEnv from "@mars/heroku-js-runtime-env";

import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import { compose } from "recompose";
import Swal from "sweetalert2";

const useStyles = () => ({
  dialogContainer: {
    height: "20vh",
    width: "100%",
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
    flexDirection: "column",
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
  const [locations, setLocations] = useState(null);
  const [dialogStep, setDialogStep] = useState(1);
  const [locationCityText, setLocationCityText] = useState("");
  const [locationProvinceText, setLocationProvinceText] = useState("");

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

  const handleSetLocation = (data) => {
    setLocations(data);
    setDialogStep(3);
  };

  const env = runtimeEnv();

  const updateStoryInfo = async () => {
    await axios
      .get(`${env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setLocationInfo(data.locations);
      })
      .catch((error) => console.log(error));
  };

  const attachLocationToStory = (tag) => {
    let info = locationInfo.map((el) => el.id);
    info.push(tag);
    const url = `${env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`;
    axios
      .patch(
        url,
        { locations: info },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        updateStoryInfo();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Location added",
          showConfirmButton: false,
          timer: 2000,
        });
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const unattachLocationToStory = (tag) => {
    let info = locationInfo.map((el) => el.id).filter((el) => el !== tag);
    const url = `${env.REACT_APP_DB_HOST}/api/stories/drafts/${storyId}`;
    axios
      .patch(
        url,
        { locations: info },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Location deleted",
          showConfirmButton: false,
          timer: 2000,
        });
        updateStoryInfo();
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  const searchLocation = async (value) => {
    const url = `${env.REACT_APP_DB_HOST}/api/stories/locations?search=${value}`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        response.data.length
          ? handleSetLocation(response.data)
          : setDialogStep(2);
      })
      .catch((err) => console.log(err));
  };

  const createLocation = async (country, city, province) => {
    const url = `${env.REACT_APP_DB_HOST}/api/stories/locations`;
    const location = {
      country: country,
      city: city,
      province_1: province,
    };
    await axios
      .post(url, location, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setLocations(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tag is created",
          showConfirmButton: false,
          timer: 2000,
        });
        attachLocationToStory(response.data.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid item xs={12}>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {dialogStep === 1 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="h6">
                Search for existing locations
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dialogTextField}>
              <TextField
                id="standard-basic"
                color="primary"
                label="Enter location"
                value={locationText}
                InputLabelProps={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) => setLocationText(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  searchLocation(locationText);
                }}
              >
                Search
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
        ) : null}
        {dialogStep === 2 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="h6">
                No location found
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="subtitle2">
                You can either add a new location or try to search different
                one.
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dialogTextField}>
              <TextField
                id="standard-basic"
                color="primary"
                placeholder="Enter tag"
                value={locationText}
                InputLabelProps={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) => setLocationText(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  searchLocation(locationText);
                }}
              >
                Search for a new location
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(4)}
              >
                Create a new location
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
        ) : null}
        {dialogStep === 3 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography variant="h6" color="primary">
                Locations are listed below, click the location you want to add
              </Typography>
            </Grid>
            {locations.map((el) => (
              <Grid item xs={12} className={classes.dialogButtonGrid}>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => attachLocationToStory(el.id)}
                >
                  {el.country} - {el.city} - {el.province_1}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(1)}
              >
                Search for a new location
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(4)}
              >
                Create a new location
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
        ) : null}

        {dialogStep === 4 ? (
          <Grid container className={classes.dialogContainer}>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Typography color="primary" variant="h6">
                Enter the new location info
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.dialogTextField}>
              <TextField
                id="standard-basic"
                color="primary"
                placeholder="Enter country"
                value={locationText}
                InputLabelProps={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) => setLocationText(event.target.value)}
              />
              <TextField
                id="standard-basic"
                color="primary"
                placeholder="Enter city"
                value={locationCityText}
                InputLabelProps={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) => setLocationCityText(event.target.value)}
              />
              <TextField
                id="standard-basic"
                color="primary"
                placeholder="Enter province"
                value={locationProvinceText}
                InputLabelProps={{
                  style: { color: "#1687a7" },
                }}
                onChange={(event) =>
                  setLocationProvinceText(event.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.dialogButtonGrid}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogStep(1)}
              >
                Search a new location
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  createLocation(
                    locationText,
                    locationCityText,
                    locationProvinceText
                  )
                }
              >
                Create a new location
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
        ) : null}
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
                label={`${el.country} - ${el.city} - ${el.province_1}`}
                onClick={() => unattachLocationToStory(el.id)}
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
