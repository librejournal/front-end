import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

import { Grid, Typography, Button } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import axios from "axios";

import { connect } from "react-redux";
import {
    mapStateToAccount,
    mapDispatchToAccount,
} from "../../redux/mapFunctions";

import AccountInfo from "./accountInfo";
import AccountDetails from "./accountDetails";

const useStyles = () => ({
    accountpageContainer: {
        overflowY: "auto",
    },
});

const Account = ({ classes, loggedUser, onLogoutUser }) => {
    const [detailedInfo, setDetailedInfo] = useState(null);

    useEffect(() => {
        getProfileDetails();
    }, []);
    const logoutRequest = async () => {
        await axios
            .post(
                "http://localhost:9001/api/auth/logout",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${loggedUser.token}`,
                    },
                }
            )
            .then(() => {
                onLogoutUser();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have logged out successfully",
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProfileDetails = async () => {
        axios
            .get("http://localhost:9001/api/profile/self-detail", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${loggedUser.token}`,
                },
            })
            .then((response) => setDetailedInfo(response.data))
            .catch((err) => console.log(err));
    };
    console.log(detailedInfo);

    return (
        <Grid
            container
            justify="space-evenly"
            alignItems="center"
            className={classes.accountpageContainer}
        >
            <AccountInfo
                loggedUser={loggedUser}
                logoutRequest={logoutRequest}
            />
            {detailedInfo ? (
                <AccountDetails detailedInfo={detailedInfo} />
            ) : null}
        </Grid>
    );
};

export default compose(
    connect(mapStateToAccount, mapDispatchToAccount),
    withStyles(useStyles)
)(Account);
