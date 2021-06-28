import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { TagInfo } from "../../components";

const useStyles = () => ({
  userPageContainer: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const TagPage = ({ classes, location }) => {
  const [tagText, setTagText] = useState(window.location.hash.split("#")[1]);
  return (
    <Grid container className={classes.userPageContainer}>
      <TagInfo tagText={tagText} />
    </Grid>
  );
};

export default withStyles(useStyles)(TagPage);
