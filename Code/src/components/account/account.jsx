import React from "react";

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
import { withWindowConsumer } from "../../contexts/window/consumer";

import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

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
    justifyContent: "center",
    alignItems: "center",
  },
});

const Account = ({ classes, loggedUser, onLogoutUser, limit, width }) => {
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
      <Grid item xs={12} className={classes.bottomButton}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => logoutRequest()}
        >
          LOGOUT
        </Button>
      </Grid>
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToAccount, mapDispatchToAccount),
  withStyles(useStyles)
)(Account);
