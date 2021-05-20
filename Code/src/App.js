import { Header, Footer } from "./components/";
import { ThemeProvider } from "@material-ui/styles";
import Theme from "./theme/theme.jsx";
import {
  Homepage,
  LoginPage,
  ErrorPage,
  AccountPage,
  CreateStoryPage,
  StoriesPage,
} from "./pages";
import { compose } from "recompose";
import { useEffect } from "react";
import { withWindowProvider } from "./contexts/window/provider";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { mapStateToApp, mapDispatchToApp } from "./redux/mapFunctions";
import { connect } from "react-redux";

const App = ({ loggedUser, onStateUser }) => {
  const checkLogin = async () => {
    await axios
      .get("http://localhost:9001/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${loggedUser.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        const info = response.data;
        onStateUser(info);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkLogin();
  }, [loggedUser.token]);

  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/login" exact>
            {loggedUser.token === "" ? (
              <LoginPage />
            ) : (
              <Redirect to="/account" />
            )}
          </Route>
          <Route path="/account" exact>
            {loggedUser.token !== "" ? (
              <AccountPage />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/createstory" exact>
            <CreateStoryPage token={loggedUser.token} />
          </Route>
          <Route path="/stories" exact>
            <StoriesPage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default compose(
  connect(mapStateToApp, mapDispatchToApp),
  withWindowProvider
)(App);
