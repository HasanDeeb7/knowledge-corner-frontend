import React from 'react';
import styles from './AdminNotFound.module.css';

function NotAuthorised() {
  return (
    <div className={styles.adminNotFound}>
      <div className={styles.errorMessage}>
        oh NO ! You are not authorised here..
      </div>
      <div className={styles.sadEmoji}>😞</div>
    </div>
  );
}

export default NotAuthorised;
