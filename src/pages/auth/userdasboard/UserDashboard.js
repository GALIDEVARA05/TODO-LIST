import React, { useState, useEffect } from 'react';
import './UserDashboards.css';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [newTodo, setNewTodo] = useState('');
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showProfileMenu, setShowProfileMenu] = useState(false); // State for showing email and logout option
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (!token) {
      setMessage('No token found, please log in.');
      navigate('/login'); // Redirect to login page if no token
    }

    // Set user info
    setUserInfo({ name: userName || 'User', email: userEmail || 'No email available' });
  }, [navigate]);

  const handleSave = () => {
    if (!newTodo.trim()) return; // Prevent saving empty todos

    const updatedTodos = JSON.parse(localStorage.getItem(`todos_${userInfo.name}`)) || [];
    updatedTodos.push({ id: Date.now(), content: newTodo });
    localStorage.setItem(`todos_${userInfo.name}`, JSON.stringify(updatedTodos));
    setNewTodo('');
    setMessage('To-do saved successfully');

    // Navigate to TodoList page after saving
    navigate('/todolist');
  };

  const handleMyRecords = () => {
    navigate('/todolist'); // Navigate to the TodoList page
  };

  const handleProfileClick = () => {
    // Toggle showing the profile menu (email + logout option)
    setShowProfileMenu((prevShowProfileMenu) => !prevShowProfileMenu);
  };

  const handleLogout = () => {
    // Remove token and user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Redirect to the main page (header page)
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 className='H1'>To Do List</h1>
          <div className="favicon-container">
            <img
              src="profile-user.png"
              alt="User Icon"
              className="favicon"
              onClick={handleProfileClick} // Toggle email + logout on click
            />
            {showProfileMenu && (
              <div className="profile-menu">
                <p>{userInfo.email}</p> {/* Display the email when clicked */}
                <button className="logout-button" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className='textbox'>
        <textarea
          className='txtip'
          placeholder="Write something here..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} 
        ></textarea>
      </section>

      <div className="button-container">
        <button className='sbtn' onClick={handleSave}>
          Save
        </button>
        <button className='sbtn' onClick={handleMyRecords}>
          My Records
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UserDashboard;
