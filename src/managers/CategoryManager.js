export const getAllCategories = () => {
    return fetch("http://localhost:8088/categories").then((res) => res.json())
} 

export const saveCategoriesToDatabase = (post) => {
    return fetch(`http://localhost:8088/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then((res) => res.json())
}

export const deleteCategory = (categoryId) => {
    return fetch(`http://localhost:8088/categories/${categoryId}`, {
        method: 'DELETE',
    }).then((res) => res.json());
};