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
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ];

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile-content">
        <div className="profile">

          <div className="header">
            <img src="https://picsum.photos/200" alt="profile" className="avatar" />
            {user && (
              <div className="header-info">
                <div className="names">
                  <h3>{user?.name}</h3>
                  <h3>@{user?.username}</h3>
                </div>
                <div className="numbers">
                  <h4>Following: {user?.following.length}</h4>
                  <h4>Followers: {user?.followed_by.length}</h4>
                </div>
              </div>
            )}
          </div>
          <div className="posts">
            {posts.map((post) => (
              <img src={post} alt="post" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}