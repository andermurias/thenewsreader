import React, {useEffect, useState} from "react";
import {useParams, withRouter} from "react-router-dom";
import axios from "axios";

import sanitizeHtml from "sanitize-html-react";

import {makeStyles} from "@material-ui/core/styles";
import {Typography, Button, Container} from "@material-ui/core";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";

import sources from "../sources.json";

const sanitizeParams = {
  allowedTags: [
    "h3",
    "h2",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "p",
    "ul",
    "ol",
    "nl",
    "li",
    "b",
    "i",
    "strong",
    "em",
    "strike",
    "code",
    "hr",
    "br",
    "div",
    "table",
    "thead",
    "caption",
    "tbody",
    "tr",
    "th",
    "td",
    "pre",
    "iframe",
    "img",
    "noscript",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src", "alt"],
    iframe: ["src", "frameborder", "style", "width", "height"],
  },
  // Lots of these won't come up by default because we don't allow them
  selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"],
  // URL schemes we permit
  allowedSchemes: ["http", "https", "ftp", "mailto"],
  allowedSchemesByTag: {},
};

const sanitize = html => {
  html = html.replace(/(<\/?)h1([^>]*>)/g, "$1p$2");
  return sanitizeHtml(html, sanitizeParams);
};

const getPageData = async (url, source) => {
  const response = await axios.get(
    process.env.REACT_APP_BACKEND_URL + "/api/scrap-url?source=" + source + "&url=" + url,
    {}
  );
  return response.data;
};
const useStyles = makeStyles({
  img: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
    margin: "0 auto",
  },
  new: {
    textAlign: "left",
    // lineHeight: "1.5em",
  },
  seeonline: {
    marginTop: 20,
    width: "100%",
    marginBottom: 20,
    textTransform: "inherit",
    maxWidth: 600,
  },
  loader: {
    width: "100%",
    textAlign: "center",
    textTransform: "Capitalize",
  },
  content: {
    lineHeight: "2em",
  },
  container: {
    marginTop: 50,
  },
  title: {
    marginBottom: 40,
    textAlign: "center",
  },
  html: {
    "& img": {
      display: "block",
      margin: "20px auto",
      width: "100%",
    },
    "& p": {
      lineHeight: "2em",
      marginBottom: "3em",
    },
    "& li": {
      lineHeight: "2em",
    },
    "& h1": {
      display: "none",
    },
    "& > div > div": {
      marginBottom: 20,
    },
  },
});

const Page = ({match}) => {
  const classes = useStyles();
  const query = useParams();
  const url = decodeURIComponent(query.url);

  let [data, setData] = useState(null);

  const source = sources[match.params.source];

  useEffect(() => {
    (async () => {
      setData(await getPageData(url, match.params.source));
    })();
  }, [match.params.source, url]);

  return (
    <Container maxWidth="md" className={classes.container}>
      {data ? (
        <div className={classes.new}>
          <Typography variant="h4" className={classes.title}>
            {data.title}
          </Typography>
          {data.content.indexOf("<img") === -1 ? <img src={data.img} alt={data.h1} className={classes.img} /> : ""}
          <Button
            endIcon={<CallMadeOutlinedIcon />}
            startIcon={<PublicOutlinedIcon />}
            target="_blank"
            href={url}
            variant="outlined"
            color="secondary"
            size="large"
            className={classes.seeonline}
          >
            Ver en {source.url}
          </Button>
          {/* <Typography className={classes.cardDate} variant="body2" component="p" color="textSecondary">
            {moment(data.isoDate).format("LLLL")}
          </Typography> */}
          <div className={classes.html} dangerouslySetInnerHTML={{__html: sanitize(data.content)}} />
        </div>
      ) : (
        <h4 className={classes.loader}>Cargando...</h4>
      )}
    </Container>
  );
};

export default withRouter(Page);
