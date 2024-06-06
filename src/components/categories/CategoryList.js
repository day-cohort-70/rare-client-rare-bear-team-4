// CategoryList.js
import React, { useEffect, useState } from 'react';
import { deleteCategory, getAllCategories, saveCategoriesToDatabase } from '../../managers/CategoryManager';
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
      // Reload the page after updating the state
      window.location.reload();
    }
  }  

  const handleDelete = (category) => {
    if (window.confirm('Are you sure you want to delete the "'+category.label+'" category?')) {
      deleteCategory(category.id).then(() => {
        // After successfully deleting the category, refresh the categories list
        getAllCategories().then(setCategories);
        // Reload the page after updating the state
        window.location.reload();
      }).catch(error => {
        console.error("Failed to delete category:", error);
      });
    }
  }  

  return (<>
  <section className="header-of-page">
  <h1>Categories</h1>
  </section>
    <section className='fullPage'>
      <div className="category-list">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
        <h2>{category.label}</h2>
        <button className="btn-delete" onClick={() => handleDelete(category)}>
          {'delete'}
        </button>
      </div>
      ))}

      </div>
      <section className="rightSection">
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
    </section>
    </>
  );
 
};
