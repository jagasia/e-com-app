function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-danger" role="alert">
      <div>{message}</div>
      {onRetry && (
        <button className="btn btn-outline-danger btn-sm mt-3" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
