import { doGet, doPut } from "./AUTHBOSS";

export const getAllPosts = async () => {
   return await doGet("http://localhost:8088/posts?_expand=user&_expand=category")
}

export const getUserPosts = async (userId) => {
    return await fetch(`http://localhost:8088/posts?userId=${userId}&_expand=user&_expand=category`).then(res => res.json())
}

export const postPost = async (post) => {
    return await fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(post)
    }).then(res => res.json());
};

export const getPostByPostId = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`).then((res) => res.json())
}


export const deletePost = async (postId) => {
    const url = `http://localhost:8088/posts/${postId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            console.log(`Post with ID ${postId} has been successfully deleted.`);
        } else {
            console.error(`Failed to delete post with ID ${postId}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`Error occurred while deleting post with ID ${postId}:`, error);
    }
}


export const updatePost = async (postId, postData) => {
    const url = `http://localhost:8088/posts/${postId}`;
    return await doPut(url, postData)
}