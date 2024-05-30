import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../managers/CategoryManager";
import { postPost } from "../../managers/PostManager";
import "./CreatePost.css"; // Import the CSS file

export const CreatePost = ({ token }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories().then(catObjs => setCategories(catObjs));
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        
        const newPost = {
            title: title, 
            content: content, 
            category_id: parseInt(category), 
            publication_date: new Date().toISOString().split('T')[0], 
            image_url: imageUrl, 
            approved: 1, 
            user_id: parseInt(token) 
        };
        
        const savedPost = await postPost(newPost);
    console.log(savedPost)
        if (savedPost) {
            navigate(`/posts`);
        }
    };

    return (
        <div className="create-post-container">
            <form className="create-post-form" onSubmit={handleSave}>
                <h2 className="card-title">Create New Post</h2>
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="" disabled>Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Header Image URL (optional):</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-save">Save</button>
                </div>
            </form>
        </div>
    );
};
