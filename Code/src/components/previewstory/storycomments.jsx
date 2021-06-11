import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Input,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToPropsComments } from "../../redux/mapFunctions";

import { withWindowConsumer } from "../../contexts/window/consumer";
import Swal from "sweetalert2";
import { CommentGrid } from "../";

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
    maxWidth: "30px",
    "& h6": {
      cursor: "pointer",
    },
    "& img": {
      height: (props) => (props.width < props.limit ? "3vh" : "1.5rem"),
      cursor: "pointer",
    },
  },
  orderGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  breadcrumbsStyle: {
    border: "2px solid lightgray",
    "& ol": { flexWrap: "inherit" },
  },
  commentsFirstContainer: {
    paddingBottom: "2rem",
  },
  underlined: {
    textDecoration: "underline",
    fontSize: "1.25rem",
  },
});

const StoryCommments = ({ classes, id, loggedUser, limit, width }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState(false);

  useEffect(() => {
    getComments("likes");
  }, []);

  const getComments = async (order) => {
    await axios
      .get(
        `http://localhost:9001/api/stories/${id}/comments/?ordering=${
          type ? order : "-" + order
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(
        (response) => setComments(response.data),
        setToggle(order),
        setType(!type)
      )
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
        getComments("date");
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

  return (
    <Grid item xs={12}>
      <Grid container className={classes.commentsFirstContainer}>
        <Grid item xs={12}>
          <Typography
            color="primary"
            variant="h5"
            style={{ textAlign: "center", margin: "2vh" }}
          >
            Comments
          </Typography>
        </Grid>

        {comments ? null : (
          <Typography
            color="primary"
            variant="subtitle2"
            style={{ textAlign: "center", margin: "2vh" }}
          >
            You have to be logged in to see comments.
          </Typography>
        )}
        {comments ? (
          <Grid item xs={12} className={classes.orderGrid}>
            <Breadcrumbs seperator="|" className={classes.breadcrumbsStyle}>
              <Typography
                color="primary"
                variant="subtitle1"
                style={{
                  textAlign: "center",
                  margin: "2vh",
                  cursor: "pointer",
                }}
                className={toggle === "date" ? classes.underlined : null}
                onClick={() => getComments("date")}
              >
                Date
              </Typography>
              <Typography
                color="primary"
                variant="subtitle1"
                style={{
                  textAlign: "center",
                  margin: "2vh",
                  cursor: "pointer",
                }}
                className={toggle === "score" ? classes.underlined : null}
                onClick={() => getComments("score")}
              >
                Score
              </Typography>
              <Typography
                color="primary"
                variant="subtitle1"
                style={{
                  textAlign: "center",
                  margin: "2vh",
                  cursor: "pointer",
                }}
                className={toggle === "likes" ? classes.underlined : null}
                onClick={() => getComments("dislikes")}
              >
                Like
              </Typography>
              <Typography
                color="primary"
                variant="subtitle1"
                style={{
                  textAlign: "center",
                  margin: "2vh",
                  cursor: "pointer",
                }}
                className={toggle === "dislikes" ? classes.underlined : null}
                onClick={() => getComments("likes")}
              >
                Dislike
              </Typography>
            </Breadcrumbs>
          </Grid>
        ) : null}
      </Grid>
      {comments ? (
        <CommentGrid
          loggedUser={loggedUser}
          comments={comments}
          getComments={getComments}
        />
      ) : null}
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
            id="comment-button"
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
