import FavoriteIcon from '@mui/icons-material/Favorite';
import './ProfilePost.css';

interface ProfilePostProps {
  post: {
    src: string;
    alt: string;
    likes: string;
  }
}

export function ProfilePost({post}: ProfilePostProps) {
  return (
    <div className="profile-post-wrapper">
      <img src={post.src} alt={post.alt} className="profile-post-image" />
      <div className="profile-post-overlay">
        <div className="profile-post-overlay-text">
          <FavoriteIcon style={{alignItems: 'center'}} className="profile-post-icon" />
          <div className="profile-post-likes-count">{post.likes}</div>
        </div>  
      </div>
    </div>
  )
}