import React from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { LoginForm, SigninForm } from "../../components";

const useStyles = () => ({
    loginpageContainer: {
        marginTop: "15vh",
    },
});

const LoginPage = ({ classes }) => {
    return (
        <Grid
            container
            className={classes.loginpageContainer}
            justify="space-evenly"
        >
            <LoginForm />
            <SigninForm />
        </Grid>
    );
};

export default withStyles(useStyles)(LoginPage);
