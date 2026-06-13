import { Link, Outlet } from 'react-router-dom';
import { NavigationBar } from '../Navigation/NavigationBar';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo} aria-label="Stargardt Disease Info - Home">
            Stargardt Disease Info
          </Link>
          <NavigationBar />
        </div>
      </header>

      <main className={styles.main} id="main-content">
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>
            &copy; {new Date().getFullYear()} Stargardt Disease Information &amp; Resources.
            This website is for informational purposes only and is not a substitute for
            professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
