export const getAllPosts = async () => {
    return await fetch("http://localhost:8088/posts?_expand=user&_expand=category").then(res => res.json())
}