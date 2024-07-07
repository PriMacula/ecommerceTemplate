import React from 'react';
import { FaReact, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftSection}>
        <Link href="/" passHref>
          <div className={styles.logo}>
            <FaReact className={styles.logoIcon} />
            <span>MyLogo</span>
          </div>
        </Link>
        <nav className={styles.nav}>
          <div className={styles.navColumn}>
            <Link href="/category1" passHref>
              <span className={styles.navItem}>Category 1</span>
            </Link>
            <Link href="/category2" passHref>
              <span className={styles.navItem}>Category 2</span>
            </Link>
            <Link href="/category3" passHref>
              <span className={styles.navItem}>Category 3</span>
            </Link>
          </div>
          <div className={styles.navColumn}>
            <Link href="/category4" passHref>
              <span className={styles.navItem}>Category 4</span>
            </Link>
            <Link href="/category5" passHref>
              <span className={styles.navItem}>Category 5</span>
            </Link>
            <Link href="/category6" passHref>
              <span className={styles.navItem}>Category 6</span>
            </Link>
          </div>
        </nav>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.socialIcons}>
          <a href="#" className={styles.icon}><FaFacebook /></a>
          <a href="#" className={styles.icon}><FaTwitter /></a>
          <a href="#" className={styles.icon}><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
