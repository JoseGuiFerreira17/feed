import styles from './Header.module.css';
import Logo from '../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} className={styles.logo} alt="Logo" />
      <strong>Feed</strong>
    </header>
  );
}
