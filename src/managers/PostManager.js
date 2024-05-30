export const getAllPosts = async () => {
    return await fetch("http://localhost:8088/posts?_expand=user&_expand=category").then(res => res.json())
}

export const postPost = async (post) => {
    return await fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json());
};