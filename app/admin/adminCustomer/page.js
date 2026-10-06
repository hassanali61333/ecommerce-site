'use client';
import { useEffect, useState } from 'react';
import { getUser } from '@/app/services/userService'; 
import AdminHeader from '../adminComp/adminHeader';
import { deleteUser } from '@/app/services/userService';
export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  

  const fetchCustomers = async () => {
    try {
      const res = await getUser();
      console.log(res)
      if (res.data.success) {
        setCustomers(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    toast.info(`Change role of ${id} to ${newRole}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;

    try{

      const resp= await deleteUser(id)
          toast.success(`Delete user ${id}`);
          fetchCustomers()
    }
    catch (Error) {
      toast.error("error check console")
      console.log(Error)
    }

  };

  if (loading) return <div className="p-6 text-center">Loading customers...</div>;
  if (error) return <div className="text-red-500 p-6">Error: {error}</div>;

  return (
    <>
  <AdminHeader/>
    <div className="p-6 md:ml-[250px]">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{user._id.slice(-6)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                {user.role}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
             
            ))}
            {customers.length === 0 && (
              <tr><td colSpan="5" className="text-center py-8 text-gray-500">No customers found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

      </>
  );
}