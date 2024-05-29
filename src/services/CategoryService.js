export const getCategoryById = (CategoryId) => {
    return fetch(`http://localhost:8088/Categories/${CategoryId}`).then((res) => res.json())
}