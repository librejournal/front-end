import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { mapStateToStoriesPage } from "../../redux/mapFunctions";
import Swal from "sweetalert2";

const useStyles = () => ({
  storyPageContainer: {
    minHeight: "80vh",
    display: "flex",
    padding: "5vh 2vw",
    maxWidth: "1600px",
    margin: "auto",
  },
  authorGrid: {
    display: "flex",
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

const StoriesPage = ({ classes, loggedUser }) => {
  const [stories, setStories] = useState([]);
  const [editSuccess, setEditSuccess] = useState(0);

  const getStories = async () => {
    await axios
      .get("http://localhost:9001/api/stories/")
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStory = async (id) => {
    axios
      .delete(`http://localhost:9001/api/stories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deletion Success",
          showConfirmButton: false,
          timer: 2000,
        });
        getStories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editStory = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/${id}/`;
    await axios
      .patch(
        url,
        {
          is_draft: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((response) => {
        setEditSuccess(id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <Grid container style={{ overflowY: "auto" }}>
      <Grid container className={classes.storyPageContainer}>
        <Grid item xs={12}>
          {editSuccess ? (
            <Redirect
              to={{
                pathname: "/createstory",
                state: { editId: editSuccess },
              }}
            />
          ) : null}
          {stories.map((el) => (
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.storyContainer}
              key={el.uuid}
            >
              <Grid item xs={12} sm={4} className={classes.authorGrid}>
                <Typography
                  color="primary"
                  variant="h6"
                  className={classes.author}
                >
                  Author:&nbsp;&nbsp;
                </Typography>
                <Typography variant="h6">{el.author.user.username}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="primary">
                  {el.uuid}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.buttonGrid}>
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
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loggedUser.profile_id !== el.author.user.profile_id}
                  style={{ textDecoration: "none" }}
                  onClick={() => editStory(el.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ textDecoration: "none" }}
                  disabled={loggedUser.profile_id !== el.author.user.profile_id}
                  onClick={() => deleteStory(el.id)}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default compose(
  connect(mapStateToStoriesPage),
  withStyles(useStyles)
)(StoriesPage);
