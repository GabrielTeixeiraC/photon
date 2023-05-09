import { Link } from 'react-router-dom';
import { ListItem } from '../Atoms/ListItem';
import { logout } from '../../services/authenticate';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import './Sidebar.css';
import { useState, useEffect } from 'react';
import { getLoggedUser } from '../../services/user';

interface User {
  name: string;
  username: string;
  email: string;
  following: {id: string}[];
  followed_by: {id: string}[];
}

export default function Sidebar() {
  async function handleClick() {
    await logout().catch((err) => {
      console.log(err);
      throw err;
    });
  }
  async function changeDisplayCreate() {
    let modal = document.querySelector('.modal-create') as HTMLElement;
    modal.style.display = 'flex';

  }
  async function changeDisplayExplore() {
    let modal = document.querySelector('.modal-explore') as HTMLElement;
    modal.style.display = 'flex';
  }
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getLoggedUser();
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);


  

  return (
    <div className="sidebar">
      <h1>
        <Link to='/home'>photon</Link>
      </h1>
      <div className="sidebar-list">
        <ListItem Icon={HomeOutlinedIcon} text="Home" link="/home" />
        <ListItem Icon={SearchOutlinedIcon} text="Explore"onClick={changeDisplayExplore} link="/home" />
        <ListItem Icon={AddAPhotoOutlinedIcon} text="Create" onClick={changeDisplayCreate} link='/home'/>
        <ListItem Icon={SendOutlinedIcon} text="Messages" link="/home" />
        <ListItem Icon={AccountCircleOutlinedIcon} text="Profile" link={`/profile/${user?.username}`} />
        <ListItem onClick={handleClick} Icon={LogoutOutlinedIcon} text="Logout" link="/" />
      </div>
    </div>
  );
}