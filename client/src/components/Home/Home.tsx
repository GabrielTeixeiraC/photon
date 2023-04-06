import Sidebar from '../Sidebar/Sidebar';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-content">
        <div className="header">
          <h2>For U</h2>
          <h2>Following</h2>
          <h2>Filter</h2>
        </div>
      </div>
    </div>
  );
}