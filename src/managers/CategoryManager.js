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
    })
   .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json(); // This line assumes the server returns a JSON object on success
    })
   .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};

export const deleteCategory = (categoryId) => {
    return fetch(`http://localhost:8088/categories/${categoryId}`, {
        method: 'DELETE',
    })
   .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        // Assuming the server returns a 204 No Content on success
        return res.status === 204;
    })
   .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
};
