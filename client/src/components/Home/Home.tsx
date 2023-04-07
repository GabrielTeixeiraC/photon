import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Post from '../Post/Post';
import { SectionButton } from '../Atoms/SectionButton';
import './Home.css';

export default function Home() {
  const [selected, setSelected] = useState('For You');

  function handleClick(text: string) {
    setSelected(text);
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="home-content">
        <div className="header">
          <SectionButton text='For You' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Following' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Filter' link='/home' selected={selected} handleClick={handleClick} />
        </div>
        <div className="photos">
          <Post src='https://picsum.photos/1400' alt='Post1' likes='11'/>
          <Post src='https://picsum.photos/1600' alt='Post1' likes='4'/>
          <Post src='https://picsum.photos/1700' alt='Post1' likes='7'/>
        </div>
      </div>
    </div>
  );
}