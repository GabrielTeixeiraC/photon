import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { ListItem } from '../Atoms/ListItem';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>
        <Link to='/home'>photon</Link>
      </h1>
      <div className="sidebar-list">
        <ListItem Icon={HomeOutlinedIcon} text="Home" link="/home" />
        <ListItem Icon={SearchOutlinedIcon} text="Explore" link="/home" />
        <ListItem Icon={AddAPhotoOutlinedIcon} text="Create" link="/home" />
        <ListItem Icon={SendOutlinedIcon} text="Messages" link="/home" />
        <ListItem Icon={AccountCircleOutlinedIcon} text="Profile" link="/me" />        
      </div>
    </div>
  );
}