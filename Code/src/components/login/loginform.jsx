import React from "react";

import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
    loginContainer: {
        width: "max(25vw,250px)",
        padding: "2vh 2vw",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
        border: "2px solid #1687a7",
    },
});

const LoginForm = ({ classes }) => {
    return (
        <Grid container justify="center" className={classes.loginContainer}>
            <Typography color="primary" variant="h4">
                Login Form
            </Typography>
            <>
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="Email"
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                />
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="Password"
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                />
            </>
            <Button variant="contained" color="primary">
                LOG IN
            </Button>
        </Grid>
    );
};

export default withStyles(useStyles)(LoginForm);
