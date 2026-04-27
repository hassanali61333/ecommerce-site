// app/admin/products/page.js
'use client';
import { useEffect, useState } from 'react';
import { getProduct, updateProduct, deleteProduct } from '@/app/services/userService';
import AdminHeader from '../adminComp/adminHeader';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    discountedPrice: '',
    originalPrice: '',
    category: '',        
    description: '',       
    stock: '',
    shortDescription: '',
    feature: '',
  });


  useEffect(() => {
    fetchProducts();
  }, []);   

  const fetchProducts = async () => {
    try {
      const res = await getProduct();
      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal and populate form
  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name || '',
      discountedPrice: product.discountedPrice || '',
      originalPrice: product.originalPrice || '',
      category: product.category || '',
      description: Array.isArray(product.description)
        ? product.description.join(', ')
        : (product.description || ''),
      stock: product.stock || '',
      shortDescription: product.shortDescription || '',
      feature: Array.isArray(product.feature)
        ? product.feature.join(', ')
        : (product.feature || ''),
    });
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Convert comma-separated strings back to arrays
      const descriptionArray = editForm.description
        .split(',')
        .map(s => s.trim())
        .filter(s => s);
      const featureArray = editForm.feature
        .split(',')
        .map(s => s.trim())
        .filter(s => s);

      const updateData = {
        name: editForm.name,
        discountedPrice: Number(editForm.discountedPrice),
        originalPrice: Number(editForm.originalPrice),
        category: editForm.category,
        description: descriptionArray,
        stock: Number(editForm.stock),
        shortDescription: editForm.shortDescription,
        feature: featureArray,
      };

     const resp= await updateProduct(editingProduct._id, updateData);
      alert('Product updated successfully');
      setEditingProduct(null);
      fetchProducts(); 
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      alert('Product deleted successfully');
      fetchProducts(); // refresh list
    } catch (err) {
      alert('Error deleting product. Check console.');
      console.log(err);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading products...</div>;
  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;

  return (
    <>
      <AdminHeader />
      <div className="p-6 md:ml-[250px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
    
    
         
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={product.image || '/placeholder.png'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Rs. {product.discountedPrice}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form>
              <input
                name="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Product Name"
                required
              />
              <input
                name="discountedPrice"
                type="number"
                value={editForm.discountedPrice}
                onChange={(e) => setEditForm({ ...editForm, discountedPrice: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Discounted Price"
                required
              />
              <input
                name="originalPrice"
                type="number"
                value={editForm.originalPrice}
                onChange={(e) => setEditForm({ ...editForm, originalPrice: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Original Price"
              />
              <input
                name="category"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Category"
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Description (comma separated)"
                rows="2"
              />
              <input
                name="stock"
                type="number"
                value={editForm.stock}
                onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Stock"
                required
              />
              <input
                name="shortDescription"
                value={editForm.shortDescription}
                onChange={(e) => setEditForm({ ...editForm, shortDescription: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Short Description"
              />
              <input
                name="feature"
                value={editForm.feature}
                onChange={(e) => setEditForm({ ...editForm, feature: e.target.value })}
                className="w-full border p-2 mb-2 rounded"
                placeholder="Features (comma separated)"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button onClick={handleUpdate} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}