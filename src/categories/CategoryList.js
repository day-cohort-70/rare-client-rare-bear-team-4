// CategoryList.js
import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../managers/CategoryManager';
import './CategoryList.css';

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then(catObjs => {
      const sortedCategories = catObjs.sort((a, b) => a.label.localeCompare(b.label));
      setCategories(sortedCategories);
    });
  }, []);

  return (
    <div className="category-list">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <h2>{category.label}</h2>
        </div>
      ))}
    </div>
  );
};
