import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
  starboardGrid: {
    width: "max(10vw,250px)",
    height: "max(500px)",
    backgroundColor: "#1687a7",
    padding: "1vh 1.5vw",
    borderRadius: "25px",
    margin: "2vh 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  starboardTitle: {
    color: "white",
    textAlign: "center",
    borderBottom: "1px solid white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  starboardItemEntry: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-around",
    margin: "1vh 0",
    alignItems: "center",
    borderRadius: "10px",
  },
});

const StarboardItem = ({ classes, title, data }) => {
  return (
    <Grid contaniner className={classes.starboardGrid}>
      <Grid item xs={12} className={classes.starboardTitle}>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      {data.map((el) => (
        <Grid item xs={12} className={classes.starboardItemEntry}>
          <Typography color="primary">Logo</Typography>
          <Typography color="primary" className={classes.starboardName}>
            {el.name}
          </Typography>
          <Typography color="primary" className={classes.starboardPoint}>
            {el.point}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(useStyles)(StarboardItem);
