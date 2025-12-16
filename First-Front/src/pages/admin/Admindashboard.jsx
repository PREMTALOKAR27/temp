import React from 'react';

// Reusable Card component with styles like Recipes page
const Card = ({ title, value }) => (
  <div
    style={{
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      border: '1px solid #EEECE7',
      flex: 1,
      minWidth: 0,
      color: '#1C2C46',
    }}
  >
    <h3 style={{ color: '#5E6C84', marginBottom: 12, fontWeight: '600' }}>{title}</h3>
    <p style={{ color: '#702FB1', fontSize: '28px', fontWeight: '700', margin: 0 }}>{value}</p>
  </div>
);

// Dashboard Page Content styled like Recipes page
const Dashboard = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '32px', backgroundColor: '#F7F6F2', minHeight: '100vh' }}>
      <h2 style={{ color: '#0B1F3A', marginBottom: 32, fontWeight: '700', fontSize: '2.5rem' }}>Dashboard</h2>

      <section style={{ display: 'flex', gap: '24px', marginBottom: 32 }}>
        <Card title="Total Users" value="1,240" />
        <Card title="Properties Listed" value="320" />
        <Card title="Monthly Revenue" value="₹2.5L" />
      </section>

      <section
        style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          border: '1px solid #EEECE7',
          color: '#1C2C46',
        }}
      >
        <h3 style={{ marginBottom: '16px', fontWeight: '600', fontSize: '1.25rem' }}>Recent Activity</h3>
        <ul
          style={{
            color: '#5E6C84',
            listStyleType: 'disc',
            paddingLeft: '24px',
            margin: 0,
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
          <li>User John registered</li>
          <li>Property added in Mumbai</li>
          <li>Monthly report generated</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
