import { useState } from 'react';
import { productsApi } from '../../api/products';
import useAsync from '../../hooks/useAsync';
import { Loading, EmptyState, Notice } from '../../components/UIState';
import ConfirmDelete from '../../components/ConfirmDelete';

const empty = {
  productID: '',
  productName: '',
  category: '',
  price: '',
  quantityInStock: '',
  lowStockThreshold: '',
  unitOfMeasure: '',
  supplier: '',
  description: '',
};

const AdminProducts = () => {
  const { data, loading, error, reload } = useAsync(() => productsApi.getAll(), []);
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      await productsApi.create({
        ...form,
        productID: Number(form.productID) || 0,
        price: Number(form.price) || 0,
        quantityInStock: Number(form.quantityInStock) || 0,
        lowStockThreshold: Number(form.lowStockThreshold) || 0,
      });
      setNotice({ ok: true, message: `Added ${form.productName}.` });
      setForm(empty);
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (productID) => {
    try {
      await productsApi.remove(productID);
      reload();
    } catch (err) {
      setNotice({ ok: false, message: err.message });
    }
  };

  return (
    <div className="admin-panel">
      <form className="card admin-form" onSubmit={handleSubmit}>
        <h3>Add a product</h3>
        <Notice type={notice?.ok ? 'success' : 'error'}>{notice?.message}</Notice>

        <div className="form-row">
          <div className="field">
            <label htmlFor="productID">Product ID (number)</label>
            <input id="productID" type="number" name="productID" value={form.productID} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="productName">Name</label>
            <input id="productName" name="productName" value={form.productName} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="category">Category</label>
            <input id="category" name="category" value={form.category} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="price">Price (R)</label>
            <input id="price" type="number" min="0" step="0.01" name="price" value={form.price} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="quantityInStock">Quantity in stock</label>
            <input id="quantityInStock" type="number" min="0" name="quantityInStock" value={form.quantityInStock} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="lowStockThreshold">Low-stock threshold</label>
            <input id="lowStockThreshold" type="number" min="0" name="lowStockThreshold" value={form.lowStockThreshold} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="unitOfMeasure">Unit of measure</label>
            <input id="unitOfMeasure" name="unitOfMeasure" value={form.unitOfMeasure} onChange={handleChange} placeholder="bottle, tube, pack…" required />
          </div>
          <div className="field">
            <label htmlFor="supplier">Supplier</label>
            <input id="supplier" name="supplier" value={form.supplier} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} required />
        </div>

        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Adding…' : 'Add product'}
        </button>
      </form>

      <div className="admin-list">
        <h3>Current stock ({data?.length ?? 0})</h3>
        {loading && <Loading label="Loading products…" />}
        {error && <Notice type="error">{error.message}</Notice>}
        {!loading && data && data.length === 0 && <EmptyState title="No products yet" />}
        {!loading && data && data.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th /></tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.productID}>
                  <td>{p.productName}</td>
                  <td>{p.category}</td>
                  <td>R{p.price}</td>
                  <td>{p.quantityInStock}</td>
                  <td><ConfirmDelete onConfirm={() => handleDelete(p.productID)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
