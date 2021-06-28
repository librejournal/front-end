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
  CircularProgress,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { mockupDataStarboard } from "../../constants/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { compose } from "recompose";
import { withWindowConsumer } from "../../contexts/window/consumer";
import { ParallaxBanner } from "react-scroll-parallax";
import Background from "../../assets/images/ekrulila-3957616.jpg";
import BackgroundLogin from "../../assets/images/pexels-jessica-lewis-606539.jpg";
import { Link } from "react-router-dom";
import Typed from "react-typed";
import axios from "axios";
import { connect } from "react-redux";
import { mapStateToPropsHome } from "../../redux/mapFunctions";

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
    backgroundColor: "#3E3C37",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    "& h5": { color: "white" },
    "& svg": { color: "white" },
  },
  loginGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
};

const Homepage = ({ classes, limit, width, loggedUser }) => {
  const [container, setContainer] = useState("Stories");
  const [stories, setStories] = useState(null);
  const [page, setPage] = useState(1);
  const [orderState, setOrderState] = useState("likes");
  const [textWord, setTextWord] = useState(null);
  const [textLocation, setTextLocation] = useState(null);
  const [textTag, setTextTag] = useState(null);
  const [mode, setMode] = useState("");
  const [storylength, setStorylength] = useState(0);
  const [trendingStories, setTrendingStories] = useState(null);
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const changeContainer = (value) => setContainer(value);
  const changePage = (val) => {
    setPage(val);
    setTimeout(() => {
      document.getElementById("title").scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const getStoryLength = async () => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/?`;
    await axios
      .get(url)
      .then((response) => setStorylength(response.data.length));
  };

  const getStories = async (type, component, tag, location, order) => {
    const url =
      `${process.env.REACT_APP_DB_HOST}/api/stories/?` +
      (component !== null ? `components=${component}&` : "") +
      (tag !== null ? `tags=${tag}&` : "") +
      (location !== null ? `locations=${location}&` : "") +
      (type !== null ? `ordering=${order}${type}&` : "");

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

  const getTrendingStories = async () => {
    const url = `${process.env.REACT_APP_DB_HOST}/api/stories/?ordering=likes`;
    await axios.get(url).then((response) => setTrendingStories(response.data));
  };

  useEffect(() => {
    getTrendingStories();
    getStoryLength();
    getStories(orderState, textWord, textTag, textLocation, mode);
  }, [page]);

  return (
    <Grid container>
      {trendingStories && stories ? (
        <>
          <Grid item xs={12}>
            <ParallaxBanner
              className="your-class"
              layers={[
                {
                  image: Background,
                  amount: 0.1,
                },
                {
                  image: Background,
                  amount: 0.2,
                },
              ]}
              style={{
                height: "30rem",
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

          <Grid
            container
            justify="center"
            className={classes.homepageContainer}
          >
            {trendingStories ? (
              <TrendingContainer
                data={trendingStories.slice(0, 4)}
                title="Trending Stories"
              />
            ) : null}

            {loggedUser.token ? null : (
              <>
                <Grid
                  item
                  xs={12}
                  style={{
                    height: "40vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography color="primary" variant="h4">
                    Librejournal is a social media platform that you can read &
                    share stories about your local environment.
                  </Typography>
                  <Typography variant="h6">
                    You can follow the hottest news about by registering the
                    Librejournal.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <ParallaxBanner
                    className={classes.loginGrid}
                    layers={[
                      {
                        image: BackgroundLogin,
                        amount: 0.1,
                      },
                      {
                        image: BackgroundLogin,
                        amount: 0.5,
                      },
                    ]}
                    style={{
                      height: "15rem",
                    }}
                  >
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", padding: "2rem" }}
                    >
                      <Button color="secondary" variant="contained">
                        Click here to login / register
                      </Button>
                    </Link>
                  </ParallaxBanner>
                </Grid>
              </>
            )}

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
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    style={{ width: "100%" }}
                  >
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
                    <AccordionDetails
                      style={{
                        padding: "2vh 15vw",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        style={{
                          minHeight: "10rem",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          backgroundColor: "white",
                          border: "2px solid lightgray",
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
                          mode={mode}
                          setMode={setMode}
                        />
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                <Grid
                  container
                  justify="space-around"
                  style={{ maxWidth: "1600px" }}
                >
                  {stories ? <StoryContainer data={stories} /> : null}

                  <StarboardContainer
                    title1="Top Authors"
                    title2="New Authors"
                    data1={mockupDataStarboard.author}
                    data2={mockupDataStarboard.author}
                  />
                </Grid>
              </Grid>
            ) : container === "Stories" && stories ? (
              <StoryContainer data={stories} />
            ) : (
              <StarboardContainer
                title1="Top Authors"
                title2="New Authors"
                data1={mockupDataStarboard.author}
                data2={mockupDataStarboard.author}
              />
            )}
          </Grid>

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
                  disabled={page > storylength / 3}
                  onClick={() => changePage(page + 1)}
                >
                  Next Page
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={12}
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
};

export default compose(
  withWindowConsumer,
  connect(mapStateToPropsHome),
  withStyles(useStyles)
)(Homepage);
