import React from "react";

import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = () => ({
    signinContainer: {
        width: "max(25vw,250px)",
        padding: "2vh 2vw",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
        border: "2px solid #1687a7",
    },
});

const SigninForm = ({ classes }) => {
    return (
        <Grid container justify="center" className={classes.signinContainer}>
            <Typography color="primary" variant="h4">
                Signin Form
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
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="First Name"
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                />
                <TextField
                    id="standard-basic"
                    color="primary"
                    label="Location"
                    InputLabelProps={{
                        style: { color: "#1687a7" },
                    }}
                />
            </>
            <Button variant="contained" color="primary">
                SIGN IN
            </Button>
        </Grid>
    );
};

export default withStyles(useStyles)(SigninForm);
