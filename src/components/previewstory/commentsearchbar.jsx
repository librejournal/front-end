import React, { useEffect } from "react";

import {
  Grid,
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

const CommentSearchBar = ({
  classes,
  orderState,
  setOrderState,
  getComments,
  mode,
  setMode,
}) => {
  const changeOrderState = (order) => {
    setOrderState(order);
  };

  const resetState = () => {
    setOrderState(null);
    setMode(null);
  };

  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const handleChangeMode = (event) => {
    setMode(event.target.value);
  };

  useEffect(() => {
    return () => {};
  }, [getComments]);
  return (
    <Grid container>
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
          id="sort"
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
              getComments(orderState, mode);
            }}
          >
            Sort
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(useStyles))(CommentSearchBar);
