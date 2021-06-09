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
    PreviewStoryPage,
    UserPage,
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

const App = ({ loggedUser, onStateUser, onInfoUser }) => {
    const checkLogin = async () => {
        await axios
            .get("http://localhost:9001/api/auth/user", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${loggedUser.token}`,
                },
            })
            .then((response) => {
                const info = response.data;
                onStateUser(info);
                getUserInfo();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUserInfo = async () => {
        const url = `${process.env.REACT_APP_DB_HOST}/api/profile/self-detail`;
        await axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${loggedUser.token}`,
                },
            })
            .then((response) => {
                const info = response.data;
                onInfoUser(info);
            })
            .catch((err) => console.log(err));
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
                    <Route
                        path="/createstory"
                        exact
                        render={(props) => (
                            <CreateStoryPage
                                token={loggedUser.token}
                                {...props}
                            />
                        )}
                    />
                    <Route path="/stories" exact>
                        <StoriesPage />
                    </Route>
                    <Route
                        path="/user"
                        render={(props) => <UserPage {...props} />}
                    />

                    <Route
                        path="/stories/:id"
                        render={(props) => <PreviewStoryPage {...props} />}
                    />
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
