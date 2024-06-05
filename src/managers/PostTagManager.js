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

export const getAllPostTags = async () => {
    return await fetch("http://localhost:8088/post-tags").then(res => res.json())
}

export const deletePostTag = async (postTagId) => {
    return await fetch(`http://localhost:8088/post-tags/${postTagId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}