import Link from "next/link";

const FollowTab = ({ users }) => (
  <div className="follow-tab">
    <ul className="follow-tab-lists">
      {users.map(user => (
        <li className="follow-tab-list" key={user._id}>
          <Link href={`/profile/${user._id}`}>
            <a>
              <img src={user.avatar} className="follow-tab-list__avatar" />
              <h4>{user.name}</h4>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FollowTab;
