import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {Container, List, Typography, ListItem, ListItemText, Grid, colors} from "@material-ui/core";
import {Link} from "react-router-dom";

import sources from "../sources.json";

const useStyles = makeStyles(theme => ({
  loader: {
    width: "100%",
    textAlign: "center",
    textTransform: "Capitalize",
  },
  container: {
    marginTop: 30,
  },
  listitem: {
    alignItems: "flex-start",
    borderColor: "primary",
    textDecoration: "none",
    borderLeft: "solid 5px transparent",
    transition: "ease all 400ms",
    "&:hover": {
      marginLeft: -10,
      borderLeft: "solid 5px " + theme.palette.primary.main,
    },
  },
  title: {
    textDecoration: "none",
    color: colors.grey[900],
  },
  text: {
    textDecoration: "none",
    color: colors.grey[600],
  },
}));

const ServicesIndex = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" component="h1">
            Bienvenido a TheNewsReader
          </Typography>
          <br />
          <br />
          <Typography variant="subtitle1" component="p">
            Este es un pequeño proyecto para poder leer diferentes sitios de noticias en una sola página
          </Typography>
          <br />
          <Typography variant="subtitle1" component="p">
            Este es un proyecto de código abierto sin publicidad, ni beneficios.
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="subtitle1" component="p">
            Si estás interesado en el código, este es el repositorio, esta es la url:
          </Typography>
          <Typography variant="subtitle1" component="p">
            <a href="/">https://github.com</a>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <List dense={true}>
            {Object.keys(sources).map((slug, i) => (
              <ListItem key={i} component={Link} to={"/" + slug} className={classes.listitem}>
                <ListItemText
                  primary={
                    <Typography component="span" className={classes.title}>
                      {sources[slug].name}
                    </Typography>
                  }
                  secondary={sources[slug].url}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServicesIndex;
