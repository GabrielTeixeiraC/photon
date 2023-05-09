import { useState } from 'react';
import { Input } from ".";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getAllUsers } from '../../services/user';

interface ExploreModalProps {
  setDisplayExplore: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ExploreModal({ setDisplayExplore }: ExploreModalProps) {
  interface User {
    name: string;
    username: string;
    email: string;
    following: { id: string }[];
    followed_by: { id: string }[];
  }
  
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  async function getUsers() {
    try {
      const response = await getAllUsers();
      const usernames = response.data.map((user: User) => user.username);
      if (usernames.includes(search)) {
        window.location.href = `/home`;
      }
      else {
        window.alert('User not found');
      }
      setUser(usernames);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  return (
    <div className='modal-explore'>
      <div className='modal-body'>
        <div className='modal-header'><CloseIcon></CloseIcon></div>
        <div className="modal-container-explore">
          <h4> Find a Profile</h4>
          <Input type="text" placeholder="Search" loading={loading} setValue={setSearch} value={search} Icon={SearchIcon} />
          <button onClick={getUsers}>Search</button>
        </div>
      </div>
    </div>
  );
}