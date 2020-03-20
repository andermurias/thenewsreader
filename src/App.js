import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

import PageIndex from "./templates/PageIndex";
import Page from "./templates/Page";
import Navbar from "./component/Navbar";

const theme = createMuiTheme({
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
            <h1>HOLA</h1>
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
