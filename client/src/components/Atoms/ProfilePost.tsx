import FavoriteIcon from '@mui/icons-material/Favorite';

interface ProfilePostProps {
  post: {
    src: string;
    alt: string;
    likes: string;
  },
  index: number;
}

export function ProfilePost({post, index}: ProfilePostProps) {
  return (
    <div className="profile-post-wrapper" key={index}>
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