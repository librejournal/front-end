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
    getStories(null, null, null, null);
  };

  const search = () => {
    getStories(orderState, textWord, textTag, textLocation);
  };

  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  useEffect(() => {
    return () => {};
  }, [textWord]);
  return (
    <>
      <Grid container justify="space-around">
        <Card variant="outlined" className={classes.card}>
          <SearchIcon />
          <Input
            color="primary"
            placeholder="Search for word"
            fullWidth
            value={textWord}
            onChange={(event) => setTextWord(event.target.value)}
            InputLabelProps={{
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
            value={textLocation}
            onChange={(event) => setTextLocation(event.target.value)}
            InputLabelProps={{
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
            value={textTag}
            onChange={(event) => setTextTag(event.target.value)}
            InputLabelProps={{
              style: { color: "#1687a7" },
            }}
          />
        </Card>
      </Grid>
      <Grid container justify="space-around">
        <FormControl style={{ width: "40%" }}>
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
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label-mode">
            <Typography variant="subtitle1" color="primary">
              Mode
            </Typography>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label-mode"
            id="demo-simple-select-label-mode"
            onChange={handleChange}
          >
            <MenuItem value={"-"}>
              <Typography variant="subtitle1" color="primary">
                Descending
              </Typography>
            </MenuItem>
            <MenuItem value={"+"}>
              <Typography variant="subtitle1" color="primary">
                Ascending
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
        ;
      </Grid>
      <Grid container justify="space-around" alignItems="center">
        <Card variant="text" className={classes.card}>
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              search();
            }}
          >
            Search
          </Button>
        </Card>
        <Card variant="text" className={classes.card}>
          <Button variant="text" color="primary" onClick={() => resetState()}>
            Reset
          </Button>
        </Card>
      </Grid>
    </>
  );
};

export default compose(withStyles(useStyles))(SearchBar);
