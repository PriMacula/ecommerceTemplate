import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faBan, faUnban } from '@fortawesome/free-solid-svg-icons';
import styles from './UserList.module.css';

const UserList = ({ users, onView, onDelete, onBan, onUnban }) => {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <div key={user._id} className={styles.userItem}>
          <div className={styles.userInfo}>
            <span>{user.name}</span>
            <span className={styles.status}>{user.status}</span>
            <span className={styles.isBanned}>{user.isBanned ? 'Banned' : 'Active'}</span>
          </div>
          <div className={styles.userActions}>
            <button onClick={() => onView(user)}>
              <FontAwesomeIcon icon={faEye} /> View
            </button>
            <button onClick={() => onDelete(user._id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            {user.isBanned ? (
              <button onClick={() => onUnban(user._id)}>
                <FontAwesomeIcon icon={faUnban} /> Unban
              </button>
            ) : (
              <button onClick={() => onBan(user._id)}>
                <FontAwesomeIcon icon={faBan} /> Ban
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
