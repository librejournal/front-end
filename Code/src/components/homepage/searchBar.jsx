import React, { useState } from "react";

import { Grid, Input, Card } from "@material-ui/core";
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

const SearchBar = ({ classes }) => {
  const [textWord, setTextWord] = useState("");
  const [textLocation, setTextLocation] = useState("");
  const [textTag, settextTag] = useState("");

  return (
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
          onChange={(event) => settextTag(event.target.value)}
          InputLabelProps={{
            style: { color: "#1687a7" },
          }}
        />
      </Card>
    </Grid>
  );
};

export default compose(withStyles(useStyles))(SearchBar);
