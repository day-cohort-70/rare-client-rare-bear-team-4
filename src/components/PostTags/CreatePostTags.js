import { useParams } from "react-router-dom";
import "./posttags.css"
import { useState } from "react"

export const CreatePostTags = ({ allTags }) => {
    const { postId } = useParams();
    const [selectedTagIds, setSelectedTagIds] = useState([])

    const handleChange = (event) => {
        const { name, checked } = event.target;
        setSelectedTagIds(prevSelectedTagIds => {
            if (checked) {
                // Add tag to selectedTags array
                return [...prevSelectedTagIds, name];
            } else {
                // Remove tag from selectedTags array
                return prevSelectedTagIds.filter(tag => tag !== name);
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedTagIds);
        // Handle form submission
    };

    return (
        <div className="page-container">
            <div className="tag-list-container">
                <form onSubmit={handleSubmit} >
                    {allTags.map((tag) => {
                        return (
                            <label key={tag.id}>
                            <input
                              type="checkbox"
                              name={tag.id}
                              checked={selectedTagIds.includes(String(tag.id))}
                              onChange={handleChange}
                            />
                            {tag.label}
                          </label>
                        )
                    })}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}