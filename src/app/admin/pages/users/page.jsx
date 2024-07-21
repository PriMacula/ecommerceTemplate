// /app/admin/pages/users/page.jsx
import React from 'react';
import Layout from '../../layout';
import ManageUsers from '../../components/ManageUsers/ManageUsers';

const UsersPage = () => {
  return (
    <>
        <main>
      <h1>Manage Users</h1>
      <ManageUsers/>
      </main>
    </>
  );
};

export default UsersPage;
