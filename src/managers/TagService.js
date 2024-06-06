export const getAllTags = () => {
    return fetch("http://localhost:8088/tags").then((res) => res.json())
}
export const fetchTagByID = (tagId, tagDate) => {
    return fetch(`http://localhost:8088/tags/${tagId}`).then((res) => res.json())
}

export const saveTagToDatabase = (post) => {
    return fetch(`http://localhost:8088/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then((res) => res.json())
}

export const deleteTag = (tagId) => {
    return fetch(`http://localhost:8088/tags/${tagId}`, {
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




    export const updateTag = (tagId, tag_data) => {
        return fetch(`http://localhost:8088/tags/${tagId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag_data)
        })
    }