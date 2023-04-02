import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './Sidebar.css';

export default function Sidebar() {
  const [active, setActive] = useState('home');


  return (
    <div className="sidebar">
      <h1>
        <Link to='/home'>photon</Link>
      </h1>
      <div className="list">
        <Link to='/home' className="list-item">
          <div className="list-icon"><HomeOutlinedIcon sx={{alignSelf: 'center'}}/></div>
          <p className="list-text">Home</p>
        </Link>
        <Link to='/home' className="list-item">
          <div className="list-icon"><SearchOutlinedIcon sx={{alignSelf: 'center'}}/></div>
          <p className="list-text">Explore</p>
        </Link>
        <Link to='/home' className="list-item">
          <div className="list-icon"><AddAPhotoOutlinedIcon sx={{alignSelf: 'center'}}/></div>
          <p className="list-text">Create</p>
        </Link>
        <Link to='/home' className="list-item">
          <div className="list-icon"><SendOutlinedIcon sx={{alignSelf: 'center'}}/></div>
          <p className="list-text">Messages</p>
        </Link>
        <Link to='/home' className="list-item">
          <div className="list-icon"><AccountCircleOutlinedIcon sx={{alignSelf: 'center'}}/></div>
          <p className="list-text">Profile</p>
        </Link>
      </div>
    </div>
  );
}