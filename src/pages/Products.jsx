import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import ProductTable from '../components/ProductTable';
import SortControl from '../components/SortControl';
import { AuthContext } from '../context/AuthContext';
import productService from '../services/productService';

const PAGE_SIZE = 5;

function Products() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ field: 'id', direction: 'asc' });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await productService.getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err?.userMessage || 'Could not load products.';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const items = [...products];

    items.sort((first, second) => {
      const firstValue = first?.[sortConfig.field] ?? 0;
      const secondValue = second?.[sortConfig.field] ?? 0;

      if (typeof firstValue === 'string' && typeof secondValue === 'string') {
        const comparison = firstValue.localeCompare(secondValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      const comparison = Number(firstValue) - Number(secondValue);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    return items;
  }, [products, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return sortedProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedProducts, currentPage]);

  const handleSortChange = (field, directionOverride) => {
    setSortConfig((prev) => ({
      field,
      direction: directionOverride || (prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'),
    }));
    setCurrentPage(1);
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`Are you sure you want to delete this product?`);

    if (!confirmed) {
      return;
    }

    try {
      await productService.deleteProduct(product.id);
      toast.success('Product deleted successfully');
      setProducts((prev) => prev.filter((item) => item.id !== product.id));
      setCurrentPage(1);
    } catch (err) {
      const message = err?.userMessage || 'Unable to delete product';
      toast.error(message);
    }
  };

  if (loading) {
    return <Loading message="Loading products..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <div className="mt-3">
          <button className="btn btn-primary btn-sm" onClick={() => navigate(0)}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2>Products</h2>
        {user?.roles?.includes('ADMIN') && (
          <Link className="btn btn-success" to="/add-product">
            Add Product
          </Link>
        )}
      </div>

      <div className="d-flex justify-content-end mb-3">
        <SortControl sortConfig={sortConfig} onSortChange={handleSortChange} />
      </div>

      <ProductTable products={paginatedProducts} user={user} onDelete={handleDelete} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={PAGE_SIZE}
        totalItems={sortedProducts.length}
        onPageChange={(page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages))}
      />
    </div>
  );
}

export default Products;
