import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import productService from '../services/productService';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const response = await productService.getProductById(id);
        setProduct(response);
      } catch (error) {
        const message = error?.userMessage || 'Failed to load product details.';
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (!product) {
    return (
      <div className="alert alert-warning">
        Product not found.
        <div className="mt-3">
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2>Product Details</h2>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item"><strong>ID:</strong> {product.id}</li>
          <li className="list-group-item"><strong>Name:</strong> {product.name}</li>
          <li className="list-group-item"><strong>Category:</strong> {product.category}</li>
          <li className="list-group-item"><strong>Price:</strong> ${Number(product.price ?? 0).toFixed(2)}</li>
        </ul>

        <Link className="btn btn-primary" to="/products">
          Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
