function Pagination({ currentPage, totalPages, onPageChange, pageSize, totalItems }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-3">
      <div className="text-muted small">
        Showing {Math.min((currentPage - 1) * pageSize + 1, totalItems)} -{' '}
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
      </div>

      <nav aria-label="Pagination navigation">
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </li>

          {pages.map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
