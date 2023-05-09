import Sidebar from "../Sidebar/Sidebar";
import { CreateModal, ExploreModal, ProfilePost } from "../Atoms";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../../services/user";
import { getPicturesByUserID } from "../../services/picture";
import "./Profile.css";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  following: {id: string}[];
  followed_by: {id: string}[];
  picture: {
    id: string;
    picture_url: string;
  }[]
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayExplore, setDisplayExplore] = useState(false);
  const [render, setRender] = useState(false);
  const [posts, setPosts] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    if (!username) return;
    const getUserData = async () => {
      try {
        const response = await getUserByUsername(username);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, [username]);

  useEffect(() => {
    if (!user) return;
    const getPosts = async () => {
      try {
        const response = await getPicturesByUserID(user.id);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, [render, user]);


  return (
    <div className="profile-page">
      <Sidebar displayCreate={displayCreate} displayExplore={displayExplore} setDisplayCreate={setDisplayCreate}  setDisplayExplore={setDisplayExplore} />
      <div className="profile-content">
        <div className="profile">
          <div className="profile-header">
            <img src={'../../../' + user?.picture[0].picture_url} alt="profile" className="profile-avatar" />
            {user && (
              <div className="profile-header-info">
                <div className="profile-names">
                  <h3>{user.name}</h3>
                  <h3>@{user.username}</h3>
                </div>
                <div className="profile-numbers">
                  <h4>Posts: {posts.length}</h4>
                  <h4>Following: {user.following.length}</h4>
                  <h4>Followers: {user.followed_by.length}</h4>
                </div>
              </div>
            )}
          </div>
          <CreateModal displayCreate={displayCreate} setDisplayCreate={setDisplayCreate} setRender={setRender} />
          <ExploreModal displayExplore={displayExplore} setDisplayExplore={setDisplayExplore} />
          <div className="profile-posts">
            {posts.map((post, index) => (
              <ProfilePost post={post} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}