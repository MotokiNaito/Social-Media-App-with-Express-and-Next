import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import Link from "next/link";

class Comments extends React.Component {
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  handleSubmit = event => {
    const { text } = this.state;
    const { postId, handleAddComment } = this.props;

    event.preventDefault();
    handleAddComment(postId, text);
    this.setState({ text: "" });
  };

  showComment = comment => {
    const { postId, auth, classes, handleDeleteComment } = this.props;
    const isCommentCreator = comment.postedBy._id === auth.user._id;

    return (
      <div>
        <Link href={`/profile/${comment.postedBy._id}`}>
          <span>{comment.postedBy.name}</span>
        </Link>
        <br />
        {comment.text}
        <span>
          {this.formatTimeCreated(comment.createdAt)}
          {isCommentCreator && (
            <button onClick={() => handleDeleteComment(postId, comment)}>
              <i className="material-icons">delete</i>
            </button>
          )}
        </span>
      </div>
    );
  };

  formatTimeCreated = time =>
    distanceInWordsToNow(time, {
      includeSeconds: true,
      addSuffix: true
    });

  render() {
    const { auth, comments } = this.props;
    const { text } = this.state;

    return (
      <div className="comments">
        <div className="comment-action">
          <div className="comment-action__img">
            <img src={auth.user.avatar} />
          </div>
          <div className="comment-action__form">
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="add-comment" name="text" placeholder="Add comments" value={text} onChange={this.handleChange} />
            </form>
          </div>
        </div>

        {comments.map(comment => (
          <div className="comment" key={comment._id}>
            <div className="comment__img">
              <img src={comment.postedBy.avatar} />
            </div>
            <div className="comment__txt">{this.showComment(comment)}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Comments;
