import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import localization from "moment/locale/es";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  colors,
  Typography,
} from "@material-ui/core";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";

moment.locale("es", localization);

const useStyles = makeStyles(theme => ({
  title: {
    textDecoration: "none",
    color: colors.grey[900],
  },
  date: {
    color: theme.palette.secondary.main,
  },
  text: {
    textDecoration: "none",
    color: colors.grey[500],
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
}));

const PostList = ({title, isoDate, content, link, source}) => {
  const classes = useStyles();
  const url = "/" + source + "/page/" + encodeURIComponent(link);

  return (
    <>
      <ListItem className={classes.listitem} component={Link} to={url}>
        <ListItemText
          primary={<Typography className={classes.title}>{title}</Typography>}
          secondary={
            <React.Fragment>
              <Typography className={classes.date} variant="subtitle2" component="span">
                {moment(isoDate).format("LLL")}
              </Typography>
              <br />
              <Typography className={classes.text} variant="subtitle2" component="span">
                {content}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" component="a" href={link} target="_blank">
            <CallMadeOutlinedIcon color="primary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider component="li" variant="middle" />
    </>
  );
};

export default PostList;
