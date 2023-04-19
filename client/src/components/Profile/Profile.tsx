import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { getLoggedUser } from "../../services/user";
import "./Profile.css";

interface User {
  name: string;
  username: string;
  email: string;
  following: {id: string}[];
  followed_by: {id: string}[];
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getLoggedUser();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  // mock posts
  const posts = [
    { src: "https://picsum.photos/1000", alt: "Post1", likes: "11" },
    { src: "https://picsum.photos/1001", alt: "Post2", likes: "4" },
    { src: "https://picsum.photos/1002", alt: "Post3", likes: "7" },
    { src: "https://picsum.photos/1003", alt: "Post4", likes: "11" },
    { src: "https://picsum.photos/1004", alt: "Post5", likes: "4" },
    { src: "https://picsum.photos/1005", alt: "Post6", likes: "7" },
    { src: "https://picsum.photos/1006", alt: "Post7", likes: "11" },
    { src: "https://picsum.photos/1007", alt: "Post8", likes: "4" },
    { src: "https://picsum.photos/1008", alt: "Post9", likes: "7" },
    { src: "https://picsum.photos/1009", alt: "Post10", likes: "11" },
    { src: "https://picsum.photos/1011", alt: "Post11", likes: "4" },
  ];

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile-content">
        <div className="profile">

          <div className="profile-header">
            <img src="https://picsum.photos/200" alt="profile" className="profile-avatar" />
            {user && (
              <div className="profile-header-info">
                <div className="profile-names">
                  <h3>{user?.name}</h3>
                  <h3>@{user?.username}</h3>
                </div>
                <div className="profile-numbers">
                  <h4>Posts: {posts.length}</h4>
                  <h4>Following: {user?.following.length}</h4>
                  <h4>Followers: {user?.followed_by.length}</h4>
                </div>
              </div>
            )}
          </div>
          <div className="profile-posts">
            {posts.map((post, index) => (
              <div className="profile-post-wrapper">
                <img src={post.src} alt={post.alt} className="profile-post" />
                <div className="profile-post-overlay">{post.likes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}