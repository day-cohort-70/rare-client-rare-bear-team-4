import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../managers/CommentManager";
import styles from './PostComments.module.css'; // Import the CSS module
import { getPostByPostId } from "../../managers/PostManager.js";

export const CommentsList = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    getCommentsByPostId(postId).then(setComments);
  }, [postId]);

  useEffect(() => {
    getPostByPostId(postId).then((data) => {
        setPost(data);
    });
  }, [postId]);

  return (
    <div className={styles.container}>
      <h2>{post?.title}</h2>
      <h2 className={styles.postTitle}>Post Title</h2>
      <a href={`/posts/${postId}`} className={styles.backLink}>Back to Post</a>
      {comments.map(comment => (
        <div key={comment.id} className={styles.commentCard}>
          <strong className={styles.commentSubject}>{comment.subject}</strong>
          <p className={styles.commentUsername}>{comment.username}</p>
          <p className={styles.commentContent}>{comment.content}</p>
          <small className={styles.commentCreationDate}>{comment.creation_date}</small>
        </div>
      ))}
    </div>
  );
};
