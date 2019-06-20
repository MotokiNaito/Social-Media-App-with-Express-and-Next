const mongooose = require('mongoose');
const User = mongooose.model('User');

exports.getUsers = async (req, res) => {
  const users = await User.find().select("_id name email createdAt updatedAt");
  res.json(users);
};

exports.getAuthUser = (req, res) => {
  if (!req.isAuthUser) {
    res.status(403).json({
      message: 'You are unauthenticated. Please sign in or sign up'
    })
    return res.redirect('/signin')
  }
  res.json(req.user)
};

exports.getUserById = async (req, res, next, id) => {
  const user = await User.findOne({
    _id: id
  });
  req.profile = user;

  const profileId = mongooose.Types.ObjectId(req.profile._id)

  if (profileId.equals(req.user._id)) {
    req.isAuthUser = true;
    return next();
  }
  next();
};

exports.getUserProfile = (req, res) => {
  if (!req.profile) {
    return res.status(404).json({
      message: 'No user found'
    })
  }

  res.json(req.profile)
};

exports.getUserFeed = () => {};

exports.uploadAvatar = () => {};

exports.resizeAvatar = () => {};

exports.updateUser = () => {};

exports.deleteUser = async (req, res) => {
  const {
    userId
  } = req.params;

  if (!req.isAuthUser) {
    return res.status(400).json({
      message: 'You are not authorized to perform this action'
    })
  }

  const deletedUser = await User.findOneAndDelete({
    _id: userId
  })
  res.json(deletedUser);
};

exports.addFollowing = () => {};

exports.addFollower = () => {};

exports.deleteFollowing = () => {};

exports.deleteFollower = () => {};