import React from 'react';
import styles from './UserForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const UserForm = ({ initialUser, onClose }) => { // Added onClose prop
  return (
    <div className={styles.userFormContainer}>
      <div className={styles.closeButtonWrapper}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <h2 className={styles.h2}>User Information</h2>
      <div className={styles.formGroup}>
        <label>Name:</label>
        <p>{initialUser.name || 'N/A'}</p>
      </div>
      <div className={styles.formGroup}>
        <label>Email:</label>
        <p>{initialUser.email || 'N/A'}</p>
      </div>
      <div className={styles.formGroup}>
        <label>Profile Picture:</label>
        {initialUser.profilePic ? (
          <img src={initialUser.profilePic} alt="Profile" className={styles.profilePic} />
        ) : (
          <p>No picture available</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label>Bio:</label>
        <p>{initialUser.bio || 'N/A'}</p>
      </div>
      <div className={styles.formGroup}>
        <label>Status:</label>
        <p>{initialUser.status || 'N/A'}</p>
      </div>
      <div className={styles.formGroup}>
        <label>Banned:</label>
        <p>{initialUser.isBanned ? 'Yes' : 'No'}</p>
      </div>
      <div className={styles.formGroup}>
        <label>Joined At:</label>
        <p>{initialUser.createdAt ? new Date(initialUser.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>
     
    </div>
  );
};

export default UserForm;
