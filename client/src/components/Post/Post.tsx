import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import foto from '../../assets/foto.jpg';
import './Post.css'

interface PostProps {
  src: string;
  alt: string;
  likes: string;
}

export default function Post({src, alt, likes}: PostProps) {
  const [liked, setLiked] = useState(false);

  function handleClick() {
    setLiked(!liked);

    if (liked) {
      console.log('unliked');
    } else {
      console.log('liked');
    }
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
      <img className="photo" onDoubleClick={handleClick} src={src} alt={alt} /> 
      <div className="post-footer">
        <div className="post-footer-left">
          {liked ? (
            <FavoriteOutlinedIcon onClick={handleClick} sx={{ fontSize: "2.2rem", fill: "red"}} className='heart-icon' />
          ) : (
            <FavoriteBorderOutlinedIcon onClick={handleClick} sx={{fontSize: "2.2rem"}} className='heart-icon' />
          )}
          
          <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: "2.2rem" }} className='footer-icon' />
        </div>
        <div className="post-footer-right">
          <h3>{likes} likes</h3>
        </div>
      </div>
    </div>
  );
}