import React from "react";

import { Grid, Typography } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";

const useStyles = () => ({
    accountContainer: {
        padding: "2vh 2vw",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
        border: "2px solid #1687a7",
        alignItems: "center",
        maxWidth: "450px",
        margin: "2vh",
        background: "white",
        "-webkit-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        "-moz-box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
        "box-shadow": "5px 5px 4px #666666, -5px -5px 4px #ffffff",
    },
});

const AccountDetails = ({ classes, detailedInfo }) => (
    <Grid item md={6} xs={12} className={classes.accountContainer}>
        <Typography color="primary" variant="h4">
            Account Info
        </Typography>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                Role:
            </Typography>
            <Typography variant="subtitle1">{detailedInfo.type}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                Followed Authors:
            </Typography>
            <Typography variant="subtitle1">
                {detailedInfo.followed_authors.length
                    ? detailedInfo.followed_authors.map((el) => el.name)
                    : "None"}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                Followed Tags:
            </Typography>
            <Typography variant="subtitle1">
                {detailedInfo.followed_tags.length
                    ? detailedInfo.followed_tags.map((el) => el.name)
                    : "None"}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                Followed Locations:
            </Typography>
            <Typography variant="subtitle1">
                {detailedInfo.followed_locations.length
                    ? detailedInfo.followed_locations.map((el) => el.name)
                    : "None"}
            </Typography>
        </Grid>
    </Grid>
);

export default compose(withStyles(useStyles))(AccountDetails);
