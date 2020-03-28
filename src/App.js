import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

import PageIndex from "./templates/PageIndex";
import Page from "./templates/Page";
import ServicesIndex from "./templates/ServicesIndex";
import Navbar from "./component/Navbar";

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      selected: {
        color: "#ef6c00",
      },
    },
  },
  palette: {
    primary: {
      main: "#ffa726",
    },
    secondary: {
      main: "#ef6c00",
    },
  },
});

const routerConfiguration = [
  {
    route: "/:source/page/:url",
    component: Page,
    props: [],
  },
  {
    route: "/:source",
    component: PageIndex,
    props: [],
  },
  {
    route: "/",
    component: ServicesIndex,
    props: [],
  },
];

export default function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          {routerConfiguration.map((route, i) => {
            return (
              <Route path={route.route} key={i}>
                <route.component />
              </Route>
            );
          })}
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
