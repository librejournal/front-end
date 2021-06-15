import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Input,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
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
    "& h5": { color: "white" },
    "& svg": { color: "white" },
  },
});

const StoryCommments = ({ classes, id, loggedUser, limit, width }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState(false);
  const [orderState, setOrderState] = useState(null);
  const [mode, setMode] = useState(null);

  const handleChange = (event) => {
    setOrderState(event.target.value);
  };

  const handleChangeMode = (event) => {
    setMode(event.target.value);
  };

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
          <Accordion>
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
                  style={{ textAlign: "center", margin: "2vh" }}
                >
                  Comments
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                item
                xs={12}
                style={{
                  minHeight: "10rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  backgroundColor: "white",
                }}
              >
                <FormControl style={{ width: "40%", margin: "auto 0" }}>
                  <InputLabel id="demo-simple-select-label">
                    <Typography variant="subtitle1" color="primary">
                      Order By
                    </Typography>
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                  >
                    <MenuItem value={"date"}>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        onClick={() => getComments("date")}
                      >
                        Date
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"score"}>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        onClick={() => getComments("score")}
                      >
                        Score
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"likes"}>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        onClick={() => getComments("likes")}
                      >
                        Likes
                      </Typography>
                    </MenuItem>
                    <MenuItem value={"dislikes"}>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        onClick={() => getComments("dislikes")}
                      >
                        Dislikes
                      </Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  component="fieldset"
                  style={{ width: "20%", margin: "15px 0" }}
                >
                  <FormLabel component="legend">
                    <Typography variant="subtitle1" color="primary">
                      Mode
                    </Typography>
                  </FormLabel>

                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={mode}
                    onChange={handleChangeMode}
                    color="primary"
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio color="primary" />}
                      label="Ascending"
                      color="primary"
                    />
                    <FormControlLabel
                      value="-"
                      control={<Radio color="primary" />}
                      label="Descending"
                      color="primary"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </AccordionDetails>
          </Accordion>
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
