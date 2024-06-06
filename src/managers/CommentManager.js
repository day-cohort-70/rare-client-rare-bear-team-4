// CommentManager.js

export const getCommentsByPostId = (postId) => {
  try {
    return fetch(`http://localhost:8088/posts/${postId}/comments`).then(res => res.json());
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
