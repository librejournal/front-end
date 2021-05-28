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
    },
});

const AccountInfo = ({ classes, loggedUser }) => (
    <Grid item md={6} xs={12} className={classes.accountContainer}>
        <Typography color="primary" variant="h4">
            Account Details
        </Typography>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                Username:
            </Typography>
            <Typography variant="subtitle1">{loggedUser.username}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                Email:
            </Typography>
            <Typography variant="subtitle1">{loggedUser.email}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                First Name:
            </Typography>
            <Typography variant="subtitle1">{loggedUser.first_name}</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography color="primary" variant="h6">
                Last Name:
            </Typography>
            <Typography variant="subtitle1">{loggedUser.last_name}</Typography>
        </Grid>
    </Grid>
);

export default compose(withStyles(useStyles))(AccountInfo);
