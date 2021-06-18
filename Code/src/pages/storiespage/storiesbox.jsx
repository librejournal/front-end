import React from "react";

import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { Link } from "react-router-dom";

const useStyles = () => ({
  storyPageContainer: {
    height: "35vh",
    display: "flex",
    padding: "2vh 2vw",
    maxWidth: "1600px",
    margin: "auto",
  },
  authorGrid: {
    display: "flex",
    flexDirection: "column",
    borderRight: "0.5px solid lightgray",
  },
  storyContainer: {
    border: "1px solid lightgray",
    cursor: "pointer",
    margin: "2vh 0",
    padding: "2vh 0",
    background: "white",
    maxHeight: "200px",
    "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
  },
  buttonGrid: {
    display: "flex",
    justifyContent: "space-evenly",
  },
});

const StoriesBox = ({
  mode,
  classes,
  data,
  loggedUser,
  editStory,
  deleteStory,
  editDraftStory,
  publishStory,
  deleteDraftStory,
  editSuccess,
}) => {
  console.log(data);
  return (
    <Grid container className={classes.storyPageContainer}>
      <Grid item sm={4} xs={12} style={{ height: "5vh" }}>
        <Typography color="primary" variant="h4">
          Your {mode === "draft" ? "Drafts" : "Stories"}
        </Typography>
      </Grid>
      <Grid item sm={12} xs={12} style={{ height: "25vh", overflowY: "auto" }}>
        {data.length > 0 ? (
          data.map((el) => (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.storyContainer}
              key={el.uuid}
            >
              <Grid item xs={12} sm={3} className={classes.authorGrid}>
                <Grid container alignItems="center">
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    className={classes.author}
                  >
                    Author:&nbsp;&nbsp;
                  </Typography>
                  <Typography variant="subtitle2">
                    {el.author.user.username}
                  </Typography>
                </Grid>
                <Grid container alignItems="center">
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    className={classes.author}
                  >
                    Created At:&nbsp;&nbsp;
                  </Typography>
                  <Typography variant="subtitle2">
                    {el.created.split("T")[0]} -{" "}
                    {el.created.split("T")[1].split(".")[0]}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.authorGrid}>
                <Grid container alignItems="center" justify="center">
                  <Typography variant="subtitle1" color="primary">
                    Title:&nbsp;
                  </Typography>
                  <Typography variant="h6">{el.title}</Typography>
                </Grid>
                {mode !== "draft" ? (
                  <Grid container alignItems="center" justify="space-around">
                    <Typography variant="subtitle2" color="primary">
                      Like:&nbsp;{el.like_count}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      Dislike:&nbsp;{el.dislike_count}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} className={classes.buttonGrid}>
                {mode !== "draft" ? (
                  <Link
                    to={{
                      pathname: `stories/${el.id}`,
                      state: { id: el.id },
                    }}
                    key={el.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ textDecoration: "none" }}
                    >
                      Show
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ textDecoration: "none" }}
                    onClick={() => publishStory(el.id)}
                  >
                    Publish
                  </Button>
                )}
                <Link
                  key={el.id}
                  to={
                    mode === "draft"
                      ? {
                          pathname: "/createstory",
                          hash: `#draft-${el.id}`,
                          state: { editId: el.id },
                        }
                      : {
                          pathname: "/createstory",
                          hash: `#story-${el.id}`,
                          state: { storyId: el.id },
                        }
                  }
                >
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      loggedUser.profile_id !== el.author.user.profile_id
                    }
                    style={{ textDecoration: "none" }}
                    onClick={() =>
                      mode === "draft" ? editDraftStory(el.id) : null
                    }
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ textDecoration: "none" }}
                  disabled={loggedUser.profile_id !== el.author.user.profile_id}
                  onClick={() =>
                    mode === "draft"
                      ? deleteDraftStory(el.id)
                      : deleteStory(el.id)
                  }
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))
        ) : mode === "draft" ? (
          <Typography variant="subtitle1">
            {" "}
            You do not have any drafts <br /> Click add button below to create a
            new draft.
          </Typography>
        ) : null}
      </Grid>
      {mode === "draft" ? (
        <Grid
          item
          xs={12}
          sm={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "5vh",
          }}
        >
          <Link
            to="/createstory"
            style={{ textDecoration: "none", display: "flex" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ textDecoration: "none", maxHeight: "100px" }}
            >
              Add a new story
            </Button>
          </Link>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default compose(withStyles(useStyles))(StoriesBox);
