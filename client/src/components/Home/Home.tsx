import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Post from '../Post/Post';
import { SectionButton } from '../Atoms/SectionButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import { Button, Input, Error} from '../Atoms';
import './Home.css';
import { getAllUsers } from '../../services/user';


export default function Home() {
  interface User {
    name: string;
    username: string;
    email: string;
    following: {id: string}[];
    followed_by: {id: string}[];
  }

  const [selected, setSelected] = useState('For You');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const posts = [
    {
      src: 'https://picsum.photos/1200',
      alt: 'post',
      likes: 10,
    },
    {
      src: 'https://picsum.photos/1201',
      alt: 'post',
      likes: 11,
    },
    {
      src: 'https://picsum.photos/1202',
      alt: 'post',
      likes: 7,
    },
    {
      src: 'https://picsum.photos/1203',
      alt: 'post',
      likes: 14,
    },
  ];

  function handleClick(text: string) {
    setSelected(text);
      
  }
  function quitModalCreate(){
    let modal = document.querySelector('.modal-create') as HTMLElement;
    modal.style.display = 'none';
  }
  function quitModalExplore(){
    let modal = document.querySelector('.modal-explore') as HTMLElement;
    modal.style.display = 'none';
  }
  
  
  async function getUsers() {
    try{
      const response = await getAllUsers();
      const usernames = response.data.map((user: User) => user.username);
      if (usernames.includes(search)) {
        console.log('Found');
        window.location.href = `/home`;
      }
      else {
        window.alert('User not found');
      }
    setUser(usernames); 
    }catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
 
  
  return (
    <div className="home">
      <Sidebar />
      <div className="home-content">
        <div className="home-header">
          <SectionButton text='For You' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Following' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Filter' link='/home' selected={selected} handleClick={handleClick} />
        </div>
      <div className='modal-create'>
        <div className = 'modal-body'>
          <div className='modal-header'><CloseIcon onClick={quitModalCreate} ></CloseIcon></div>
          <div className="modal-container">
            <h4> Upload a picture</h4>  
            <Input type="text" placeholder="Category (Optional)" loading={loading} setValue={setCategory} value={category} Icon={CategoryIcon} />          
            <Button loading={loading} buttonText='Upload'/>
          </div>
        </div>
      </div>
      <div className='modal-explore'>
        <div className = 'modal-body'>
          <div className='modal-header'><CloseIcon onClick={quitModalExplore} ></CloseIcon></div>
          <div className="modal-container-explore">
            <h4> Find a Profile</h4>  
            <Input type="text" placeholder="Search" loading={loading} setValue={setSearch} value={search} Icon={SearchIcon} />
            <button onClick={getUsers}>Search</button>
          </div>
        </div></div>
        <div className="home-photos">
          {posts.map((post, index) => (
            <Post post={post} key={index} />  
          ))}
        </div>
      </div>
    </div>
  );
}