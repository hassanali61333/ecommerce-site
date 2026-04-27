// app/admin/page.js
'use client';
import { useEffect, useState } from 'react';
import { allOrder,getProduct } from '@/app/services/userService'; // adjust path if needed
import AdminHeader from './adminComp/adminHeader';
export default function Dashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalproduct,settotalproduct]=useState(0)


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getProduct();
console.log(totalproduct)
    if(response.data.success){
        settotalproduct(response.data.data)
    }
    } catch (err) {
      alert(err);
    }
  };
  fetchProducts();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await allOrder();
        if (res.data.success) {
          const orders = res.data.data;
          setRecentOrders(orders.slice(-5).reverse()); 
          const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount), 0);
          setStats({
            orders: orders.length,
            revenue: totalRevenue,
          });
        } else {
          console.error(res.data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  return (
    <>
<AdminHeader/>
    <div className="p-6 md:ml-[250px]">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-3xl">📦</div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold">{stats.orders}</p>
          </div>
        </div>
           <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-3xl">🛍️</div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-2xl font-bold">{totalproduct.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="text-3xl">💰</div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold">Rs. {stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
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
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}
