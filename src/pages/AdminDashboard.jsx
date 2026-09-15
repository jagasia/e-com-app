import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2>Welcome Admin</h2>
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
