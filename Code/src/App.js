import { Header } from "./components/";
import { ThemeProvider } from "@material-ui/styles";
import Theme from "./theme/theme.jsx";
import { Homepage, LoginPage, ErrorPage } from "./pages";

import { withWindowProvider } from "./contexts/window/provider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <ThemeProvider theme={Theme}>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Homepage />
                    </Route>
                    <Route path="/login" exact>
                        <LoginPage />
                    </Route>
                    <Route>
                        <ErrorPage />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
};

export default withWindowProvider(App);
