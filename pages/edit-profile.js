import Router from "next/router";

import { authInitialProps } from "../lib/auth";
import { getAuthUser, updateUser } from "../lib/api";

class EditProfile extends React.Component {
  state = {
    _id: "",
    name: "",
    email: "",
    about: "",
    avatar: "",
    avatarPreview: "",
    openSuccess: false,
    openError: false,
    error: "",
    updatedUser: null,
    isSaving: false,
    isLoading: true
  };

  componentDidMount() {
    const { auth } = this.props;

    this.userData = new FormData();
    getAuthUser(auth.user._id)
      .then(user => {
        this.setState({
          ...user,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isLoading: false });
      });
  }

  handleChange = event => {
    let inputValue;

    if (event.target.name === "avatar") {
      inputValue = event.target.files[0];
      this.setState({ avatarPreview: this.createPreviewImage(inputValue) });
    } else {
      inputValue = event.target.value;
    }
    this.userData.set(event.target.name, inputValue);
    this.setState({ [event.target.name]: inputValue });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSaving: true });
    updateUser(this.state._id, this.userData)
      .then(updatedUser => {
        this.setState({ updatedUser, openSuccess: true }, () => {
          setTimeout(() => Router.push(`/profile/${this.state._id}`), 4000);
        });
      })
      .catch(this.showError);
  };

  createPreviewImage = file => URL.createObjectURL(file);

  handleClose = () => this.setState({ openError: false });

  showError = err => {
    const error = (err.response && err.response.data) || err.message;
    this.setState({ error, openError: true, isSaving: false });
  };

  render() {
    const { name, email, avatar, about, avatarPreview, isLoading, isSaving, updatedUser, openSuccess, openError, error } = this.state;

    return (
      <div className="edit-profile">
        <h1>Edit Profile</h1>

        <form onSubmit={this.handleSubmit}>
          <div className="edit-profile__avatar">{isLoading ? <i className="material-icons">face</i> : <img src={avatarPreview || avatar} />}</div>
          <input className="input-file" type="file" name="avatar" id="avatar" accept="image/*" onChange={this.handleChange} />
          <label htmlFor="avatar">
            <button className="upload-btn btn">
              <span>Upload Image</span>
              <i class="material-icons">cloud_upload</i>
            </button>
          </label>
          <span>{avatar && avatar.name}</span>
          <input placeholder="Name" type="text" name="name" value={name} onChange={this.handleChange} />
          <input placeholder="About" type="text" name="about" value={about} onChange={this.handleChange} />
          <input placeholder="Email" type="email" name="email" value={email} onChange={this.handleChange} />

          <button className="btn" type="submit" disabled={isSaving || isLoading}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </form>
        {error && <span className="edit-profile__error">{error}</span>}
        {openSuccess && (
          <div className="edit-profile__success">
            <h4>Profile Updated</h4>
            <p>User {updatedUser && updatedUser.name} was successfully updated!</p>
          </div>
        )}
      </div>
    );
  }
}

EditProfile.getInitialProps = authInitialProps(true);

export default EditProfile;
