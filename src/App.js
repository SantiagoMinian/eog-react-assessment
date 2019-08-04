import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Provider as UrqlProvider, createClient } from "urql";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";

import createStore from "./store";
import Wrapper from "./components/Wrapper";
import MetricList from "./components/MetricList";

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(177,178,192)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider store={store}>
        <UrqlProvider value={client}>
          <Wrapper>
            <MetricList />
            <ToastContainer />
          </Wrapper>
        </UrqlProvider>
      </ReduxProvider>
    </MuiThemeProvider>
  );
};

export default App;
