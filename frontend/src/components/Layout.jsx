import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  const handleClick = () => {
    logout()
  }

  return (
    <div className="app-layout">
      <header className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item has-text-weight-bold is-size-4">Bar App UTN</span>
        </div>
        <nav className="navbar-menu">
          <ul className="navbar-start">
            {
              user && <>
                <Link className="navbar-item" to="/dashboard">Dashboard</Link>
                <button onClick={handleClick}>Cerrar sesión</button>
              </>
            }
            {
              !user && <>
                <Link className="navbar-item" to="/login">Login</Link>
                <Link className="navbar-item" to="/register">Register</Link>
              </>
            }
          </ul>
        </nav>
      </header>
      <main className="section">
        <div className="container">{children}</div>
      </main>
      <footer className="footer has-text-centered">
        <p>&copy; {new Date().getFullYear()} Bar App UTN</p>
      </footer>
    </div>
  );
};

export default Layout; 