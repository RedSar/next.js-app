import Head from 'next/head';
import Link from 'next/link';
import styles from './Layout.module.css';
import Logo from './Logo';

const Layout = ({ children, title = 'Worls Ranks' }) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico'></link>
    </Head>

    <header className={styles.header}>
      <Link href='/'>
        <div className={styles.logo}>
          <Logo />
        </div>
      </Link>
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>Redouane@rsmi.com &copy; 2021</footer>
  </div>
);

export default Layout;
