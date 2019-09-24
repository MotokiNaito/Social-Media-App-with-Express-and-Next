import ActiveLink from "./ActiveLink";
import { signoutUser } from "../lib/auth";

const Navbar = ({ router, pageProps: { auth } }) => {
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
        <div>
          {router.route === "/signin" ? (
            <div className="signin-btn">
              <ActiveLink href="/signup">Sign up</ActiveLink>
            </div>
          ) : (
            <div className="signin-btn">
              <ActiveLink href="/signin">Sign in</ActiveLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
