import React, { useEffect } from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import UpArrow from "../../assets/logo/UpArrow.svg";
import DownArrow from "../../assets/logo/DownArrow.svg";
import CommentButton from "../../assets/logo/CommentButton.svg";

const useStyles = {
    storyItemContainer: {
        width: "max(46vw,500px)",
        border: "black 2px solid",
        padding: "1vh 1vw",
        alignSelf: "center",
    },
    storyItemHeader: {
        margin: "1vh 0",
    },
    storyItemVote: {
        margin: "1vh 0",
        display: "flex",
        flexDirection: "column",
        "& img": {
            width: "max(30%,35px)",
            cursor: "pointer",
        },
    },
    storyItemImage: {
        border: "black 2px solid",
        margin: "1vh 0",
        height: "40vh",
        background: (props) =>
            "url('https://cdn.windowsreport.com/wp-content/uploads/2020/10/IMG-file-886x590.jpg') no-repeat center center",
        backgroundColor: "#1687a7",
        color: "white",
        display: "flex",
        backgroundSize: "120% !important",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden !important",
        cursor: "pointer",
        padding: "1vh 2vw",
        "-webkit-box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",
        "-moz-box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",
        "box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",

        transition: "all 1.8s ease-in",
        "-moz-transition": "all 1.8s ease-in",
        "-ms-transition": "all 1.8s ease-in",
        "-o-transition": "all 1.8s ease-in",
        "-webkit-transition": "all 1.8s ease-in",
        "& h3": {
            paddingBot: "2vh 0",
            borderTop: "solid white 2px",
            width: "100%",
        },
        "&:hover": {
            backgroundSize: "130% !important",
            overflow: "hidden !important",
        },
    },
    storyItemIcons: {
        margin: "1vh 1vw",
        display: "flex",
    },
    storyItemIconsComment: {
        display: "flex",
        "& h6": {
            cursor: "pointer",
        },
        "& img": {
            height: "50%",
            cursor: "pointer",
        },
    },
    storyItemIconsLike: {
        display: "flex",
        "& h6": {
            cursor: "pointer",
        },
        "& img": {
            height: "50%",
            cursor: "pointer",
        },
    },
    storyItemIconsDislike: {
        display: "flex",
        "& h6": {
            cursor: "pointer",
        },
        "& img": {
            height: "50%",
            cursor: "pointer",
        },
    },
    storyItemIconsClickMore: {
        display: "flex",
        padding: "0.5vh 0.1vw",
        "& h6": {
            cursor: "pointer",
        },
    },
};

const StoryItem = ({ classes, title, imageUrl, like }) => {
    useEffect(() => {
        const loadData = async (url) => {
            const data = await import(`../../assets/images/${url}`);
            console.log(data);

            document.getElementById(
                `storyImage-${imageUrl}`
            ).style.backgroundImage = `url("${data.default}")`;
            console.log(
                document.getElementById(`storyImage-${imageUrl}`).style
                    .backgroundImage
            );
        };
        loadData(imageUrl);
    }, [imageUrl]);

    return (
        <Grid container className={classes.storyItemContainer}>
            <Grid item xs={1} />
            <Grid item xs={11} className={classes.storyItemHeader}>
                header
            </Grid>
            <Grid
                item
                xs={1}
                className={classes.storyItemVote}
                alignItems="center"
            >
                <img src={UpArrow} alt="UpArrow" />
                <Typography color="primary" variant="h6">
                    {like}
                </Typography>
                <img src={DownArrow} alt="DownArrow" />
            </Grid>
            <Grid
                item
                xs={10}
                className={classes.storyItemImage}
                id={`storyImage-${imageUrl}`}
            >
                <Typography variant="h3">{title}</Typography>
            </Grid>
            <Grid item xs={11} className={classes.storyItemIcons}>
                <Grid
                    item
                    xs={3}
                    className={classes.storyItemIconsComment}
                    alignItems="center"
                >
                    <img src={CommentButton} alt="CommenButton" />
                    <Typography variant="subtitle1" color="primary">
                        Comment
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={2}
                    className={classes.storyItemIconsLike}
                    alignItems="center"
                >
                    <img src={UpArrow} alt="UpArrow" />
                    <Typography variant="subtitle1" color="primary">
                        Like
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={2}
                    className={classes.storyItemIconsDislike}
                    alignItems="center"
                >
                    <img src={DownArrow} alt="DownArrow" />
                    <Typography variant="subtitle1" color="primary">
                        Dislike
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={5}
                    className={classes.storyItemIconsClickMore}
                    alignItems="center"
                    justify="flex-end"
                >
                    <Typography variant="subtitle1" color="primary">
                        Click to read more...
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(useStyles)(StoryItem);
