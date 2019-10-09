import { signoutUser } from "../../lib/auth";
import { deleteUser } from "../../lib/api";

class DeleteUser extends React.Component {
  state = {
    open: false,
    isDeleting: false
  };

  handleDeleteUser = () => {
    const { user } = this.props;

    this.setState({ isDeleting: true });
    deleteUser(user._id)
      .then(() => {
        signoutUser();
      })
      .catch(err => {
        console.error(err);
        this.setState({ isDeleting: false });
      });
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open, isDeleting } = this.state;

    return (
      <div>
        <button onClick={this.handleOpen}>
          <i className="material-icons">delete</i>
        </button>
        {open ? (
          <div className="delete-dialog">
            <div className="delete-dialog__inner">
              <h3>Delete Account</h3>
              <p>Confirm to delete your account</p>
              <div className="delete-dialog__btns">
                <button className="btn" onClick={this.handleClose}>
                  Cancel
                </button>
                <button className="btn" onClick={this.handleDeleteUser} disabled={isDeleting}>
                  {isDeleting ? "Deleting" : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DeleteUser;
