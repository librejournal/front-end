import React, { useEffect, useState } from "react";
import { Grid, Typography, Input, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToPropsComments } from "../../redux/mapFunctions";
import UpArrow from "../../assets/logo/UpArrow.svg";
import DownArrow from "../../assets/logo/DownArrow.svg";
import { withWindowConsumer } from "../../contexts/window/consumer";
import _ from "underscore";
import Swal from "sweetalert2";

const useStyles = () => ({
  input: {
    minWidth: "30%",
    maxWidth: (props) => (props.width < props.limit ? null : "min(50%,600px)"),
    minHeight: "5rem",
    backgroundColor: "white",
    border: "2px solid lightgray",
  },
  sendCommentGrid: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "column",
    marginTop: "10%",
  },
  storyItemIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  commentScore: {
    display: "flex",
    alignItems: "center",
  },
});

const StoryCommments = ({ classes, id, loggedUser, limit, width }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(null);

  useEffect(() => {
    getComments();
  }, []);

  console.log(comments);
  const getComments = async () => {
    await axios
      .get(`http://localhost:9001/api/stories/${id}/comments/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err));
  };

  const createComment = async (comment) => {
    axios
      .post(
        `http://localhost:9001/api/stories/${id}/comments/`,
        { text: comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        getComments();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have entered your comment successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => console.log(err));
  };

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
        getComments();
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
        getComments();
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

  return (
    <Grid item xs={12}>
      <Typography
        color="primary"
        variant="h5"
        style={{ textAlign: "center", margin: "2vh" }}
      >
        Comments
      </Typography>
      {comments ? null : (
        <Typography
          color="primary"
          variant="subtitle2"
          style={{ textAlign: "center", margin: "2vh" }}
        >
          You have to be logged in to see comments.
        </Typography>
      )}
      {comments
        ? _.sortBy(comments, (el) => el.dislike_count - el.like_count).map(
            (el) => (
              <Grid item xs={12} key={el.uuid} className={classes.commentGrid}>
                <Grid item xs={1} className={classes.commentScore}>
                  <Typography color="primary" variant="h6">
                    {el.like_count - el.dislike_count}
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  {" "}
                  <Typography color="primary" variant="subtitle2">
                    {el.author.user.username} - {el.created.split("T")[0]}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.comment}>
                    {el.text}
                  </Typography>
                  {el.author.user.profile_id ===
                  loggedUser.profile_id ? null : (
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
                        md={2}
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
                        md={2}
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
            )
          )
        : null}
      {loggedUser.token ? (
        <Grid item xs={12} className={classes.sendCommentGrid}>
          <Input
            color="primary"
            placeholder="Enter your text"
            fullWidth
            multiline
            className={classes.input}
            value={text}
            onChange={(event) => setText(event.target.value)}
            key="myButton"
            InputLabelProps={{
              style: { color: "#1687a7" },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ textDecoration: "none" }}
            onClick={() => createComment(text)}
          >
            Comment
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default compose(
  React.memo,
  withWindowConsumer,
  connect(mapStateToPropsComments),
  withStyles(useStyles)
)(StoryCommments);
