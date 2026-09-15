import { Link } from 'react-router-dom';

function ServerError() {
  return (
    <div className="card border-warning shadow-sm">
      <div className="card-body text-center">
        <h2 className="text-warning">Server Error</h2>
        <p>The server is currently unavailable or returned an unexpected error.</p>
        <Link className="btn btn-primary" to="/products">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default ServerError;
