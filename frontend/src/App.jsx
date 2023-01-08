import {
  createBrowserRouter, RouterProvider,
} from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './contexts/index.jsx';

import ChatRoutes from './components/Chat.jsx';
import NavBar from './components/Navbar.jsx';
import NoFoundPage from './components/NoFoundPage.jsx';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage.jsx';
import routes from './routes.js';

const router = createBrowserRouter([
  {
    path: routes.chatPagePath(),
    element: <ChatRoutes />,
  },
  {
    path: routes.loginPagePath(),
    element: <LoginPage />,
  },
  {
    path: routes.signUpPagePath(),
    element: <SignUpPage />,
  },
  {
    path: routes.noMatchPagePath(),
    element: <NoFoundPage />,
  },
]);
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

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
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
    </AuthProvider>
  </div>
);

export default App;
