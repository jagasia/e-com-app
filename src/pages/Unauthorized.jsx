import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="card border-danger shadow-sm">
      <div className="card-body text-center">
        <h2 className="text-danger">Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
        <Link className="btn btn-primary" to="/products">
          Go to Products
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
