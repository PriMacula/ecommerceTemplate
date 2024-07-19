// src/app/admin/page.js
import { redirect } from 'next/navigation';

const AdminPage = () => {
  // Redirect to the dashboard page
  redirect('/admin/pages/dashboard');

  return null;
};

export default AdminPage;
