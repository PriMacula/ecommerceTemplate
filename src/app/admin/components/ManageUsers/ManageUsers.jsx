"use client";

import React, { useState, useEffect } from 'react';
import UserList from '../UserList/UserList';
import UserForm from '../UserForm/UserForm'; // Assume you have a UserForm component
import styles from './ManageUsers.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/User/getUsers');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (user) => {
    setEditingUser(user);
    setIsFormVisible(true);
  };

  const handleDelete = async (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`/api/User/deleteUser?id=${userId}`, { method: 'DELETE' });
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleBan = async (userId) => {
    try {
      await fetch(`/api/User/banUser?id=${userId}`, { method: 'PUT' });
      setUsers(users.map((user) => user._id === userId ? { ...user, isBanned: true } : user));
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleUnban = async (userId) => {
    try {
      await fetch(`/api/User/unbanUser?id=${userId}`, { method: 'PUT' });
      setUsers(users.map((user) => user._id === userId ? { ...user, isBanned: false } : user));
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  const handleSave = async (user) => {
    if (user._id) {
      try {
        const response = await fetch(`/api/User/updateUser?id=${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const updatedUser = await response.json();
        setUsers(users.map((u) => (u._id === updatedUser.user._id ? updatedUser.user : u)));
        setEditingUser(null);
        setIsFormVisible(false);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      // Handle adding a new user if needed
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.manageUsers}>
      <div className={styles.topBar}>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search for a user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
       
      </div>
      <UserList users={filteredUsers} onView={handleView} onDelete={handleDelete} onBan={handleBan} onUnban={handleUnban} />
      {isFormVisible && (
        <div className={styles.formOverlay}>
          <UserForm
            initialUser={editingUser}
            onClose={() => setIsFormVisible(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
