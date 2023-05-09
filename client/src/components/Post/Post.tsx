import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Atoms';
import { getLoggedUser, toggleFollow } from '../../services/user';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import './Post.css'

interface User {
  id: string;
  username: string;
  picture: {
    picture_url: string;
  }[]
  following: string[];
  followed_by: string[];
}

interface PostProps {
  post: {
    user: User;
    picture_url: string;
    tags: string[];
    likes: string[];
  };
}

export default function Post({post}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const getLoggedUserData = async () => {
      try {
        const response = await getLoggedUser();
        setLoggedUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    getLoggedUserData();
  }, []);

  function handleClick() {
    setLiked(!liked);
    liked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  }

  const handleFollow = async () => {
    try {
      await toggleFollow(user!.id);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };
  
  return (
    <div className="post">
      <div className="post-header">
        <Link to={'/profile/' + post.user.username}>
          <img src={'../../../' + post.user.picture[0].picture_url} alt="user" />
        </Link>
        <h4>
          <Link to={'/profile/' + post.user.username}>
            {post.user.username}
          </Link>
        </h4>
        {loggedUser && loggedUser.id !== post.user.id && 
        <Button buttonText={(loggedUser.following.includes(post.user.id)) ? 'Unfollow' : 'Follow'} onClick={() => handleFollow()} />
        }
      </div>
      <div className="post-image-container" onDoubleClick={handleClick}>
        <img className="post-photo" src={'../../../' + post.picture_url} alt={post.picture_url} />
        {liked && 
        <div className="post-overlay">
          <FavoriteIcon sx={{ fontSize: "8em", color: "white" }} className='post-overlay-heart' />
        </div>}
      </div>
      <div className="post-footer">
        <div className="post-footer-left">
          {liked ? (
            <FavoriteOutlinedIcon onClick={handleClick} sx={{ fontSize: "2.2rem", fill: "red"}} className='post-heart-icon' />
          ) : (
            <FavoriteBorderOutlinedIcon onClick={handleClick} sx={{fontSize: "2.2rem"}} className='post-heart-icon' />
          )}
          
          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "2.2rem" }} className='post-footer-icon' />
        </div>
        <div className="post-footer-right">
          <h3>{likeCount} likes</h3>
        </div>
      </div>
    </div>
  );
} 