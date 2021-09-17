import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

import { Grid, Button } from "@material-ui/core";

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
import ReferralDialogBox from "./referralDialogBox";
import { withWindowConsumer } from "../../contexts/window/consumer";

import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import runtimeEnv from "@mars/heroku-js-runtime-env";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = () => ({
  accountpageContainer: {
    overflowY: "auto",
  },
  arrowActive: {
    fill: "#1687a7",
  },
  arrowDeactive: {
    fill: "white",
  },
  bottomButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

const Account = ({ classes, loggedUser, onLogoutUser, limit, width }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const env = runtimeEnv();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const logoutRequest = async () => {
    await axios
      .post(
        `${env.REACT_APP_DB_HOST}/api/auth/logout`,
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

  const acceptReferral = async (id) => {
    const url = `${env.REACT_APP_DB_HOST}/api/profiles/referrals/accept`;
    await axios
      .post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${loggedUser.token}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have become a writer now",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        Swal.fire(err.response.data.detail);
        handleClose();
      });
  };

  const searchUsers = async () => {
    const url = `${env.REACT_APP_DB_HOST}/api/profiles/search`;
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchUsers();
  }, []);

  return (
    <Grid
      container
      justify="space-evenly"
      alignItems="center"
      className={classes.accountpageContainer}
    >
      {1000 < width ? (
        <>
          <AccountInfo loggedUser={loggedUser} logoutRequest={logoutRequest} />
          {loggedUser.userInfo ? (
            <AccountDetails detailedInfo={loggedUser.userInfo} />
          ) : null}
        </>
      ) : (
        <Carousel
          plugins={[
            "fastSwipe",
            "centered",

            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 1.05,
              },
            },
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: <ArrowBackIosIcon className={classes.arrowActive} />,
                arrowLeftDisabled: (
                  <ArrowBackIosIcon className={classes.arrowDeactive} />
                ),
                arrowRight: (
                  <ArrowForwardIosIcon className={classes.arrowActive} />
                ),
                arrowRightDisabled: (
                  <ArrowForwardIosIcon className={classes.arrowDeactive} />
                ),
                addArrowClickHandler: true,
              },
            },
          ]}
        >
          <AccountInfo loggedUser={loggedUser} />
          {loggedUser.userInfo ? (
            <AccountDetails detailedInfo={loggedUser.userInfo} />
          ) : null}
        </Carousel>
      )}
      {loggedUser ? (
        <Grid item xs={8} className={classes.bottomButton}>
          {loggedUser.has_pending_referral ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => acceptReferral()}
              style={{ marginBottom: "10px" }}
            >
              Accept Referral
            </Button>
          ) : null}
          {loggedUser.userInfo && loggedUser.userInfo.type === "WRITER" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpen()}
              style={{ marginBottom: "10px" }}
            >
              Send Referral to a User
            </Button>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            onClick={() => logoutRequest()}
          >
            LOGOUT
          </Button>
        </Grid>
      ) : null}

      {users ? (
        <ReferralDialogBox
          open={open}
          onClose={handleClose}
          handleClose={handleClose}
          data={users}
          token={loggedUser.token}
        />
      ) : null}
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToAccount, mapDispatchToAccount),
  withStyles(useStyles)
)(Account);
