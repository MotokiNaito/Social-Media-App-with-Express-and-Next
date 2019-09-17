import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareOutlined from "@material-ui/icons/ShareOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

import ActiveLink from "./ActiveLink";
import { signoutUser } from "../lib/auth";
import color from "@material-ui/core/colors/blueGrey";

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};

  return (
    <AppBar className={classes.appBar} position={router.pathname === "/" ? "fixed" : "static"}>
      <Toolbar>
        <ActiveLink href="/">
          <ShareOutlined className={classes.icon} />
        </ActiveLink>
        <Typography variant="h5" component="h1" className={classes.toolbarTitle}>
          <ActiveLink href="/">NextConnect</ActiveLink>
        </Typography>

        {user._id ? (
          // Auth Navigation
          <div>
            <Button>
              <ActiveLink href={`/profile/${user._id}`}>Profile</ActiveLink>
            </Button>
            <Button onClick={signoutUser} className={classes.singOutBtn}>
              Sign out
            </Button>
          </div>
        ) : (
          // UnAuth Navigation
          <div>
            <Button>
              <ActiveLink href="/signin">Sign in</ActiveLink>
            </Button>
            <Button>
              <ActiveLink href="/signup">Sign up</ActiveLink>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  singOutBtn: {
    color: "#fff"
  },
  toolbarTitle: {
    flex: 1
  },
  icon: {
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(Navbar);
