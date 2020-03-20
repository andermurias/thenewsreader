import React from "react";
import clsx from "clsx";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import {
  Toolbar,
  Button,
  AppBar,
  IconButton,
  makeStyles,
  Drawer,
  useTheme,
  Divider,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
} from "@material-ui/core";
import {Link, withRouter, matchPath} from "react-router-dom";

import sources from "../sources.json";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();

  const match = matchPath(window.location.pathname, {
    path: "/:source",
  });

  const params = match ? match.params : null;

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Button component={Link} to="/" variant="outlined">
            The News Reader
          </Button>
          {params && params.source !== "undefined" && sources.hasOwnProperty(params.source) ? (
            <Button component={Link} to={"/" + params.source}>
              {sources[params.source].name}
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          Origenes de contenido
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.keys(sources).map((slug, i) => {
            return (
              <ListItem button key={i} to={"/" + slug} component={Link} onClick={handleDrawerClose}>
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary={sources[slug].name} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default withRouter(Navbar);
