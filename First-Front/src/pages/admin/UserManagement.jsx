import React, { useEffect, useState } from 'react';
import api from '../../config/AxiosInterceptor';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // helper for missing/null values
  const displayOrDash = (value) => (value ? value : '–');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('https://first-buy.in/api/v1/users/all');
      const data = Array.isArray(res?.data) ? res.data : [];
      setUsers(data);
    } catch (e) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (userId) => {
    if (!userId) return;
    try {
      await api.delete(`https://first-buy.in/api/v1/users/${userId}`);
      setUsers((prev) => prev.filter((u) => (u.id || u._id) !== userId));
      toast.success('User removed successfully');
    } catch (e) {
      toast.error('Failed to remove user');
      // fallback: refetch if optimistic update fails
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '32px', backgroundColor: '#F7F6F2', minHeight: '100vh' }}>
      <h2 style={{ color: '#0B1F3A', marginBottom: 32, fontWeight: '700', fontSize: '2.5rem' }}>User Management</h2>

      <section
        style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          border: '1px solid #EEECE7',
          overflowX: 'auto',
          position: 'relative',
        }}
      >
        {/* Spinner overlay + skeleton loader */}
        {loading && (
          <>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  `@keyframes adminShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}@keyframes adminSpin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}`,
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <div style={{ width: 44, height: 44, border: '4px solid #eaeaea', borderTopColor: '#632F97', borderRadius: '50%', animation: 'adminSpin 0.9s linear infinite' }} />
            </div>
            <div style={{ padding: '8px 0 16px 0' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  {[...Array(9)].map((__, j) => (
                    <div
                      key={j}
                      style={{
                        height: 14,
                        borderRadius: 6,
                        backgroundImage: 'linear-gradient(90deg, #eee 0%, #f5f5f5 50%, #eee 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'adminShimmer 1.2s linear infinite',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
        {error && (
          <div style={{ padding: '12px', color: '#d32f2f' }}>{error}</div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#5E6C84', fontWeight: '600', fontSize: '1rem' }}>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>Phone</th>
              <th style={{ padding: '12px' }}>Join Date</th>
              <th style={{ padding: '12px' }}>Last Login</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Points</th>
              <th style={{ padding: '12px' }}>Role</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ padding: '16px', textAlign: 'center', color: '#999' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users?.map((user) => (
                <tr key={user.id || user._id} style={{ borderTop: '1px solid #EEECE7', color: '#1C2C46' }}>
                  <td style={{ padding: '12px' }}>{displayOrDash(user.name)}</td>
                  <td style={{ padding: '12px' }}>{displayOrDash(user.email)}</td>
                  <td style={{ padding: '12px' }}>{displayOrDash(user.phoneNumber)}</td>
                  <td style={{ padding: '12px' }}>{displayOrDash(user.createdAt)}</td>
                  <td style={{ padding: '12px' }}>{displayOrDash(user.lastLogin)}</td>
                  <td style={{ padding: '12px' }}>{user.isActive ? 'Active' : 'Inactive'}</td>
                  <td style={{ padding: '12px', color: '#702FB1', fontWeight: '700' }}>
                    {user.pointsBalance}
                  </td>
                  <td style={{ padding: '12px' }}>{displayOrDash(user.role)}</td>
                  <td style={{ padding: '12px' }}>
                     <button
                      onClick={() => handleRemove(user.id || user._id)}
                      style={{
                         backgroundColor: '#702FB1',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserManagement;
