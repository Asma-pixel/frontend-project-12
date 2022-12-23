const NavBar = () => {
  const a = 'Hexlet Chat';

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          { a }
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
