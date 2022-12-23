import './App.css';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import NavBar from './components/Navbar.jsx';
import NoMatchPage from './components/NoMatchPage.jsx';
import LoginPage from './components/LoginPage';

const loginPage = '/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={loginPage} />,
  },
  {
    path: loginPage,
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NoMatchPage />,
  },
]);

const App = () => (
  <div className="d-flex flex-column h-100">
    <NavBar />
    <RouterProvider router={router} />
  </div>
);

export default App;
