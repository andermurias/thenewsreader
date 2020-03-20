import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import localization from "moment/locale/es";

import {Typography, Card, CardActions, CardContent, Button} from "@material-ui/core";

moment.locale("es", localization);

const useStyles = makeStyles({
  title: {
    marginBottom: 10,
    display: "block",
    textDecoration: "none",
  },
  date: {
    marginBottom: 10,
  },
  text: {
    textDecoration: "none",
  },
  card: {
    height: "100%",
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderTop: "solid 5px #ffa726",
    borderColor: "primary",
    "&:hover": {
      background: "#fafafa",
    },
  },
});

const PostCard = ({title, isoDate, content, link, source}) => {
  const classes = useStyles();
  const url = "/" + source + "/page/" + encodeURIComponent(link);
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography className={classes.title} variant="h5" component={Link} to={url} color="textPrimary">
          {title}
        </Typography>
        <Typography className={classes.date} variant="body2" component="p" color="textSecondary">
          {moment(isoDate).format("LLL")}
        </Typography>
        <Typography variant="body2" className={classes.text} component={Link} to={url} color="textSecondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="secondary" component={Link} to={url}>
          Leer más
        </Button>
        <Button target="_blank" href={link} variant="outlined">
          Ver online
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
