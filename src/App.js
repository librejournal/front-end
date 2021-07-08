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
    PasswordResetPage,
    TagPage,
    LocationPage,
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

const App = ({
    loggedUser,
    notifications,
    onStateUser,
    onInfoUser,
    onStoryNotifications,
    onCommentNotifications,
}) => {
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
        const url = `${process.env.REACT_APP_DB_HOST}/api/profiles/self-detail`;
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

    const getStoryNotifications = async (token) => {
        const url = `${process.env.REACT_APP_DB_HOST}/api/notifications/stories/`;
        await axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            })
            .then((resp) => {
                if (!notifications) onStoryNotifications([...resp.data]);

                resp.data.length
                    ? onStoryNotifications([...resp.data])
                    : onStoryNotifications([]);
            })
            .catch((err) => console.log(err));
    };

    const getCommentNotifications = async (token) => {
        const url = `${process.env.REACT_APP_DB_HOST}/api/notifications/comments/`;
        await axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            })
            .then((resp) => {
                if (!notifications) onCommentNotifications([...resp.data]);

                resp.data.length
                    ? onCommentNotifications([...resp.data])
                    : onCommentNotifications([]);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        checkLogin();
        if (loggedUser.token) {
            getCommentNotifications(loggedUser.token);
            getStoryNotifications(loggedUser.token);
        }
        const interval = setInterval(() => {
            if (loggedUser.token) {
                getCommentNotifications(loggedUser.token);
                getStoryNotifications(loggedUser.token);
            }
        }, 10000);
        return () => clearInterval(interval);
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
                    {loggedUser.userInfo ? (
                        <Route
                            path="/createstory"
                            exact
                            render={(props) =>
                                loggedUser.userInfo.type === "WRITER" ? (
                                    <CreateStoryPage
                                        token={loggedUser.token}
                                        {...props}
                                    />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                    ) : null}

                    {loggedUser.userInfo ? (
                        <Route
                            path="/dashboard"
                            exact
                            render={(props) =>
                                loggedUser.userInfo.type === "WRITER" ? (
                                    <StoriesPage {...props} />
                                ) : (
                                    <Redirect to="/" />
                                )
                            }
                        />
                    ) : null}

                    <Route path="/password-reset" exact>
                        <PasswordResetPage />
                    </Route>
                    <Route
                        path="/user"
                        render={(props) => <UserPage {...props} />}
                    />
                    <Route
                        path="/tag"
                        render={(props) => <TagPage {...props} />}
                    />
                    <Route
                        path="/location"
                        render={(props) => <LocationPage {...props} />}
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
