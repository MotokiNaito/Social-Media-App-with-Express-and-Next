import Router from "next/router";
import Link from "next/link";

import { signinUser } from "../lib/auth";

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    isLoading: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { email, password } = this.state;

    event.preventDefault();
    const user = { email, password };
    this.setState({ isLoading: true, error: "" });
    signinUser(user)
      .then(() => {
        Router.push("/");
      })
      .catch(this.showError);
  };

  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, isLoading: false });
  };

  render() {
    const { error, isLoading } = this.state;

    return (
      <section className="sign-in-up-page">
        <div className="form-wrapper">
          <Link href="/">
            <img className="logo" alt="logo" src="/static/images/next-connect-logo-blue.svg" />
          </Link>
          <h2>Sign in</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" onChange={this.handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" onChange={this.handleChange} />
            </div>
            <button className="btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {error && <div className="form-error">{error}</div>}
        </div>
        <div className="bg-image" style={{ backgroundImage: `url('/static/images/sigininup.jpg')` }} />
      </section>
    );
  }
}

export default Signin;
