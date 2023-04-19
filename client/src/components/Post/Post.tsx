import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import './Post.css'

interface PostProps {
  post: {
    src: string;
    alt: string;
    likes: number;
  };
}

export default function Post({post}: PostProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  function handleClick() {
    setLiked(!liked);
    liked ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
  }

  return (
    <div className="post">
      <div className="post-header">
        <Link to='/home'>
          <img src='https://picsum.photos/700' alt="user" />
        </Link>
        <h4>
          <Link to='/home'>
            gteixeirac
          </Link>
        </h4>
      </div>
      <div className="post-image-container" onDoubleClick={handleClick}>
        <img className="post-photo" src={post.src} alt={post.alt} />
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