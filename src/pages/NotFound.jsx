import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="card border-secondary shadow-sm">
      <div className="card-body text-center">
        <h2>404 - Page Not Found</h2>
        <p>The page you requested does not exist.</p>
        <Link className="btn btn-primary" to="/products">
          Go to Products
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
