import React, { useEffect } from "react";

import {
  Grid,
  Input,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import SearchIcon from "@material-ui/icons/Search";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = () => ({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5rem 0",
    "& svg": {
      cursor: "pointer",
      padding: "0 2vw",
    },
  },
});

const SearchBar = ({
  classes,
  orderState,
  setOrderState,
  getStories,
  textTag,
  textLocation,
  textWord,
  setTextLocation,
  setTextTag,
  setTextWord,
  mode,
  setMode,
}) => {
  const changeOrderState = (order) => {
    setOrderState(order);
    getStories(order, textWord, textTag, textLocation);
  };

  const resetState = () => {
    setOrderState(null);
    setTextWord(null);
    setTextTag(null);
    setTextLocation(null);
    getStories(null, null, null, null, null);
  };

  const search = () => {
    getStories(orderState, textWord, textTag, textLocation, mode);
  };

  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const handleChangeMode = (event) => {
    setMode(event.target.value);
  };

  useEffect(() => {
    return () => {};
  }, [getStories]);
  return (
    <Grid container>
      <Grid container justify="space-around">
        <Card variant="outlined" className={classes.card}>
          <SearchIcon />
          <Input
            color="primary"
            placeholder="Search for word"
            fullWidth
            value={textWord || ""}
            onChange={(event) => setTextWord(event.target.value)}
            inputlabelprops={{
              style: { color: "#1687a7" },
            }}
          />
        </Card>
        <Card variant="outlined" className={classes.card}>
          <SearchIcon />
          <Input
            color="primary"
            placeholder="Search for location"
            fullWidth
            multiline
            value={textLocation || ""}
            onChange={(event) => setTextLocation(event.target.value)}
            inputlabelprops={{
              style: { color: "#1687a7" },
            }}
          />
        </Card>
        <Card variant="outlined" className={classes.card}>
          <SearchIcon />
          <Input
            color="primary"
            placeholder="Search for tag"
            fullWidth
            multiline
            value={textTag || ""}
            onChange={(event) => setTextTag(event.target.value)}
            inputlabelprops={{
              style: { color: "#1687a7" },
            }}
          />
        </Card>
      </Grid>
      <Grid container justify="space-around">
        <FormControl style={{ width: "40%", margin: "auto 0" }}>
          <InputLabel id="demo-simple-select-label">
            <Typography variant="subtitle1" color="primary">
              Order By
            </Typography>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
          >
            <MenuItem value={"date"}>
              <Typography
                variant="subtitle1"
                color="primary"
                onClick={() => changeOrderState("date")}
              >
                Date
              </Typography>
            </MenuItem>
            <MenuItem value={"score"}>
              <Typography
                variant="subtitle1"
                color="primary"
                onClick={() => changeOrderState("score")}
              >
                Score
              </Typography>
            </MenuItem>
            <MenuItem value={"likes"}>
              <Typography
                variant="subtitle1"
                color="primary"
                onClick={() => changeOrderState("likes")}
              >
                Likes
              </Typography>
            </MenuItem>
            <MenuItem value={"dislikes"}>
              <Typography
                variant="subtitle1"
                color="primary"
                onClick={() => changeOrderState("dislikes")}
              >
                Dislikes
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl
          component="fieldset"
          style={{ width: "20%", margin: "15px 0" }}
        >
          <FormLabel>
            <Typography variant="subtitle1" color="primary">
              Mode
            </Typography>
          </FormLabel>

          <RadioGroup
            aria-label="gender"
            name="gender"
            value={mode}
            onChange={handleChangeMode}
            color="primary"
          >
            <FormControlLabel
              value=""
              control={<Radio color="primary" />}
              label="Ascending"
              color="primary"
            />
            <FormControlLabel
              value="-"
              control={<Radio color="primary" />}
              label="Descending"
              color="primary"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid container justify="space-around" alignItems="center">
        <Card variant="elevation" className={classes.card}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              search();
            }}
          >
            Search
          </Button>
        </Card>
        <Card variant="elevation" className={classes.card}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => resetState()}
          >
            Reset
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(useStyles))(SearchBar);
