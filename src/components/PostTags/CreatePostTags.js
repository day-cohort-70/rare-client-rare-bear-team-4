import { useNavigate, useParams } from "react-router-dom";
import "./posttags.css"
import { useEffect, useState } from "react"
import { deletePostTag, postNewPostTag } from "../../managers/PostTagManager";
import { getPostPostTags } from "../../managers/PostTagManager";

export const CreatePostTags = ({ allTags }) => {
    const { postId } = useParams();
    const [selectedTagIds, setSelectedTagIds] = useState([])
    const [currentPostTags, setCurrentPostTags] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getPostTags = async () => {
            const response = await getPostPostTags(postId)
            const tagIds = response.map(tag => tag.tagId)
            setSelectedTagIds(tagIds)
            setCurrentPostTags(response)
        }
        getPostTags()
    }, [postId])


    const handleChange = (event) => {
        const { name, checked } = event.target;
        const tagId = parseInt(name)
        setSelectedTagIds(prevSelectedTagIds => {
            if (checked) {
                // Add tag to selectedTags array
                return [...prevSelectedTagIds, tagId];
            } else {
                // Remove tag from selectedTags array
                return prevSelectedTagIds.filter(tag => tag !== tagId);
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const currentTagIds = currentPostTags.map(tag => tag.tagId);
        const tagsToAdd = selectedTagIds.filter(tagId => !currentTagIds.includes(tagId));
        const tagsToDelete = currentTagIds.filter(tagId => !selectedTagIds.includes(tagId));

        await Promise.all(tagsToAdd.map(tagId => {
            const newPostTag = { postId: parseInt(postId), tagId: tagId };
            return postNewPostTag(newPostTag);
        }));

        await Promise.all(tagsToDelete.map(tagId => {
            const postTagToDelete = currentPostTags.find(tag => tag.tagId === tagId);
            return deletePostTag(postTagToDelete.id);
        }));

        navigate(`/posts/${postId}`);
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
                              name={tag.id.toString()}
                              checked={selectedTagIds.includes(tag.id)}
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