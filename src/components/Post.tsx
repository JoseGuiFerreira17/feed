import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { useState } from 'react';

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(['Post muito bom!', 'Parabéns!']);
  const [commentText, setCommentText] = useState('');

  const publishedFormated = format(publishedAt, "d 'de' LLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handlerNewCommentChange(e) {
    e.target.setCustomValidity('');
    setCommentText(e.target.value);
  }

  function handlerComment(e) {
    e.preventDefault();
    setComments([...comments, commentText]);
    setCommentText('');
  }

  function deleteComment(comment) {
    setComments(comments.filter((c) => c !== comment));
  }

  function handleCommentInvalid(e) {
    e.target.setCustomValidity('Por favor, preencha o campo de comentário.');
  }

  const isNewCommentEmpty = commentText.length === 0;

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
        {content.map((item) => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>;
          }
          if (item.type === 'link') {
            return (
              <p key={item.content}>
                <a href="#">{item.content}</a>
              </p>
            );
          }
          return null;
        })}
      </div>

      <form className={styles.form} onSubmit={handlerComment}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder="Deixe um comentário"
          name="comment"
          value={commentText}
          onChange={handlerNewCommentChange}
          onInvalid={handleCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
