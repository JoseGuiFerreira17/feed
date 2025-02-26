import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment.';
import styles from './Post.module.css';

export function Post({ author, content, publishedAt }) {
  const publishedFormated = format(publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.info}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedFormated} dateTime={publishedAt.toISOString()}>
          {publishedRelativeNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((item, index) => {
          if (item.type === 'paragraph') {
            return <p key={index}>{item.content}</p>;
          }
          if (item.type === 'link') {
            return (
              <p key={index}>
                <a href="#">{item.content}</a>
              </p>
            );
          }
          return null;
        })}
      </div>

      <form className={styles.form}>
        <strong>Deixe seu feedback</strong>
        <textarea placeholder="Deixe um comentário" />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
