import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='maindiv'>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Wrap the title in a Link component */}
          <h1 className="navbar-title">
            <Link to="/header" className='link'>MY-TODO-LIST</Link>
          </h1>
          <ul className="navbar-menu">
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Signup</Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className='sec1'>
        <h1>Welcome To ToDo List</h1>
        <h1>Signup For New User</h1>
        <h1>Login For Exist User</h1>


      </section>
    </div>
  );
}

export default Header;
