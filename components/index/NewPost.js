const NewPost = ({ auth, text, image, isAddingPost, handleChange, handleAddPost }) => (
  <section className="new-post">
    <div className="new-post__header">
      <h2>Create a post</h2>
      <div className="new-post__header__inner">
        <div className="new-post__header__avatar">
          <img src={auth.user.avatar} />
        </div>
        <h2>{auth.user.name}</h2>
      </div>
    </div>
    <div className="new-post__content">
      <input value={text} name="text" placeholder={`What's on your mind, ${auth.user.name}?`} onChange={handleChange} />
      <input accept="image/*" name="image" id="image" onChange={handleChange} className="image-input" type="file" />
      <label htmlFor="image">
        <p>Add a photo</p>
      </label>
      <span>{image && image.name}</span>
    </div>
    <button className="btn" disabled={!text || isAddingPost} onClick={handleAddPost}>
      {isAddingPost ? "Sending" : "Post"}
    </button>
  </section>
);

export default NewPost;
