import {useEffect, useState} from 'react';
import {Brightness6Rounded} from '@material-ui/icons';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Layout.module.css';
import Logo from './Logo';

const Layout = ({children, title = 'Worls Ranks'}) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme')
    );
    setTheme(localStorage.getItem('theme'));
  }, []);

  const switchTheme = () => {
    if (theme === 'light') {
      saveTheme('dark');
    } else {
      saveTheme('light');
    }
  };
  function saveTheme(theme) {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico'></link>
      </Head>

      <header className={styles.header}>
        <Link href='/'>
          <div className={styles.logo}>
            <Logo />
            <button className={styles.switch_theme} onClick={switchTheme}>
              <Brightness6Rounded />
            </button>
          </div>
        </Link>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Redouane@rsmi.com &copy; 2021</footer>
    </div>
  );
};

export default Layout;
