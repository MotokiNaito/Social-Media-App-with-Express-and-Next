import Link from "next/link";

import { getUserFeed, followUser } from "../../lib/api";

class UserFeed extends React.Component {
  state = {
    users: [],
    openSuccess: false,
    followingMessage: ""
  };

  componentDidMount() {
    const { auth } = this.props;

    getUserFeed(auth.user._id).then(users => this.setState({ users }));
  }

  handleFollow = (user, userIndex) => {
    followUser(user._id).then(user => {
      const updatedUsers = [...this.state.users.slice(0, userIndex), ...this.state.users.slice(userIndex + 1)];
      this.setState({
        users: updatedUsers,
        openSuccess: true,
        followingMessage: `Following ${user.name}`
      });
    });
  };

  handleClose = () => this.setState({ openSuccess: false });

  render() {
    const { users, openSuccess, followingMessage } = this.state;

    return (
      <section>
        <h3>Browse Users</h3>

        <ul className="browse-users">
          {users.map((user, i) => (
            <li className="user" key={user._id}>
              <div className="user__avatar">
                <span>
                  <img src={user.avatar} />
                </span>
                <span className="user__name">{user.name}</span>
              </div>
              <div className="user__follow">
                <Link href={`/profile/${user._id}`}>
                  <button>
                    <i className="material-icons">person</i>
                  </button>
                </Link>
                <button className="btn" onClick={() => this.handleFollow(user, i)}>
                  Follow
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={`user-snackbar ${openSuccess ? "is-success" : ""}`}>{followingMessage}</div>
      </section>
    );
  }
}

export default UserFeed;
