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

const useStyles = () => ({
    input: {
        minWidth: "30%",
        maxWidth: "min(50%,600px)",
        minHeight: "5rem",
        backgroundColor: "white",
        border: "2px solid lightgray",
    },
    sendCommentGrid: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "column",
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
        maxWidth: "min(50%,600px)",
        padding: "1vh 2vw",
        "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        margin: "2vh",
    },
    comment: {
        borderBottom: "2px solid lightgray",
        borderTop: "2px solid lightgray",
        minHeight: "5rem",
        padding: "0.5rem 0",
    },
});

const StoryCommments = ({ classes, id, loggedUser, limit, width }) => {
    const [text, setText] = useState("");
    const [comments, setComments] = useState(null);

    useEffect(() => {
        getComments();
    }, []);

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
            .then(getComments())
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
            .then(getComments())
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
            .then(getComments())
            .catch((err) => console.log(err));
    };

    console.log(comments);
    return (
        <Grid item xs={12}>
            <Typography
                color="primary"
                variant="h5"
                style={{ textAlign: "center", margin: "2vh" }}
            >
                Comments
            </Typography>
            {comments
                ? comments.map((el) =>
                      el.story === id ? (
                          <Grid
                              item
                              xs={12}
                              className={classes.previewComment}
                              key={el.uuid}
                              className={classes.commentGrid}
                          >
                              <Typography color="primary" variant="subtitle2">
                                  {el.author}
                              </Typography>
                              <Typography
                                  variant="subtitle1"
                                  className={classes.comment}
                              >
                                  {el.text}
                              </Typography>

                              <Grid
                                  item
                                  xs={12}
                                  style={{
                                      display: "flex",
                                      justifyContent: "space-around",
                                      padding: "1rem 0",
                                  }}
                              >
                                  {el.can_user_like ? (
                                      <Grid
                                          item
                                          md={2}
                                          xs={4}
                                          className={classes.storyItemIcon}
                                          alignItems="center"
                                          onClick={() => {
                                              likeComment(el.id);
                                          }}
                                      >
                                          <img src={UpArrow} alt="UpArrow" />
                                          <Typography
                                              variant={
                                                  limit > width
                                                      ? "subtitle2"
                                                      : "subtitle1"
                                              }
                                              color="primary"
                                          >
                                              Like
                                          </Typography>
                                      </Grid>
                                  ) : null}
                                  {el.can_user_dislike ? (
                                      <Grid
                                          item
                                          md={2}
                                          xs={4}
                                          className={classes.storyItemIcon}
                                          alignItems="center"
                                          onClick={() => {
                                              dislikeComment(el.id);
                                          }}
                                      >
                                          <img
                                              src={DownArrow}
                                              alt="DownArrow"
                                          />
                                          <Typography
                                              variant={
                                                  limit > width
                                                      ? "subtitle2"
                                                      : "subtitle1"
                                              }
                                              color="primary"
                                          >
                                              Dislike
                                          </Typography>
                                      </Grid>
                                  ) : null}
                              </Grid>
                          </Grid>
                      ) : null
                  )
                : null}
            <Grid item xs={12} className={classes.sendCommentGrid}>
                <Input
                    color="primary"
                    placeholder="Enter your text"
                    fullWidth
                    multiline
                    className={classes.input}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
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
        </Grid>
    );
};

export default compose(
    withWindowConsumer,
    connect(mapStateToPropsComments),
    withStyles(useStyles)
)(StoryCommments);
