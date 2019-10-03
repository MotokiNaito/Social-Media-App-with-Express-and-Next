import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import Link from "next/link";

import Comments from "./Comments";

class Post extends React.PureComponent {
  state = {
    isLiked: false,
    numLikes: 0,
    comments: []
  };

  componentDidMount() {
    this.setState({
      isLiked: this.checkLiked(this.props.post.likes),
      numLikes: this.props.post.likes.length,
      comments: this.props.post.comments
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post.likes.length !== this.props.post.likes.length) {
      this.setState({
        isLiked: this.checkLiked(this.props.post.likes),
        numLikes: this.props.post.likes.length
      });
    }

    if (prevProps.post.comments.length !== this.props.post.comments.length) {
      this.setState({
        comments: this.props.post.comments
      });
    }
  }

  checkLiked = likes => likes.includes(this.props.auth.user._id);

  formatTimeCreated = time =>
    distanceInWordsToNow(time, {
      includeSeconds: true,
      addSuffix: true
    });

  render() {
    const { post, auth, isDeletingPost, handleDeletePost, handleToggleLike, handleAddComment, handleDeleteComment } = this.props;
    const { isLiked, numLikes, comments } = this.state;
    const isPostCreator = post.postedBy._id === auth.user._id;

    return (
      <article className="post">
        <div className="post-header">
          <div className="post-header__creater">
            <div className="post-header__creater__img">
              <img src={post.postedBy.avatar} />
            </div>
            <div className="post-header__creater__info">
              <Link href={`/profile/${post.postedBy._id}`}>
                <button>{post.postedBy.name}</button>
              </Link>
              <span>{this.formatTimeCreated(post.createdAt)}</span>
            </div>
          </div>
          {isPostCreator && (
            <button disabled={isDeletingPost} onClick={() => handleDeletePost(post)}>
              <i class="material-icons">delete</i>
            </button>
          )}
        </div>

        <div className="post-content">
          {post.text}
          {post.image && (
            <div className="post-content__imgcontainer">
              <img className="post-content__img" src={post.image} />
            </div>
          )}
        </div>

        <div className="post-actions">
          <button onClick={() => handleToggleLike(post)}>
            {isLiked ? (
              <div className="post-actions__btn">
                <i class="material-icons">favorite</i>
                <span>{numLikes}</span>
              </div>
            ) : (
              <div className="post-actions__btn">
                <i class="material-icons">favorite_border</i>
              </div>
            )}
          </button>
          <button className="post-actions__btn">
            <i class="material-icons">comment</i>
            <span>{comments.length}</span>
          </button>
        </div>

        <Comments auth={auth} postId={post._id} comments={comments} handleAddComment={handleAddComment} handleDeleteComment={handleDeleteComment} />
      </article>
    );
  }
}

export default Post;
