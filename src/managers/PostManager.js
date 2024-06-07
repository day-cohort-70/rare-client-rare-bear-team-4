import { doDelete, doGet, doGetOne, doPost, doPut } from "./AUTHBOSS";

export const getAllPosts = async () => {
   return await doGet("http://localhost:8088/posts?_expand=user&_expand=category")
}

export const getUserPosts = async (userId) => {
    const url = `http://localhost:8088/posts?userId=${userId}&_expand=user&_expand=category`
    return await doGet(url)
}

export const postPost = async (post) => {
    const url = "http://localhost:8088/posts"
    return await doPost(url, post)
};

export const getPostByPostId = (postId) => {
    const url = `http://localhost:8088/posts/${postId}`
    return doGetOne(url)
}


export const deletePost = async (postId) => {
    const url = `http://localhost:8088/posts/${postId}`
    return await doDelete(url)
}


export const updatePost = async (postId, postData) => {
    const url = `http://localhost:8088/posts/${postId}`;
    return await doPut(url, postData)
}