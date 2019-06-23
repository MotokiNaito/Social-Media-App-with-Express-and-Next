import Button from "@material-ui/core/Button";

import { followUser, unfollowUser } from "../../lib/api";

const FollowUser = ({ isFollowing, toggleFollow }) => {
  const request = isFollowing ? unfollowUser : followUser;

  return (
    <Button variant="contained" color={isFollowing ? "secondary" : "primary"} onClick={() => toggleFollow(request)}>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowUser;
