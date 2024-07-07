// components/SocialMedia.js

import React from 'react';
import Link from 'next/link';
import styles from './SocialMedia.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Find Us On</h2>
      <div className={styles.wrapper}>
        <div className={styles.button}>
          <Link href="https://www.facebook.com/" passHref>
            <div className={styles.icon}>
              <FaFacebookF />
            </div>
            <span>Facebook</span>
          </Link>
        </div>
        <div className={styles.button}>
          <Link href="https://twitter.com/" passHref>
            <div className={styles.icon}>
              <FaTwitter />
            </div>
            <span>Twitter</span>
          </Link>
        </div>
        <div className={styles.button}>
          <Link href="https://www.instagram.com/" passHref>
            <div className={styles.icon}>
              <FaInstagram />
            </div>
            <span>Instagram</span>
          </Link>
        </div>
        <div className={styles.button}>
          <Link href="https://github.com/" passHref>
            <div className={styles.icon}>
              <FaGithub />
            </div>
            <span>Github</span>
          </Link>
        </div>
        <div className={styles.button}>
          <Link href="https://www.youtube.com/" passHref>
            <div className={styles.icon}>
              <FaYoutube />
            </div>
            <span>YouTube</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
