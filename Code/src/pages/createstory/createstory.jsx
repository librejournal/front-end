import React, { useState, useEffect, memo } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "recompose";
import { connect } from "react-redux";

import { mapStateToCreateStoryPage } from "../../redux/mapFunctions";

import axios from "axios";

import Swal from "sweetalert2";

import {
    PreviewStory,
    CreateStory,
    TagsArea,
    LocationArea,
} from "../../components";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = {
    createStoryPageContainer: {
        padding: "0 3vw",
        display: "flex",
        textAlign: "center",
        height: "80vh",
        overflowY: "auto",
    },
    previewTitle: {
        borderBottom: "2px solid gray",
    },
    createStoryLeftContainer: {
        height: "65vh",
        maxHeight: "65vh",
        overflowY: "auto",
    },
    createStoryRightContainer: {
        height: "65vh",
        maxHeight: "65vh",
        overflowY: "auto",
        maxWidth: "600px",
        margin: "0 auto ",
        padding: "2vh 0",
    },
    createStoryTitle: {
        borderBottom: "2px solid lightgray",
    },
    createStoryBottomGrid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "7vh",
        borderTop: "2px solid lightgray",
        padding: "1vh 5vw",
    },
    bottomButton: {
        margin: "2vh 0 1vh 0",
    },
};

const CreateStoryPage = ({ classes, loggedUser, limit, width }) => {
    const getStoryInfo = async () => {
        axios
            .get("http://localhost:9001/api/stories/drafts", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${loggedUser.token}`,
                },
            })
            .then((response) => {
                if (response.data.length > 0) {
                    const data = response.data[0];
                    console.log(data);
                    setStoryInfo(data.components);
                    setStoryId(data.id);
                    setTagInfo(data.tags);
                    setLocationInfo(data.locations);
                } else createNewStory();
            })
            .catch((error) => console.log(error));
    };

    const publishStory = async () => {
        axios
            .post(
                `http://localhost:9001/api/stories/${storyId}/publish`,
                null,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${loggedUser.token}`,
                    },
                }
            )
            .then((response) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Story is Published",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error",
                    showConfirmButton: false,
                    timer: 2000,
                });
            });
    };

    const createNewStory = async () => {
        const info = {
            author: loggedUser.profile_id,
        };

        await axios
            .post("http://localhost:9001/api/stories/", info, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${loggedUser.token}`,
                },
            })
            .then((response) => getStoryInfo())
            .catch((err) => console.log(err));
    };

    const [storyInfo, setStoryInfo] = useState([]);
    const [tagInfo, setTagInfo] = useState({ tags: [] });
    const [locationInfo, setLocationInfo] = useState({ locations: [] });
    const [storyId, setStoryId] = useState(null);

    useEffect(() => {
        getStoryInfo();
    }, []);
    console.log(storyInfo);
    return (
        <Grid container className={classes.createStoryPageContainer}>
            <Grid item xs={12} className={classes.createStoryTitle}>
                <Typography color="primary" variant="h4">
                    Create a new story
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                className={classes.createStoryLeftContainer}
            >
                <CreateStory
                    storyInfo={storyInfo}
                    setStoryInfo={setStoryInfo}
                    id={storyInfo.length}
                    storyId={storyId}
                    token={loggedUser.token}
                />
            </Grid>
            <Grid
                item
                xs={12}
                md={6}
                className={classes.createStoryRightContainer}
            >
                <Typography
                    variant="h4"
                    color="primary"
                    className={classes.previewTitle}
                >
                    Preview
                </Typography>
                {storyInfo.length === 0 ? (
                    <Typography variant="h6">
                        Preview of your story will appear as you add more
                        elements below.
                    </Typography>
                ) : (
                    <PreviewStory storyInfo={storyInfo} />
                )}
            </Grid>
            <Grid container xs={12} className={classes.createStoryBottomGrid}>
                <Grid item xs={6} md={4}>
                    <TagsArea
                        tagInfo={tagInfo}
                        setTagInfo={setTagInfo}
                        storyId={storyId}
                        loggedUser={loggedUser}
                    />
                </Grid>

                <Grid item xs={6} md={4}>
                    <LocationArea
                        locationInfo={locationInfo}
                        setLocationInfo={setLocationInfo}
                        loggedUser={loggedUser}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={4}
                    className={limit > width ? classes.bottomButton : null}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => publishStory()}
                    >
                        Create a story
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default compose(
    memo,
    withWindowConsumer,
    connect(mapStateToCreateStoryPage),
    withStyles(useStyles)
)(CreateStoryPage);
