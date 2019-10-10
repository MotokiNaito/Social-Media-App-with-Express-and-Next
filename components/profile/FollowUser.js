import { followUser, unfollowUser } from "../../lib/api";

const FollowUser = ({ isFollowing, toggleFollow }) => {
  const request = isFollowing ? unfollowUser : followUser;

  return (
    <button className="follow-user-btn btn" onClick={() => toggleFollow(request)}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowUser;
