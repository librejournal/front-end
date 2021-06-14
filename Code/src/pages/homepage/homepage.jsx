import React, { useState, useEffect } from "react";

import {
  TrendingContainer,
  StoryContainer,
  StarboardContainer,
  SearchBar,
} from "../../components";
import {
  Breadcrumbs,
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { mockupDataStarboard, mockupDataStory } from "../../constants/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";
import { ParallaxBanner } from "react-scroll-parallax";
import Background from "../../assets/images/ekrulila-3957616.jpg";
import Typed from "react-typed";
import axios from "axios";

const useStyles = {
  firstAdv: {
    border: "1px solid black",
    height: "250px",
    margin: "2vh 0",
  },
  homepageContainer: {
    maxWidth: "1920px",
    margin: "auto",
  },
  homePageSelectionText: {
    cursor: "pointer",
    color: "gray",
  },
  homePageSelectionTextActive: {
    cursor: "pointer",
  },
  typedDiv: {
    position: "absolute",
    height: "100%",
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    textAlign: "center",
    "& span": { color: "white", fontSize: "2rem" },
  },
  titleText: {
    textAlign: "center",
    backgroundColor: "#1687a7",
    borderRadius: "10px",
    "& h5": { color: "white" },
    "& svg": { color: "white" },
  },
};

const Homepage = ({ classes, limit, width }) => {
  const [container, setContainer] = useState("Stories");
  const [stories, setStories] = useState(null);
  const [page, setPage] = useState(1);
  const [orderState, setOrderState] = useState(null);
  const [textWord, setTextWord] = useState(null);
  const [textLocation, setTextLocation] = useState(null);
  const [textTag, setTextTag] = useState(null);

  const changeContainer = (value) => setContainer(value);
  const changePage = (val) => {
    setPage(val);
    setTimeout(() => {
      document.getElementById("title").scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const getStories = async (type, component, tag, location) => {
    const url =
      `${process.env.REACT_APP_DB_HOST}/api/stories/` +
      (component !== null ? `?components=${component}` : "") +
      (tag !== null ? `?tags=${tag}` : "") +
      (tag !== location ? `?locations=${location}` : "") +
      (type !== null ? `?ordering=${type}` : "");
    console.log(url);
    await axios
      .get(
        url,
        limit < width
          ? {
              headers: {
                "X-Pagination-Offset": 3 * (page - 1),
                "X-Pagination-Limit": 3,
              },
            }
          : null
      )
      .then((response) => {
        setStories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStories(orderState, textWord, textTag, textLocation);
  }, [page]);

  return (
    <>
      <Grid item xs={12}>
        <ParallaxBanner
          className="your-class"
          layers={[
            {
              image: Background,
              amount: 0.5,
            },
          ]}
          style={{
            height: "30vh",
          }}
        >
          <div className={classes.typedDiv}>
            <Typed
              strings={["Time to share your experience"]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </div>
        </ParallaxBanner>
      </Grid>
      <Grid container justify="center" className={classes.homepageContainer}>
        <TrendingContainer data={mockupDataStory} />

        {limit < width ? null : (
          <Breadcrumbs separator="|" aria-label="breadcrumb">
            <Typography
              color="primary"
              variant="h6"
              onClick={() => changeContainer("Stories")}
              className={
                container === "Stories"
                  ? classes.homePageSelectionTextActive
                  : classes.homePageSelectionText
              }
            >
              Stories
            </Typography>
            <Typography
              color="primary"
              variant="h6"
              onClick={() => changeContainer("Starboard")}
              className={
                container === "Starboard"
                  ? classes.homePageSelectionTextActive
                  : classes.homePageSelectionText
              }
            >
              Starboard
            </Typography>
          </Breadcrumbs>
        )}

        {limit < width ? (
          <Grid container justify="center" style={{ maxWidth: "1600px" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.titleText}
              >
                <Grid item xs={12} id="title">
                  <Typography color="primary" variant="h5">
                    Stories
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  item
                  xs={12}
                  style={{
                    minHeight: "10rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    backgroundColor: "white",
                    borderBottom: "2px solid lightgray",
                    borderTop: "2px solid lightgray",
                  }}
                >
                  <SearchBar
                    getStories={getStories}
                    orderState={orderState}
                    setOrderState={setOrderState}
                    textTag={textTag}
                    textLocation={textLocation}
                    textWord={textWord}
                    setTextLocation={setTextLocation}
                    setTextTag={setTextTag}
                    setTextWord={setTextWord}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>

            {stories ? <StoryContainer data={stories} /> : null}

            <StarboardContainer
              title1="Top Authors"
              title2="Top Locations"
              data1={mockupDataStarboard.author}
              data2={mockupDataStarboard.location}
            />
          </Grid>
        ) : container === "Stories" && stories ? (
          <StoryContainer data={stories} />
        ) : (
          <StarboardContainer
            title1="Top Authors"
            title2="Top Locations"
            data1={mockupDataStarboard.author}
            data2={mockupDataStarboard.location}
          />
        )}
        <Grid container justify="center" alignItems="center">
          {limit < width ? (
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "2vh",
                width: "50%",
                backgroundColor: "white",
                border: "2px solid lightgray",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
              >
                Previous Page
              </Button>
              <Typography
                color="secondary"
                variant="h6"
                style={{
                  backgroundColor: "#1687a7",
                  height: "30px",
                  width: "30px",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                {page}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                disabled={stories ? stories.length < 3 : null}
                onClick={() => changePage(page + 1)}
              >
                Next Page
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default compose(withWindowConsumer, withStyles(useStyles))(Homepage);
