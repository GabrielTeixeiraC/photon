import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    posts: [],
    followersCount: 0,
    followingCount: 0,
    likes: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(user);
  }, []);

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile">
        <div className="header">
          <img src="https://picsum.photos/700" alt="profile" className="avatar" />
          <div className="header-info">
            <h3>{user.username}</h3>
            <h3>{'posts.length'} posts</h3>
            <h3>{'followersCount'} followers</h3>
            <h3>{'followingCount'} following</h3>
            <h3>{'likes'}</h3>
          </div>
        </div>
        <div className="posts">
          {/* {['posts'].map((post) => (
            <img src={post} alt="post" />
          ))} */}
        </div>
      </div>
    </div>
  );
}