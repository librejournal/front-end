import "./App.css";
import Header from "./components/header/header";
import { ThemeProvider } from "@material-ui/styles";
import Theme from "./theme/theme.jsx";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Header />;
    </ThemeProvider>
  );
};

export default App;
