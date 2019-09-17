import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Router from "next/router";

import PostFeed from "../components/index/PostFeed";
import UserFeed from "../components/index/UserFeed";
import withStyles from "@material-ui/core/styles/withStyles";
import { authInitialProps } from "../lib/auth";

const Index = ({ classes, auth }) => (
  <main className={classes.root}>
    {auth.user && auth.user._id ? (
      // Auth User Page
      <Grid container>
        <Grid item xs={12} sm={12} md={7}>
          <PostFeed auth={auth} />
        </Grid>
        <Grid item className={classes.drawerContainer}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="right"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <UserFeed auth={auth} />
          </Drawer>
        </Grid>
      </Grid>
    ) : (
      // Splash Page (UnAuth Page)
      <Grid justify="space-between" alignItems="center" direction="row" container className={classes.heroContent}>
        <Grid item xs={12} sm={12} md={4}>
          <Typography component="h1" variant="h2" gutterBottom>
            A Better Social Network
          </Typography>
          <Typography variant="h6" component="p">
            Connect with friends, family, and acquaintances across the globe.
          </Typography>
          <Button className={classes.fabButton} variant="outlined" onClick={() => Router.push("/signup")}>
            Get Started
          </Button>
        </Grid>
        <Grid className={classes.mainImageContainer} item xs={12} sm={12} md={7}>
          <div className={classes.mainImage} style={{ backgroundImage: `url('/static/images/next-connect.jpg')` }} />
        </Grid>
      </Grid>
    )}
  </main>
);

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 10
  },
  progressContainer: {
    height: "80vh"
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.secondary.light
  },
  drawerContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  drawer: {
    width: 350
  },
  drawerPaper: {
    marginTop: 70,
    width: 350
  },
  fabButton: {
    margin: "3rem 0"
  },
  heroContent: {
    paddingTop: theme.spacing.unit * 8,
    margin: "0 auto"
  },
  mainImageContainer: {
    position: "relative",
    height: "calc(100vh - 64px)"
  },
  mainImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundSize: "cover"
  }
});

Index.getInitialProps = authInitialProps();

export default withStyles(styles)(Index);
