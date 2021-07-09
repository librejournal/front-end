import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { mapStateToStoriesPage } from "../../redux/mapFunctions";
import Swal from "sweetalert2";

import StoriesBox from "./storiesbox";

const useStyles = () => ({
  pageContainer: {
    minHeight: "80vh",
    display: "flex",
    padding: "5vh 2vw",
    maxWidth: "1600px",
    margin: "auto",
    overflowY: "auto",
  },
});

const StoriesPage = ({ classes, loggedUser }) => {
  const [stories, setStories] = useState([]);
  const [draftStories, setDraftStories] = useState([]);
  const [editSuccess, setEditSuccess] = useState(0);

  const getStories = async () => {
    await axios
      .get(`${process.env.REACT_APP_DB_HOST}/api/stories/`)
      .then((response) => {
        setStories(response.data);
        getStoryDrafts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStoryDrafts = async () => {
    await axios
      .get(`${process.env.REACT_APP_DB_HOST}/api/stories/drafts/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setDraftStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteStory = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_DB_HOST}/api/stories/${id}`, {
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
        getStoryDrafts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDraftStory = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${id}`, {
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
        getStoryDrafts();
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

  const publishStory = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${id}`;
    await axios
      .patch(
        url,
        {
          is_draft: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then((response) => {
        getStories();
        getStoryDrafts();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Story is published",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => console.log(err));
  };

  const editDraftStory = async (id) => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/drafts/${id}`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setEditSuccess(id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item xs={12}>
        {editSuccess ? (
          <Redirect
            to={{
              pathname: "/createstory",
              state: { editId: editSuccess },
            }}
          />
        ) : null}
        <StoriesBox
          data={draftStories}
          loggedUser={loggedUser}
          editStory={editStory}
          deleteStory={deleteStory}
          deleteDraftStory={deleteDraftStory}
          mode="draft"
          editDraftStory={editDraftStory}
          publishStory={publishStory}
          editSuccess={editSuccess}
        />

        <StoriesBox
          data={stories.filter(
            (el) => el.author.user.profile_id === loggedUser.profile_id
          )}
          loggedUser={loggedUser}
          editStory={editStory}
          deleteStory={deleteStory}
          editDraftStory={editDraftStory}
          mode="story"
          publishStory={publishStory}
          editSuccess={editSuccess}
        />
      </Grid>
    </Grid>
  );
};

export default compose(
  connect(mapStateToStoriesPage),
  withStyles(useStyles)
)(StoriesPage);
