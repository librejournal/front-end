import React, { useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";

const useStyles = () => ({
    starboardGrid: {
        width: "max(10vw,250px)",
        height: "350px",
        backgroundColor: "#1687a7",
        padding: "1vh 0",
        borderRadius: "15px",
        margin: "2vh 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        borderRadius: "15px",
    },
    starboardTitle: {
        color: "white",
        textAlign: "center",
        borderBottom: "3px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    starboardItemEntry: {
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
        margin: "1vh 2vw",
        alignItems: "center",
        borderRadius: "10px",
        transition: "all 0.8s ease-out",
        "&:hover": {
            backgroundColor: "cornsilk",
            padding: "0 1vw",
        },
    },
});

const StarboardItem = ({ classes, title, data, limit, width }) => {
    const [titleSize, setTitleSize] = useState(limit > width ? "h5" : "h4");
    const [textSize, setTextSize] = useState(
        limit > width ? "subtitle2" : "subtitle1"
    );
    return (
        <Grid contaniner className={classes.starboardGrid}>
            <Grid item xs={12} className={classes.starboardTitle}>
                <Typography variant={titleSize}>{title}</Typography>
            </Grid>
            {data.map((el) => (
                <Grid item xs={12} className={classes.starboardItemEntry}>
                    <Typography color="primary" variant={textSize}>
                        Logo
                    </Typography>
                    <Typography
                        color="primary"
                        variant={textSize}
                        className={classes.starboardName}
                    >
                        {el.name}
                    </Typography>
                    <Typography
                        color="primary"
                        variant={textSize}
                        className={classes.starboardPoint}
                    >
                        {el.point}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default compose(
    withWindowConsumer,
    withStyles(useStyles)
)(StarboardItem);
