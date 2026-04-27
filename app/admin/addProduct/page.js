'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../adminComp/adminHeader';
import {  addProduct, getCollection } from '@/app/services/userService'; // ✅ service import

export default function AddProduct() {
  const router = useRouter();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    discountedPrice: '',
    originalPrice: '',
    category: '',
    shortDescription: '',
    stock: '',
    description: '',
    feature: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

 useEffect(() => {
  const fetchCollections = async () => {
    try {
      const res = await getCollection();
        console.log(res.data.data)

      if (res.data.success) {
        setCollections(res.data.data); // array of { _id, name, image }
      }
    } catch (err) {
      alert("Error fetching collections");
      console.log(err.message);
    }
  };
  fetchCollections();
}, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare arrays
    const descriptionArray = formData.description.split(',').map(s => s.trim()).filter(s => s);
    const featureArray = formData.feature.split(',').map(s => s.trim()).filter(s => s);

    // Create FormData (always use FormData, even without image)
    const formDataToSend = new FormData();
    
    // Add image if exists
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }
    
    // Add all text fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('discountedPrice', formData.discountedPrice);
    formDataToSend.append('originalPrice', formData.originalPrice);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('shortDescription', formData.shortDescription);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('description', JSON.stringify(descriptionArray));
    formDataToSend.append('feature', JSON.stringify(featureArray));

    try {
     
      const res = await addProduct(formDataToSend);
      
      // Assuming backend returns { success: true, data: product }
      if (res.data.success) {
        alert('Product added successfully!');
        router.push("/admin/adminProduct");
      } else {
        alert(res.data.message || 'Failed to add product');
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  console.log("colllecfsf",collections)

  return (
    <>
      <AdminHeader />
      <div className="p-6 flex flex-col justify-center items-center md:ml-[250px]">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Discounted Price *</label>
              <input type="number" name="discountedPrice" value={formData.discountedPrice} onChange={handleChange} required className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Original Price</label>
              <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
  <div>
  <label className="block text-sm font-medium mb-1">Category *</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    className="w-full border p-2 rounded"
    required
  >
    <option value="">Select a category</option>
      
    {collections.map((col) => (
     <option key={col._id} value={col.name}>
  {col.name}
</option>
    ))}
  </select>
</div>
            <div>
              <label className="block text-sm font-medium mb-1">Stock *</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Short Description</label>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2} className="w-full border p-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description (comma separated)</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="e.g. High quality, Durable, Lightweight" className="w-full border p-2 rounded" />
              <p className="text-xs text-gray-500 mt-1">Multiple descriptions separated by commas</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
              <textarea name="feature" value={formData.feature} onChange={handleChange} rows={3} placeholder="e.g. Stainless steel, 1.4L capacity, Easy to clean" className="w-full border p-2 rounded" />
              <p className="text-xs text-gray-500 mt-1">Each feature separated by comma</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded border" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={() => router.push('/admin/products')} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}