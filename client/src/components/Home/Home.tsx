import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Post from '../Post/Post';
import { SectionButton } from '../Atoms/SectionButton';
import './Home.css';

export default function Home() {
  const [selected, setSelected] = useState('For You');

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

  return (
    <div className="home">
      <Sidebar />
      <div className="home-content">
        <div className="home-header">
          <SectionButton text='For You' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Following' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Filter' link='/home' selected={selected} handleClick={handleClick} />
        </div>
        <div className="home-photos">
          {posts.map((post, index) => (
            <Post post={post} key={index} />  
          ))}
        </div>
      </div>
    </div>
  );
}