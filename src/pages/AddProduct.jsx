import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (productData) => {
    setLoading(true);

    try {
      await productService.createProduct(productData);
      toast.success('Product added successfully');
      navigate('/products');
    } catch (error) {
      toast.error(error?.userMessage || 'Unable to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2>Add Product</h2>
        <ProductForm onSubmit={handleSubmit} submitLabel="Add Product" loading={loading} />
      </div>
    </div>
  );
}

export default AddProduct;
