import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  Provider as UrqlProvider,
  createClient,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import { SubscriptionClient } from "subscriptions-transport-ws";

import createStore from "./store";
import Wrapper from "./components/Wrapper";
import MetricList from "./components/MetricList";
import MeasurementsChart from "./components/MeasurementsChart";

const subscriptionClient = new SubscriptionClient(
  "ws://react.eogresources.com/graphql",
  {}
);

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider store={store}>
        <UrqlProvider value={client}>
          <Wrapper>
            <MetricList />
            <MeasurementsChart />
            <ToastContainer />
          </Wrapper>
        </UrqlProvider>
      </ReduxProvider>
    </MuiThemeProvider>
  );
};

export default App;
