import { useNavigate, useParams } from "react-router-dom";
import "./posttags.css"
import { useState } from "react"
import { postNewPostTag } from "../../managers/PostTagManager";

export const CreatePostTags = ({ allTags }) => {
    const { postId } = useParams();
    const [selectedTagIds, setSelectedTagIds] = useState([])
    const navigate = useNavigate()

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await Promise.all(selectedTagIds.map((tagId) => {
            const newPostTag = {
                postId: parseInt(postId),
                tagId: parseInt(tagId)
            }
            postNewPostTag(newPostTag)
        }))
        navigate(`/posts/${postId}`)
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