import { useEffect, useState } from 'react';

function ProductForm({ initialValues, onSubmit, submitLabel, loading }) {
  const isEditMode = Boolean(initialValues && initialValues.id);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        id: initialValues.id ?? '',
        name: initialValues.name || '',
        category: initialValues.category || '',
        price: initialValues.price ?? '',
      });
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const productPayload = {
      ...formData,
      id: formData.id === '' ? undefined : Number(formData.id),
      price: Number(formData.price),
    };

    onSubmit(productPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">ID</label>
        <input
          type="number"
          className="form-control"
          name="id"
          value={formData.id}
          onChange={handleChange}
          min="1"
          required={!isEditMode}
          readOnly={isEditMode}
          disabled={isEditMode}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Category</label>
        <input
          type="text"
          className="form-control"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
