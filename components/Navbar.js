import Link from "next/link";

import ActiveLink from "./ActiveLink";
import { signoutUser } from "../lib/auth";

const Navbar = ({ router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};
  return (
    <header>
      {user._id ? (
        // Auth Navigation
        <div className="auth-nav">
          <div className="auth-nav__left">
            <Link href="/">
              <img className="header-logo" alt="logo" src="/static/images/next-connect-logo-blue.svg" />
            </Link>
          </div>
          <div className="auth-nav__right">
            <div className="profile-btn">
              <ActiveLink href={`/profile/${user._id}`}>Profile</ActiveLink>
            </div>
            <div onClick={signoutUser} className="signout-btn">
              <a>Sign out</a>
            </div>
          </div>
        </div>
      ) : (
        // UnAuth Navigation
        <div className="unauth-nav">
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
