export const postNewPostTag = async (postTagData) => {
    return await fetch("http://localhost:8088/post-tags", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(postTagData)
    })
}

export const getPostPostTags = async (postId) => {
    return await fetch(`http://localhost:8088/post-tags/${postId}?_expand=tag`).then(res => res.json())
}