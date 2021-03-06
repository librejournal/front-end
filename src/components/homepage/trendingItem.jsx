import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { Link } from "react-router-dom";

const useStyles = () => ({
  itemGrid: {
    background: (props) =>
      props.backgroundImage ? `url(${props.backgroundImage})` : null,
    height: "20vh",
    display: "flex",
    justifyContent: "flex-end",
    width: "max(15vw, 200px)",
    padding: "2vh",
    margin: "1vh 0",
    border: "0.5px solid gray",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    borderRadius: "15px",
    backgroundColor: "white",
    transition: "all 0.8s ease-out",
    "&:hover": {
      backgroundColor: "#1687a7",
      padding: "2vh 1vh",
    },
  },
  itemTitleGrid: {
    background: (props) =>
      "url('https://cdn.windowsreport.com/wp-content/uploads/2020/10/IMG-file-886x590.jpg') no-repeat center center",
    backgroundColor: (props) => (props.imageUrl ? null : "#1687a7"),
    display: "flex",
    alignItems: "flex-end",
    backgroundSize: "140% !important",
    padding: "1vh 2vw",
    "-webkit-box-shadow": "inset 0px -5vh 28px 1px rgba(0,0,0,0.8)",
    "-moz-box-shadow": "inset 0px -5vh 28px 1px rgba(0,0,0,0.8)",
    "box-shadow": "inset 0px -5vh 28px 1px rgba(0,0,0,0.8)",
    cursor: "pointer",
    transition: "all 1.8s ease-in",
    "-moz-transition": "all 1.8s ease-in",
    "-ms-transition": "all 1.8s ease-in",
    "-o-transition": "all 1.8s ease-in",
    "-webkit-transition": "all 1.8s ease-in",
    "&:hover": {
      overflow: "hidden !important",
      backgroundSize: "160% !important",
    },
  },
  itemTitleText: {
    borderTop: "2px solid white",
    width: "60%",
    padding: "0 0.5vw",
  },
});

const TrendingItem = ({ classes, title, thumbnail, id }) => {
  return (
    <Link
      to={{
        pathname: `stories/${id}`,
        state: { id: id },
      }}
      key={id}
      style={{ textDecoration: "none" }}
    >
      <Grid container className={classes.itemGrid}>
        <Grid
          item
          xs={12}
          className={classes.itemTitleGrid}
          style={
            thumbnail
              ? {
                  backgroundImage: `url(data:image/jpeg;base64,${thumbnail.data})`,
                }
              : null
          }
          key={thumbnail ? thumbnail.id : id}
        >
          <Typography color="secondary" className={classes.itemTitleText}>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
};

export default compose(React.memo, withStyles(useStyles))(TrendingItem);
