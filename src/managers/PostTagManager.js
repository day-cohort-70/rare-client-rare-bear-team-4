import { doDelete, doGet, doPost } from "./AUTHBOSS"

export const postNewPostTag = async (postTagData) => {
    const url ="http://localhost:8088/post-tags"
    return await doPost(url, postTagData)
}

export const getPostPostTags = async (postId) => {
    const url = `http://localhost:8088/post-tags?_postId=${postId}&_expand=tag`
    return await doGet(url)
}

export const getAllPostTags = async () => {
    const url ="http://localhost:8088/post-tags"
    return await doGet(url)
}

export const deletePostTag = async (postTagId) => {
    const url = `http://localhost:8088/post-tags/${postTagId}`
    return await doDelete(url)
}