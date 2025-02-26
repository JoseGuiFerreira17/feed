import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';

interface AuthorProps {
  name: string;
  avatarUrl: string;
  role: string;
}

interface ContentProps {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: AuthorProps;
  content: ContentProps[];
  publishedAt: Date;
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['Post muito bom!', 'Parabéns!']);
  const [commentText, setCommentText] = useState('');

  const publishedFormated = format(
    post.publishedAt,
    "d 'de' LLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedRelativeNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handlerNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('');
    setCommentText(e.target.value);
  }

  function handlerComment(e: FormEvent) {
    e.preventDefault();
    setComments([...comments, commentText]);
    setCommentText('');
  }

  function deleteComment(comment: string) {
    setComments(comments.filter((c) => c !== comment));
  }

  function handleCommentInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity('Por favor, preencha o campo de comentário.');
  }

  const isNewCommentEmpty = commentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.info}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={publishedFormated}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedRelativeNow}
        </time>
      </header>
      <div className={styles.content}>
        {post.content.map((item) => {
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
