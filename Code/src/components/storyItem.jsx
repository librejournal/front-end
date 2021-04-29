import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import UpArrow from "../assets/logo/UpArrow.svg";
import DownArrow from "../assets/logo/DownArrow.svg";
import CommentButton from "../assets/logo/CommentButton.svg";

const useStyles = {
    storyItemContainer: {
        width: "max(46vw,500px)",
        border: "black 2px solid",
        padding: "1vh 1vw",
    },
    storyItemHeader: {
        border: "black 2px solid",
        margin: "1vh 0",
    },
    storyItemVote: {
        paddingTop:"3vh",
        border: "black 2px solid",
        margin: "1vh 0",
        display: 'flex',
        flexDirection:'column',
        "& img":{
            width:"max(30%,35px)"
        }

    },
    storyItemImage: {
        border: "black 2px solid",
        margin: "1vh 0",
        height: "40vh",
        backgroundColor: "#1687a7",
        padding: "1vh 2vw",
        "-webkit-box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",
        "-moz-box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",
        "box-shadow": "inset 0px -10vh 28px 1px rgba(0,0,0,0.8)",
    },
    storyItemIcons: {
        margin: "1vh 1vw",
        display: "flex",
    },
    storyItemIconsComment: {
        cursor:'pointer',
        display: "flex",
        "& p": {
            color: "#1687a7",
            
        },
        "& img":{
            height:"50%",
        }
    },
    storyItemIconsLike: {
        cursor:'pointer',
        display: "flex",
        "& p": {
            color: "#1687a7",
            
        },
        "& img":{
            height:"50%",
        }
    },
    storyItemIconsDislike: {
        cursor:'pointer',
        display: "flex",
        "& p": {
            color: "#1687a7",
            
        },
        "& img":{
            height:"50%",
        }
    },
    storyItemIconsClickMore: {
        display: "flex",
        cursor:'pointer',
        padding: "0.5vh 0.1vw",
        "& p": {
            color: "#1687a7",
            
        },
    },
};

const StoryItem = ({ classes }) => {
    return (
        <Grid container className={classes.storyItemContainer}>
            <Grid item xs={12} className={classes.storyItemHeader}>
                header
            </Grid>
            <Grid item xs={1} className={classes.storyItemVote} alignItems="center">
            <img src={UpArrow} alt="UpArrow"/>
            <Typography color="primary" variant="h6">123</Typography>
            <img src={DownArrow} alt="DownArrow"/>
            </Grid>
            <Grid item xs={10} className={classes.storyItemImage}></Grid>
            <Grid item xs={12} className={classes.storyItemIcons}>
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
                    <img src={UpArrow} alt="UpArrow"/>
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
                    <img src={DownArrow} alt="DownArrow"/>
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
