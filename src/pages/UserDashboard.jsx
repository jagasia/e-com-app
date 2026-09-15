import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function UserDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2>Welcome, {user?.username || 'User'}</h2>
        <p className="text-muted">Role: {user?.roles?.join(', ') || 'USER'}</p>
        <Link className="btn btn-primary" to="/products">
          Go to Products
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;
