import Router from "next/router";

import PostFeed from "../components/index/PostFeed";
import UserFeed from "../components/index/UserFeed";

import { authInitialProps } from "../lib/auth";

const Index = ({ auth }) => (
  <main className="index-page">
    {auth.user && auth.user._id ? (
      // Auth User Page
      <section className="main-auth-page">
        <div className="main-auth-page__inner wrap flex-box">
          <div className="post-feed-container">
            <PostFeed auth={auth} />
          </div>
          <div className="user-feed-container">
            <UserFeed auth={auth} />
          </div>
        </div>
      </section>
    ) : (
      // UnAuth User Page
      <section className="main-unauth-page">
        <div className="main-txt">
          <img className="logo" alt="logo" src="/static/images/next-connect-logo.svg" />
          <h2>Connect with friends, family, and acquaintances across the globe.</h2>
          <button className="btn" onClick={() => Router.push("/signup")}>
            Get Started
          </button>
        </div>
        <div className="main-image">
          <div className="bg-image" style={{ backgroundImage: `url('/static/images/main-image.jpg')` }} />
        </div>
      </section>
    )}
  </main>
);

Index.getInitialProps = authInitialProps();

export default Index;
