import { doPost } from "./AUTHBOSS"

export const postNewPostTag = async (postTagData) => {
    const url ="http://localhost:8088/post-tags"
    return await doPost(url, postTagData)
}

export const getPostPostTags = async (postId) => {
    return await fetch(`http://localhost:8088/post-tags?_postId=${postId}&_expand=tag`).then(res => res.json())
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