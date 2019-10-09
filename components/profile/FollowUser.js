import { followUser, unfollowUser } from "../../lib/api";

const FollowUser = ({ isFollowing, toggleFollow }) => {
  const request = isFollowing ? unfollowUser : followUser;

  return <button onClick={() => toggleFollow(request)}>{isFollowing ? "Unfollow" : "Follow"}</button>;
};

export default FollowUser;
