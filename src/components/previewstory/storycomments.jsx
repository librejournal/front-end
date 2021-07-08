import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Input,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToPropsComments } from "../../redux/mapFunctions";

import { withWindowConsumer } from "../../contexts/window/consumer";
import Swal from "sweetalert2";
import { CommentGrid } from "../";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CommentSearchBar } from "../";

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
  titleText: {
    textAlign: "center",
    backgroundColor: "#1687a7",
    borderRadius: "10px",
    height: "5rem",
    "& h5": { color: "white" },
    "& svg": { color: "white" },
  },
});

const StoryCommments = ({ classes, id, loggedUser, limit, width }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(null);
  const [type, setType] = useState(false);
  const [orderState, setOrderState] = useState("likes");
  const [mode, setMode] = useState("");

  useEffect(() => {
    getComments(orderState, mode);
  }, []);

  const getComments = async (order, mode) => {
    await axios
      .get(
        `http://localhost:9001/api/stories/${id}/comments/?ordering=${mode}${order}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((response) => setComments(response.data), setType(!type))
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
        getComments(orderState, mode);
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
    <Grid container xs={12}>
      {comments ? (
        <Grid container className={classes.commentsFirstContainer}>
          <Grid item xs={12}>
            <Accordion
              square
              style={{ margin: "2rem 0", borderBottom: "3px solid lightgray" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.titleText}
              >
                <Grid item xs={12} id="title">
                  <Typography
                    color="primary"
                    variant="h5"
                    style={{ textAlign: "center" }}
                  >
                    Comments
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <CommentSearchBar
                  orderState={orderState}
                  setOrderState={setOrderState}
                  mode={mode}
                  setMode={setMode}
                  getComments={getComments}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <CommentGrid
              loggedUser={loggedUser}
              comments={comments}
              getComments={getComments}
              orderState={orderState}
              mode={mode}
            />
          </Grid>

          <Grid item xs={12} className={classes.sendCommentGrid}>
            <Input
              color="primary"
              placeholder="Enter your text"
              fullWidth
              multiline
              className={classes.input}
              value={text || ""}
              onChange={(event) => setText(event.target.value)}
              key="myButton"
              inputlabelprops={{
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
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography
            color="primary"
            variant="subtitle2"
            style={{ textAlign: "center", margin: "2vh" }}
          >
            You have to be logged in to see comments.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default compose(
  React.memo,
  withWindowConsumer,
  connect(mapStateToPropsComments),
  withStyles(useStyles)
)(StoryCommments);
