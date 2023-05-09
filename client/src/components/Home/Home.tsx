import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Post from '../Post/Post';
import { CreateModal, ExploreModal, SectionButton } from '../Atoms';
import { getSelectedPictures } from '../../services/picture';
import './Home.css';

export default function Home() {
  const [selected, setSelected] = useState('For You');
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayExplore, setDisplayExplore] = useState(false);
  const [tag, setTags] = useState('');
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const getPictures = async (selected: string, tag: string) => {
      try {
        const response = await getSelectedPictures(selected, tag);
        setPosts(response.data);
        setRender(false);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    getPictures(selected, tag);
  }, [selected, render]);

  function handleClick(text: string) {
    setSelected(text);
  }

  return (
    <div className="home">
      <Sidebar setDisplayCreate={setDisplayCreate}  setDisplayExplore={setDisplayExplore} />
      <div className="home-content">
        <div className="home-header">
          <SectionButton text='For You' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Following' link='/home' selected={selected} handleClick={handleClick} />
          <SectionButton text='Filter' link='/home' selected={selected} handleClick={handleClick} />
        </div>
        {displayCreate && <CreateModal setDisplayCreate={setDisplayCreate} setRender={setRender}/>}
        {displayExplore && <ExploreModal setDisplayExplore={setDisplayExplore} />}

        <div className="home-photos">
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}