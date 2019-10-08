import Post from "../../components/index/Post";
import FollowTab from "../../components/profile/FollowTab";

class ProfileTabs extends React.Component {
  state = {
    tab: 0
  };

  handleTabChange = e => {
    this.setState({ tab: Number(e.target.dataset.tab) });
  };

  render() {
    const { tab } = this.state;
    const { posts, user, auth, isDeletingPost, handleDeletePost, handleToggleLike, handleAddComment, handleDeleteComment } = this.props;

    return (
      <div>
        <div className="tab-container">
          <button data-tab="0" onClick={this.handleTabChange}>
            Posts
          </button>
          <button data-tab="1" onClick={this.handleTabChange}>
            Following
          </button>
          <button data-tab="2" onClick={this.handleTabChange}>
            Followers
          </button>
        </div>
        {tab === 0 && (
          <div>
            {posts.map(post => (
              <Post
                key={post._id}
                auth={auth}
                post={post}
                isDeletingPost={isDeletingPost}
                handleDeletePost={handleDeletePost}
                handleToggleLike={handleToggleLike}
                handleAddComment={handleAddComment}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </div>
        )}
        {tab === 1 && (
          <div>
            <FollowTab users={user.following} />
          </div>
        )}
        {tab === 2 && (
          <div>
            <FollowTab users={user.followers} />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileTabs;
