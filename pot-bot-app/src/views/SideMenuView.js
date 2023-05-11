import {Link, useLocation} from 'react-router-dom';
import {useState} from 'react';
import '../styling/SideMenu.css';

function SideMenuView() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (location.pathname === '/' || location.pathname === '/signup') {
    return null;
  }

  return (
    <div className='SideMenu'>
      <button className='hamburger' onClick={toggleMenu}>
        <span className='icon'>&#9776;</span>
      </button>
      {isOpen && (
        <ul>
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
        </ul>
      )}
    </div>
  );
}

export default SideMenuView;