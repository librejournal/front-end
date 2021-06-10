import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";
import UpArrow from "../../assets/logo/UpArrow.svg";
import DownArrow from "../../assets/logo/DownArrow.svg";
import { withWindowConsumer } from "../../contexts/window/consumer";
import Swal from "sweetalert2";

const useStyles = () => ({
  storyItemIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "30px",
    "& h6": {
      cursor: "pointer",
    },
    "& img": {
      height: (props) => (props.width < props.limit ? "3vh" : "1.5rem"),
      cursor: "pointer",
    },
  },
  commentGrid: {
    background: "white",
    maxWidth: (props) => (props.width < props.limit ? null : "min(50%,600px)"),
    padding: "1vh 2vw",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    margin: "1vh 0",
    display: "flex",
  },
  comment: {
    borderBottom: "2px solid lightgray",
    borderTop: "2px solid lightgray",
    minHeight: "5rem",
    padding: "0.5rem 0",
    wordBreak: "break-all",
  },
});

const StoryCommments = ({
  classes,
  id,
  loggedUser,
  limit,
  width,
  comments,
  getComments,
}) => {
  const likeComment = async (id) => {
    axios
      .post(
        `http://localhost:9001/api/stories/${id}/comments/${id}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        getComments("date");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have liked a comment",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => console.log(err));
  };

  const dislikeComment = async (id) => {
    axios
      .post(
        `http://localhost:9001/api/stories/${id}/comments/${id}/dislike`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        getComments("date");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have disliked a comment",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => console.log(err));
  };

  return comments.map((el) => (
    <Grid item xs={12} key={el.uuid} className={classes.commentGrid}>
      <Grid item xs={12}>
        <Typography color="primary" variant="subtitle2">
          {el.author.user.username} - {el.created.split("T")[0]} -{" "}
          {el.created.split("T")[1].split(".")[0]}
        </Typography>
        <Typography variant="subtitle1" className={classes.comment}>
          {el.text}
        </Typography>
        <Typography
          variant={limit > width ? "subtitle2" : "subtitle2"}
          color="primary"
          style={{
            borderBottom: "2px solid lightgray",
          }}
        >
          Like:&nbsp;{el.like_count}&nbsp;|&nbsp; Dislike:&nbsp;
          {el.dislike_count}
        </Typography>
        {el.author.user.profile_id === loggedUser.profile_id ? null : (
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "1rem 0",
            }}
          >
            <Grid
              item
              md={6}
              xs={4}
              className={classes.storyItemIcon}
              onClick={() => {
                likeComment(el.id);
              }}
            >
              <img
                src={UpArrow}
                alt="UpArrow"
                style={
                  !el.can_user_like
                    ? {
                        filter: "grayscale(100%)",
                      }
                    : null
                }
              />
              <Typography
                variant={limit > width ? "subtitle2" : "subtitle1"}
                color="primary"
              >
                Like
                {!el.can_user_like ? "d" : null}
              </Typography>
            </Grid>

            <Grid
              item
              md={6}
              xs={4}
              className={classes.storyItemIcon}
              onClick={() => {
                dislikeComment(el.id);
              }}
            >
              <img
                src={DownArrow}
                alt="DownArrow"
                style={
                  !el.can_user_dislike
                    ? {
                        filter: "grayscale(100%)",
                      }
                    : null
                }
              />
              <Typography
                variant={limit > width ? "subtitle2" : "subtitle1"}
                color="primary"
              >
                Dislike
                {!el.can_user_dislike ? "d" : null}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  ));
};

export default compose(
  React.memo,
  withWindowConsumer,
  withStyles(useStyles)
)(StoryCommments);
