import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Post from '../Post/Post';
import { CreateModal, ExploreModal, SectionButton } from '../Atoms';
import { getForYouPictures } from '../../services/picture';
import './Home.css';

export default function Home() {
  const [selected, setSelected] = useState('For You');
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayExplore, setDisplayExplore] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPictures = async (selected: string) => {
      try {
        if (selected === 'For You') {
          getForYouPictures().then((res) => {
            setPosts(res.data);
          });
        } else if (selected === 'Following') {
          // getFollowingPictures().then((res) => {
          //   setPosts(res.data);
          // });
        } else {
          // getFilteredPictures().then((res) => {
          //   setPosts(res.data);
          // });
        }
        console.log(posts);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    getPictures(selected);
  }, [selected, posts]);

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
        {displayCreate && <CreateModal setDisplayCreate={setDisplayCreate} />}
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