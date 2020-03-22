import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

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

const useStyles = makeStyles({
  container: {
    paddingTop: "30px",
  },
});

export default function App(props) {
  const classes = useStyles(props);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/:source/page/:url">
            <Page classes={classes} />
          </Route>
          <Route path="/:source">
            <PageIndex classes={classes} />
          </Route>
          <Route path="/">
            <ServicesIndex />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
