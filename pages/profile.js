import format from "date-fns/format";
import Link from "next/link";

import ProfileTabs from "../components/profile/ProfileTabs";
import DeleteUser from "../components/profile/DeleteUser";
import FollowUser from "../components/profile/FollowUser";
import { authInitialProps } from "../lib/auth";
import { getUser, getPostsByUser, deletePost, likePost, unlikePost, addComment, deleteComment } from "../lib/api";

class Profile extends React.Component {
  state = {
    user: null,
    posts: [],
    isAuth: false,
    isFollowing: false,
    isLoading: true,
    isDeletingPost: false
  };

  componentDidMount() {
    const { userId, auth } = this.props;

    getUser(userId).then(async user => {
      const isAuth = auth.user._id === userId;
      const isFollowing = this.checkFollow(auth, user);
      const posts = await getPostsByUser(userId);
      this.setState({
        user,
        posts,
        isAuth,
        isFollowing,
        isLoading: false
      });
    });
  }

  checkFollow = (auth, user) => {
    return user.followers.findIndex(follower => follower._id === auth.user._id) > -1;
  };

  toggleFollow = sendRequest => {
    const { userId } = this.props;
    const { isFollowing } = this.state;

    sendRequest(userId).then(() => {
      this.setState({ isFollowing: !isFollowing });
    });
  };

  handleDeletePost = deletedPost => {
    this.setState({ isDeletingPost: true });
    deletePost(deletedPost._id)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(post => post._id === postData._id);
        const updatedPosts = [...this.state.posts.slice(0, postIndex), ...this.state.posts.slice(postIndex + 1)];
        this.setState({
          posts: updatedPosts,
          isDeletingPost: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isDeletingPost: false });
      });
  };

  handleToggleLike = post => {
    const { auth } = this.props;

    const isPostLiked = post.likes.includes(auth.user._id);
    const sendRequest = isPostLiked ? unlikePost : likePost;
    sendRequest(post._id)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(post => post._id === postData._id);
        const updatedPosts = [...this.state.posts.slice(0, postIndex), postData, ...this.state.posts.slice(postIndex + 1)];
        this.setState({ posts: updatedPosts });
      })
      .catch(err => console.error(err));
  };

  handleAddComment = (postId, text) => {
    const comment = { text };
    addComment(postId, comment)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(post => post._id === postData._id);
        const updatedPosts = [...this.state.posts.slice(0, postIndex), postData, ...this.state.posts.slice(postIndex + 1)];
        this.setState({ posts: updatedPosts });
      })
      .catch(err => console.error(err));
  };

  handleDeleteComment = (postId, comment) => {
    deleteComment(postId, comment)
      .then(postData => {
        const postIndex = this.state.posts.findIndex(post => post._id === postData._id);
        const updatedPosts = [...this.state.posts.slice(0, postIndex), postData, ...this.state.posts.slice(postIndex + 1)];
        this.setState({ posts: updatedPosts });
      })
      .catch(err => console.error(err));
  };

  formatDate = date => format(date, "dddd, MMMM Do, YYYY");

  render() {
    const { auth } = this.props;
    const { isLoading, posts, user, isAuth, isFollowing, isDeletingPost } = this.state;

    return (
      <section className="profile">
        <h1>Profile</h1>

        {isLoading ? (
          <div className="loading-profile">Loading now...</div>
        ) : (
          <div className="profile-inner">
            <div>
              <div className="profile-info">
                <div className="profile-info__avatar">
                  <img src={user.avatar} />
                </div>
                <div className="profile-info__text">
                  <h3>{user.name}</h3>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                  <span>{`Joined: ${this.formatDate(user.createdAt)}`}</span>
                </div>
              </div>

              {/* Auth - Edit Buttons / UnAuth - Follow Buttons */}
              {isAuth ? (
                <div className="profile-edit">
                  <Link href="/edit-profile">
                    <button>
                      <i className="material-icons">edit</i>
                    </button>
                  </Link>
                  <DeleteUser user={user} />
                </div>
              ) : (
                <FollowUser isFollowing={isFollowing} toggleFollow={this.toggleFollow} />
              )}
            </div>

            {/* Display User's Posts, Following, and Followers */}
            <ProfileTabs
              auth={auth}
              posts={posts}
              user={user}
              isDeletingPost={isDeletingPost}
              handleDeletePost={this.handleDeletePost}
              handleToggleLike={this.handleToggleLike}
              handleAddComment={this.handleAddComment}
              handleDeleteComment={this.handleDeleteComment}
            />
          </div>
        )}
      </section>
    );
  }
}

Profile.getInitialProps = authInitialProps(true);

export default Profile;
