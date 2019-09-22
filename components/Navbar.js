import withStyles from "@material-ui/core/styles/withStyles";

import ActiveLink from "./ActiveLink";
import { signoutUser } from "../lib/auth";
import color from "@material-ui/core/colors/blueGrey";

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};

  return (
    <header>
      {user._id ? (
        // Auth Navigation
        <div>
          <div className="profile-btn">
            <ActiveLink href={`/profile/${user._id}`}>Profile</ActiveLink>
          </div>
          <div onClick={signoutUser} className="signout-btn">
            Sign out
          </div>
        </div>
      ) : (
        // UnAuth Navigation
        <div className="signin-btn">
          <ActiveLink href="/signin">Sign in</ActiveLink>
        </div>
      )}
    </header>
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
