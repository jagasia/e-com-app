function Loading({ message = 'Loading...' }) {
  return (
    <div className="text-center py-4" aria-live="polite">
      <div className="spinner-border text-primary" role="status" aria-label="Loading">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 mb-0">{message}</p>
    </div>
  );
}

export default Loading;
