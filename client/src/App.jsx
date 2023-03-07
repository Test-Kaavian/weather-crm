import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/loginPage/login';
import LogOut from './pages/Logout';
import Userinfo from './pages/Userinfo';
import Search from './pages/alertdisplay';
import Settings from './components/Settings';
import Admin from './pages/admin/nav-foot';

// eslint-disable-next-line react/prop-types
function UserSessionRoute({ element: Component, ...rest }) {
  const doesUserHaveSession = localStorage.getItem('token');
  return doesUserHaveSession ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserSessionRoute element={Admin} />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Userinfo" element={<Userinfo />} />
          <Route path="/Logs" element={<Search />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Logout" element={<LogOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
