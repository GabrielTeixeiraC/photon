import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <Sidebar />
      <div className="header">
        <img src="https://picsum.photos/700" alt="profile" />
        <div className="header-info">
          <h3>{user.username}</h3>
          <h3>{'posts.length'} posts</h3>
          <h3>{'followersCount'} followers</h3>
          <h3>{'followingCount'} following</h3>
          <h3>{'likes'}</h3>
        </div>
      </div>
      <div className="posts">
        {['posts'].map((post) => (
          <img src={post} alt="post" />
        ))}
      </div>
    </div>
  );
}