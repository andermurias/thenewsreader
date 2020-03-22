import React from "react";
import clsx from "clsx";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

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
  Hidden,
} from "@material-ui/core";
import {Link, withRouter, matchPath} from "react-router-dom";

import sources from "../sources.json";

const drawerWidth = 360;

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: "100%",
    maxWidth: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  listItemSelected: {
    color: theme.palette.secondary.main,
    backgroundColor: "transparent!important",
    "& path": {
      fill: theme.palette.secondary.main,
    },
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
          <Hidden mdDown>
            {params && params.source !== "undefined" && sources.hasOwnProperty(params.source) ? (
              <Button component={Link} to={"/" + params.source}>
                {sources[params.source].name}
              </Button>
            ) : (
              ""
            )}
          </Hidden>
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
        <div className={classes.drawerHeader} onClick={handleDrawerClose}>
          TheNewsReader
          <IconButton>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            to="/"
            selected={params === null}
            component={Link}
            onClick={handleDrawerClose}
            classes={{selected: classes.listItemSelected}}
          >
            <ListItemIcon>
              <HomeOutlinedIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <Divider variant="inset" />
          {Object.keys(sources).map((slug, i) => {
            return (
              <ListItem
                button
                key={i}
                to={"/" + slug}
                selected={params && slug === params.source}
                component={Link}
                onClick={handleDrawerClose}
                classes={{selected: classes.listItemSelected}}
              >
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
