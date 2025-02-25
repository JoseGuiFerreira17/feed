import { Post } from './Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import './global.css';
import styles from './App.module.css';

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Post author="Guilherme" content="Texto desse post" />
          <Post author="Guilherme" content="Texto desse post" />
        </main>
      </div>
    </>
  );
}
