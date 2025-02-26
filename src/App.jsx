import { Post } from './components/Post';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import './global.css';
import styles from './App.module.css';

export function App() {
  const posts = [
    {
      id: 1,
      author: {
        avatarUrl:
          'https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Guilherme',
        role: 'Desenvolvedor Front-end',
      },
      content: [
        {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
          type: 'paragraph',
          content:
            'Vitae cumque nobis cupiditate dolore provident ratione porro rerum aliquid libero voluptas tenetur eius, amet nam soluta tempora quam nesciunt modi reprehenderit!',
        },
        { type: 'link', content: 'guilherme.com/portfolio' },
      ],
      publishedAt: new Date('2025-02-26T12:33:00'),
    },
    {
      id: 2,
      author: {
        avatarUrl:
          'https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=50&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Diego Hernandez',
        role: 'Desenvolvedor Fullstack',
      },
      content: [
        {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
          type: 'paragraph',
          content:
            'Vitae cumque nobis cupiditate dolore provident ratione porro rerum aliquid libero voluptas tenetur eius, amet nam soluta tempora quam nesciunt modi reprehenderit!',
        },
        { type: 'link', content: 'diego.com/portfolio' },
      ],
      publishedAt: new Date('2025-02-26T14:43:00'),
    },
  ];
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}
