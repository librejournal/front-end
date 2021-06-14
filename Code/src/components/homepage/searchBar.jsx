import React, { useEffect } from "react";

import { Grid, Input, Card, Button } from "@material-ui/core";
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
  searchStories,
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
        <Card variant="outlined" className={classes.card}>
          <Button
            variant={orderState === "date" ? "contained" : "outlined"}
            color="primary"
            onClick={() => changeOrderState("date")}
          >
            Order by Date
          </Button>
        </Card>
        <Card variant="outlined" className={classes.card}>
          <Button
            variant={orderState === "score" ? "contained" : "outlined"}
            color="primary"
            onClick={() => changeOrderState("score")}
          >
            Order by Score
          </Button>
        </Card>
        <Card variant="outlined" className={classes.card}>
          <Button
            variant={orderState === "likes" ? "contained" : "outlined"}
            color="primary"
            onClick={() => changeOrderState("likes")}
          >
            Order by Like
          </Button>
        </Card>
        <Card variant="outlined" className={classes.card}>
          <Button
            variant={orderState === "dislikes" ? "contained" : "outlined"}
            color="primary"
            onClick={() => changeOrderState("dislikes")}
          >
            Order by Dislike
          </Button>
        </Card>
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
