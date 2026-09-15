import { Link } from 'react-router-dom';

function ProductTable({ products, user, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id ?? `${product.name}-${product.category}`}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{Number(product.price ?? 0).toFixed(2)}</td>
                <td>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link className="btn btn-sm btn-outline-primary" to={`/products/${product.id}`}>
                      View
                    </Link>

                    {user?.roles?.includes('ADMIN') && (
                      <>
                        <Link className="btn btn-sm btn-outline-warning" to={`/edit-product/${product.id}`}>
                          Edit
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(product)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
