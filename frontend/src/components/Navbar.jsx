import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

const NavBar = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const logOut = () => {
    auth.logOut();
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          { t('navBar.title') }
        </a>
        { auth.loggedIn && <Button onClick={logOut}>{ t('navBar.logoutBtn') }</Button>}
      </div>
    </nav>
  );
};

export default NavBar;
