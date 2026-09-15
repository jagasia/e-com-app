import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2>Welcome {user?.username || 'Admin'}! you are Admin</h2>
        <p className="text-muted">Role: ADMIN</p>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-primary" to="/products">
            Products
          </Link>
          <Link className="btn btn-success" to="/add-product">
            Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
