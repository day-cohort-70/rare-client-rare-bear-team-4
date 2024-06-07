import { doDelete, doGet, doPost } from "./AUTHBOSS";

export const getAllCategories = async () => {
    const url = "http://localhost:8088/categories"
    return await doGet(url)
} 

export const saveCategoriesToDatabase = async (post) => {
    const url = `http://localhost:8088/categories`
    return await doPost(url, post)
}

export const deleteCategory = async (categoryId) => {
    const url = `http://localhost:8088/categories/${categoryId}`
    return await doDelete(url)
}
