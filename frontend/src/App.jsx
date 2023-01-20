import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
} from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './contexts/index.jsx';

import ChatPage from './components/ChatPage.jsx';
import NavBar from './components/Navbar.jsx';
import NoFoundPage from './components/NoFoundPage.jsx';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage.jsx';
import routes from './routes.js';
import { useAuth } from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userFromLocalStorage || null);
  const logIn = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };
  const logOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  // const loginInfo = useMemo(() => ({ loggedIn, logIn, logOut }), []);
  return (
    <AuthContext.Provider value={{
      logIn,
      logOut,
      user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const PrivateOutlet = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};
const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route
            path={routes.chatPagePath()}
            element={<PrivateOutlet />}
          >
            <Route
              path=""
              element={<ChatPage />}
            />
          </Route>
          <Route
            path={routes.loginPagePath()}
            element={<LoginPage />}
          />
          <Route
            path={routes.signUpPagePath()}
            element={<SignUpPage />}
          />
          <Route
            path={routes.noMatchPagePath()}
            element={<NoFoundPage />}
          />
        </Routes>
      </BrowserRouter>

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
        theme="light"
      />
    </AuthProvider>
  </div>
);

export default App;
