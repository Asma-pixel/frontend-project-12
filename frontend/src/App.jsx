import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import { useState } from 'react';
import { AuthContext, ApiContext } from './contexts/index.jsx';

import ChatRoutes from './components/Chat.jsx';
import NavBar from './components/Navbar.jsx';
import NoMatchPage from './components/NoMatchPage.jsx';
import LoginPage from './components/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatRoutes />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NoMatchPage />,
  },
]);

const ApiProvider = ({ children, socket }) => {
  const addMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      console.log(response);
    });
  };
  const addChannel = (channel, cb) => {
    socket.emit('newChannel', channel, cb);
  };
  const renameChannel = (channel, cb) => {
    socket.emit('renameChannel', channel, cb);
  };
  const removeChannel = (id) => {
    socket.emit('removeChannel', id, (response) => {
      console.log(response);
    });
  };
  return (
    <ApiContext.Provider value={{
      addMessage,
      addChannel,
      renameChannel,
      removeChannel,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
};
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { username: user.username, token: user.token };
  };
  // const loginInfo = useMemo(() => ({ loggedIn, logIn, logOut }), []);
  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const App = ({ socket }) => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <ApiProvider socket={socket}>
        <NavBar />
        <RouterProvider router={router} />
      </ApiProvider>
    </AuthProvider>
  </div>
);

export default App;
