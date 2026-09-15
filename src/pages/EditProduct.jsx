import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';
import Loading from '../components/Loading';
import productService from '../services/productService';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error(error?.userMessage || 'Unable to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (productData) => {
    setSaving(true);

    try {
      await productService.updateProduct(id, productData);
      toast.success('Product updated successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error?.userMessage || 'Unable to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading message="Loading product for editing..." />;
  }

  if (!product) {
    return <div className="alert alert-warning">Product not found.</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2>Edit Product</h2>
        <ProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          submitLabel="Update Product"
          loading={saving}
        />
      </div>
    </div>
  );
}

export default EditProduct;
