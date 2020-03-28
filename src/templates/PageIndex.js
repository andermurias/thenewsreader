import React, {useEffect, useState} from "react";
import {useParams, withRouter} from "react-router-dom";

import axios from "axios";

import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

import makeStyles from "@material-ui/core/styles/makeStyles";

import PostList from "../component/PostList";

const useStyles = makeStyles(theme => ({
  loader: {
    width: "100%",
    textAlign: "center",
    textTransform: "Capitalize",
  },
  container: {
    marginTop: 30,
  },
}));

const getFeed = async source => {
  const response = await axios.get(process.env.REACT_APP_BACKEND_URL + "/api/feed-reader?source=" + source, {});
  return response.data;
};

const PageIndex = ({match}) => {
  const classes = useStyles();

  const query = useParams();

  let [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      setData(await getFeed(match.params.source));
    })();
    return () => {
      setData([]);
    };
  }, [match.params.source]);

  // let isFirst = true;
  return (
    <Container maxWidth="lg" className={classes.container}>
      <List className={classes.list}>
        {data &&
          data.map((post, i) => (
            <PostList
              title={post.title}
              content={post.content}
              isoDate={post.isoDate}
              link={post.link}
              source={query.source}
              key={i}
            />
          ))}
      </List>
      {/* <Grid container spacing={3} alignItems="stretch">
        {data !== null ? (
          data.map((post, i) => {
            const gridItem = (
              <Grid item sm={12} md={isFirst ? 12 : 6} lg={isFirst ? 12 : 4} key={i}>
                <PostCard
                  title={post.title}
                  content={post.content}
                  isoDate={post.isoDate}
                  link={post.link}
                  source={query.source}
                />
              </Grid>
            );
            isFirst = false;
            return gridItem;
          })
        ) : (
          <h4 className={classes.loader}>Cargando...</h4>
        )}
      </Grid> */}
    </Container>
  );
};

export default withRouter(PageIndex);
