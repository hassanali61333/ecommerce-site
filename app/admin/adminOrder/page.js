// app/admin/orders/page.js
'use client';
import { useEffect, useState } from 'react';
import { allOrder, updateOrder } from '@/app/services/userService'; // import updateOrder
import AdminHeader from '../adminComp/adminHeader';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editForm, setEditForm] = useState({
    fullname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalcode: '',
    ordernotes: '',
    status: 'pending'
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await allOrder();
      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id,order) => {
    setEditingOrder(order);
    setEditForm({
      fullname: order.fullname || '',
      phone: order.phone || '',
      email: order.email || '',
      address: order.address || '',
      city: order.city || '',
      postalcode: order.postalcode || '',
      ordernotes: order.ordernotes || '',
      status: order.status || 'pending'
    });
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
     await updateOrder(editingOrder._id, editForm);
      alert('Order updated successfully');
      setEditingOrder(null);
      fetchOrders(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="text-center p-8">Loading orders...</div>;
  if (error) return <div className="text-red-500 p-8">Error: {error}</div>;

  return (
    <>
      <AdminHeader />
      <div className="p-6 md:ml-[250px]">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.fullname}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Rs. {order.totalAmount}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                      ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => setSelectedOrder(order)} className="text-blue-600 hover:text-blue-800">
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => handleEdit(order._id,order)} className="text-green-600 hover:text-green-800 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="7" className="text-center py-8 text-gray-500">No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              <div><strong>Order ID:</strong> {selectedOrder._id}</div>
              <div><strong>Customer Name:</strong> {selectedOrder.fullname}</div>
              <div><strong>Email:</strong> {selectedOrder.email}</div>
              <div><strong>Phone:</strong> {selectedOrder.phone}</div>
              <div><strong>Address:</strong> {selectedOrder.address}</div>
              <div><strong>City:</strong> {selectedOrder.city}</div>
              <div><strong>Postal Code:</strong> {selectedOrder.postalcode}</div>
              <div><strong>Total Amount:</strong> Rs. {selectedOrder.totalAmount}</div>
              <div><strong>Status:</strong> {selectedOrder.status}</div>
              <div><strong>Order Notes:</strong> {selectedOrder.ordernotes || 'N/A'}</div>
              <div><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
              <div><strong>Items:</strong>
                <ul className="list-disc pl-5 mt-1">
                  {selectedOrder.items?.map((item, idx) => (
                    <li key={idx}>{item.name} – Qty: {item.quantity} – Price: Rs. {item.price} – Total: Rs. {item.total}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold">Edit Order</h2>
              <button onClick={() => setEditingOrder(null)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
            </div>
            <form onSubmit={handleUpdateOrder} className="p-4 space-y-3">
              <input name="fullname" value={editForm.fullname} onChange={(e) => setEditForm({...editForm, fullname: e.target.value})} className="w-full border p-2 rounded" placeholder="Full Name" required />
              <input name="phone" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full border p-2 rounded" placeholder="Phone" required />
              <input name="email" type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="w-full border p-2 rounded" placeholder="Email" required />
              <input name="address" value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} className="w-full border p-2 rounded" placeholder="Address" required />
              <input name="city" value={editForm.city} onChange={(e) => setEditForm({...editForm, city: e.target.value})} className="w-full border p-2 rounded" placeholder="City" required />
              <input name="postalcode" value={editForm.postalcode} onChange={(e) => setEditForm({...editForm, postalcode: e.target.value})} className="w-full border p-2 rounded" placeholder="Postal Code" />
              <textarea name="ordernotes" value={editForm.ordernotes} onChange={(e) => setEditForm({...editForm, ordernotes: e.target.value})} rows="2" className="w-full border p-2 rounded" placeholder="Order Notes" />
              <select name="status" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})} className="w-full border p-2 rounded">
                <option value="pending">pending</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
              </select>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingOrder(null)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}