
import { doGetOne } from "./AUTHBOSS";

export const getCommentsByPostId = async (postId) => {
  try {
    const url = `http://localhost:8088/posts/${postId}/comments`
    return await doGetOne(url)
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
