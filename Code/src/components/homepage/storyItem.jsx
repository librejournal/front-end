import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import UpArrow from "../../assets/logo/UpArrow.svg";
import DownArrow from "../../assets/logo/DownArrow.svg";
import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";
import { Link } from "react-router-dom";
import { mapStateToPropsStoryItem } from "../../redux/mapFunctions";
import { connect } from "react-redux";

const useStyles = {
  storyItemContainer: {
    height: (props) => (props.limit > props.width ? "300px" : "500px"),
    border: "black 2px solid",
    padding: "1vh 1vw",
    alignSelf: "center",
    margin: "2vh 1vw",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    borderRadius: "15px",
    backgroundColor: "white",
    transition: "all 0.8s ease-out",
    "&:hover": {
      backgroundColor: "cornsilk",
      padding: "1vh 0.5vw",
    },
  },
  storyItemHeader: {
    margin: (props) => (props.width < props.limit ? "0" : "1vh 0"),
  },
  storyItemVote: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& img": {
      width: "max(30%,25px)",
      cursor: "pointer",
    },
  },
  storyItemImage: {
    border: "black 2px solid",
    height: "75%",
    background: (props) =>
      "url('https://cdn.windowsreport.com/wp-content/uploads/2020/10/IMG-file-886x590.jpg') no-repeat center center",
    backgroundColor: "#1687a7",
    color: "white",
    display: "flex",
    backgroundSize: "150% !important",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
    overflow: "hidden !important",
    cursor: "pointer",
    padding: "1vh 2vw",
    "-webkit-box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",
    "-moz-box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",
    "box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",

    transition: "all 1.2s ease-in",
    "-moz-transition": "all 1.8s ease-in",
    "-ms-transition": "all 1.8s ease-in",
    "-o-transition": "all 1.8s ease-in",
    "-webkit-transition": "all 1.8s ease-in",

    "& h3": {
      paddingBot: "2vh 0",
      borderTop: "solid white 2px",
      width: "100%",
    },
    "&:hover": {
      backgroundSize: "130% !important",
      overflow: "hidden !important",
    },
  },
  storyItemIcons: {
    display: "flex",
    padding: "10px",
  },

  storyItemIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& h6": {
      cursor: "pointer",
    },
    "& img": {
      height: (props) => (props.width < props.limit ? "3vh" : "50%"),
      cursor: "pointer",
    },
  },
  storyItemText: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& h6": {
      cursor: "pointer",
    },
  },
};

const StoryItem = ({
  classes,
  title,
  limit,
  width,
  likeCount,
  dislikeCount,
  author,
  date,
  id,
  loggedUser,
  state,
  thumbnail,
}) => {
  console.log(thumbnail);

  return (
    <Link
      to={{
        pathname: `stories/${id}`,
        state: { id: id },
      }}
      key={id}
      style={{ textDecoration: "none" }}
    >
      <Grid container className={classes.storyItemContainer}>
        <Grid item xs={1} />
        <Grid item xs={11} className={classes.storyItemHeader}>
          <Link
            to={
              state.user.id !== loggedUser.id
                ? {
                    pathname: `/user`,
                    hash: `#${state.id}`,
                    state: { user: state },
                  }
                : {
                    pathname: `/account`,
                  }
            }
            key={id}
            style={{ textDecoration: "none", display: "flex" }}
          >
            <Typography
              color="primary"
              variant="subtitle1"
              style={{ borderBottom: "0.5px solid lightgray" }}
            >
              {author}
            </Typography>
          </Link>
          <Typography color="primary" variant="subtitle2">
            {date.split("T")[0]}&nbsp;&nbsp;-&nbsp;&nbsp;
            {date.split("T")[1].split(".")[0]}
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.storyItemVote}>
          <img src={UpArrow} alt="UpArrow" />
          <Typography
            color="primary"
            variant={limit < width ? "h6" : "subtitle2"}
          >
            {likeCount}
          </Typography>
          <img src={DownArrow} alt="DownArrow" />
        </Grid>
        <Grid
          item
          xs={10}
          className={classes.storyItemImage}
          style={
            thumbnail
              ? {
                  backgroundImage: `url(data:image/jpeg;base64,${thumbnail.data})`,
                }
              : null
          }
          key={thumbnail ? thumbnail.id : id}
        >
          <Typography variant="h3">{title}</Typography>
        </Grid>
        <Grid container className={classes.storyItemIcons}>
          <Grid item md={2} xs={3} className={classes.storyItemIcon}>
            <Typography
              variant={limit > width ? "subtitle2" : "subtitle1"}
              color="primary"
            >
              Like: &nbsp;{likeCount}
            </Typography>
          </Grid>
          <Grid item md={2} xs={3} className={classes.storyItemIcon}>
            <Typography
              variant={limit > width ? "subtitle2" : "subtitle1"}
              color="primary"
            >
              Dislike: &nbsp;{dislikeCount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToPropsStoryItem),
  withStyles(useStyles)
)(StoryItem);
