import React from "react";

import { Grid, Card, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = () => ({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5rem 0",
  },
});

const SearchBar = ({ classes }) => {
  return (
    <Grid container justify="space-around">
      <Card variant="text" className={classes.card}>
        <Button variant="text" color="primary">
          Order by Date
        </Button>
      </Card>
      <Card variant="text" className={classes.card}>
        <Button variant="text" color="primary">
          Order by Score
        </Button>
      </Card>
      <Card variant="text" className={classes.card}>
        <Button variant="text" color="primary">
          Order by Like
        </Button>
      </Card>
      <Card variant="text" className={classes.card}>
        <Button variant="text" color="primary">
          Order by Dislike
        </Button>
      </Card>
    </Grid>
  );
};

export default compose(withStyles(useStyles))(SearchBar);
