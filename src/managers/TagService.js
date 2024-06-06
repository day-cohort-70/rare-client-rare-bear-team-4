import { doDelete, doPost, doPut } from "./AUTHBOSS"

export const getAllTags = () => {
    return fetch("http://localhost:8088/tags").then((res) => res.json())
}
export const fetchTagByID = (tagId, tagDate) => {
    return fetch(`http://localhost:8088/tags/${tagId}`).then((res) => res.json())
}

export const saveTagToDatabase = async (post) => {
    const url = `http://localhost:8088/tags`
    return await doPost(url, post)
}

export const deleteTag = async (tagId) => {
    const url = `http://localhost:8088/tags/${tagId}`
    return await doDelete(url)
}

export const updateTag = async (tagId, tag_data) => {
    const url = `http://localhost:8088/tags/${tagId}`
    return await doPut(url, tag_data)
}