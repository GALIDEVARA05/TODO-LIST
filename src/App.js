import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './pages/header/Header';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import Dashboard from './pages/dasboard/Dashboard';
import UserDashboard from './pages/auth/userdasboard/UserDashboard';
import TodoList from './pages/auth/TodoList/TodoList';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/userdashboard','/todolist']; // Paths where the header should be hidden

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/header" element={<Header/>}/>
      </Routes>
    </>
  );
}

export default App;
