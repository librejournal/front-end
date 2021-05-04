import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Account } from "../../components";

const useStyles = () => ({
    accountpageContainer: {
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

const AccountPage = ({ classes }) => (
    <Grid container className={classes.accountpageContainer}>
        <Account />
    </Grid>
);

export default withStyles(useStyles)(AccountPage);
