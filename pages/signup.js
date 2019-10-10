import Link from "next/link";

import { signupUser } from "../lib/auth";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    createdUser: "",
    openError: false,
    openSuccess: false,
    isLoading: false
  };

  handleClose = () => this.setState({ openError: false });

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { name, email, password } = this.state;

    event.preventDefault();
    const user = { name, email, password };
    this.setState({ isLoading: true, error: "" });
    signupUser(user)
      .then(createdUser => {
        this.setState({
          createdUser,
          error: "",
          openSuccess: true,
          isLoading: false
        });
      })
      .catch(this.showError);
  };

  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, openError: true, isLoading: false });
  };

  render() {
    const { error, openSuccess, createdUser, isLoading } = this.state;

    return (
      <section className="sign-in-up-page">
        <div className="form-wrapper">
          <Link href="/">
            <img className="logo" alt="logo" src="/static/images/next-connect-logo-blue.svg" />
          </Link>
          <h2>Sign up</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="form-input">
              <label htmlFor="name">Name</label>
              <input name="name" type="text" onChange={this.handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="email">Email</label>
              <input name="email" type="email" onChange={this.handleChange} />
            </div>
            <div className="form-input">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" onChange={this.handleChange} />
            </div>
            <button className="btn" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          {error && <div className="form-error">{error}</div>}
        </div>
        <div className="bg-image" style={{ backgroundImage: `url('/static/images/sign-up.jpg')` }} />
        {openSuccess && (
          <div className="dialog-container">
            <div className="dialog-container__inner">
              <h2>New Account</h2>
              <p>User {createdUser} successfully created!</p>
              <Link href="/signin">
                <button className="btn">Sign in</button>
              </Link>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Signup;
