export const getPostByPostId = (postId) => {
    return fetch(`http://localhost:8088/posts?id=${postId}`).then((res) => res.json())
}
