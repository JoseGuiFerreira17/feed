import { Post } from './Post';
import { Header } from './components/Header';
import './global.css';

export function App() {
  return (
    <>
      <Header />
      <Post author="Guilherme" content="Texto desse post" />
    </>
  );
}
