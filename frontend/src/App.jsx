import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext, ApiContext } from './contexts/index.jsx';

import ChatRoutes from './components/Chat.jsx';
import NavBar from './components/Navbar.jsx';
import NoFoundPage from './components/NoFoundPage.jsx';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage.jsx';

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
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '*',
    element: <NoFoundPage />,
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
  const removeChannel = (id, cb) => {
    socket.emit('removeChannel', id, cb);
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
  const logIn = (data = null) => {
    setLoggedIn(true);
    if (data === null) return;
    localStorage.setItem('user', data);
  };
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
      loggedIn,
      logIn,
      logOut,
      getUser,
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
        <ToastContainer
          autoClose={5000}
          closeOnClick
          draggable
          draggableDirection="x"
          draggablePercent={80}
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position="top-right"
          role="alert"
          rtl={false}
          theme="light  "
        />
      </ApiProvider>
    </AuthProvider>
  </div>
);

export default App;
