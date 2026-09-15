import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to={user ? '/products' : '/login'}>
          E-Commerce App
        </NavLink>

        <div className="navbar-nav ms-auto d-flex align-items-center gap-2">
          {!user ? (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          ) : (
            <>
              <span className="navbar-text text-light me-2">Welcome, {user.username}</span>

              {user.roles?.includes('ADMIN') ? (
                <>
                  <NavLink className="nav-link" to="/admin">
                    Admin Dashboard
                  </NavLink>
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                  <NavLink className="nav-link" to="/add-product">
                    Add Product
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link" to="/user">
                    User Dashboard
                  </NavLink>
                  <NavLink className="nav-link" to="/products">
                    Products
                  </NavLink>
                </>
              )}

              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
