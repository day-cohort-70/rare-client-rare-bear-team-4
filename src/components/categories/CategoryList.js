// CategoryList.js
import React, { useEffect, useState } from 'react';
import { getAllCategories, saveCategoriesToDatabase } from '../../managers/CategoryManager';
import './CategoryList.css';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newLabel, setNewLabel] = useState("")
  useEffect(() => {
    getAllCategories().then(catObjs => {
      const sortedCategories = catObjs.sort((a, b) => a.label.localeCompare(b.label));
      setCategories(sortedCategories);
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const newPost = {
        label: newLabel
    };
    const savedCategory = await saveCategoriesToDatabase(newPost);
    if (savedCategory) {
        setNewLabel("");
        // Fetch the updated list of tags and update the state
        const updatedCategories = await getAllCategories();
        setCategories(updatedCategories);
    }

}

  return (
    <div className='full-page'>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <h2>{category.label}</h2>
          </div>
        ))}
      </div>
      <section className="leftSection">
                <form className="create-post-form" onSubmit={handleSave}>
                    <h2 className="card-title">Create New Category</h2>
                    <div className="form-group">
                        <label></label>
                        <input type="text" value={newLabel} onChange={(event) => setNewLabel(event.target.value)} required />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn-save">Create</button>
                </div>
                </form>
            </section>
    </div>
  );
};
