import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
    itemGrid: {
        background: (props) =>
            props.backgroundImage ? `url(${props.backgroundImage})` : null,
        height: "20vh",
        display: "flex",
        justifyContent: "flex-end",
        width: "max(15vw, 160px)",
        padding: "2vh",
        margin: "1vh 0",
        border: "0.5px solid gray"
    },
    itemTitleGrid: {
        backgroundColor: (props) => (props.backgroundImage ? null : "#1687a7"),
        display: "flex",
        alignItems: "end",
        padding: "1vh 2vw",
        "-webkit-box-shadow": "inset 0px -5vh 28px 1px rgba(0,0,0,0.8)",
        "-moz-box-shadow": "inset 0px -5vh 28px 1px rgba(0,0,0,0.8)",
        "box-shadow": "inset 0px -5vh 28px 1px rgba(0,0,0,0.8)",
    },
    itemTitleText: {
        borderTop: "2px solid white",
        width:"60%",
        padding:"0 0.5vw",
    }
});

const TrendingItem = ({ backgroundImage, title, classes }) => {
    return (
        <Grid container className={classes.itemGrid}>
            <Grid item xs={12} className={classes.itemTitleGrid}>
                <Typography className={classes.itemTitleText}>
                    {title}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default withStyles(useStyles)(TrendingItem);
