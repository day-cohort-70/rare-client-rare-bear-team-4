import { deleteTag, getAllTags, updateTag } from "../../managers/TagService.js";
import { useEffect, useState } from "react"
import { saveTagToDatabase } from "../../managers/TagService.js"
import "./tagManager.css"
import { useNavigate } from "react-router-dom";

export const TagManager = ({ allTags, setAllTags }) => {
    const [newLabel, setNewLabel] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllTags().then((data) => {
            setAllTags(data);
        });
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const newTag = {
            label: newLabel
        };
        const savedTag = await saveTagToDatabase(newTag);
        if (savedTag) {
            setNewLabel("");
            const updatedTags = await getAllTags();
            setAllTags(updatedTags);
        }
    }

    const handleDelete = (tag) => {
        if (window.confirm('Are you sure you want to delete the "' + tag.label + '" tag?')) {
            deleteTag(tag.id).then(() => {
                getAllTags().then(setAllTags);
                window.location.reload();
            }).catch(error => {
                console.error("Failed to delete tag:", error);
            });
        }
    }

    const handleEdit = (tag) => {
        if (window.confirm('Are you sure you want to edit the "' + tag.label + '" tag?')) {
            navigate(`/edit-tag/${tag.id}`);
        }
    }

    return (
        <>
            <section className="header-of-page">
                <h1>Tags</h1>
            </section>
            <section className="fullPage">
                <div className="tag-list">
                    {allTags.map((item) => (
                        <div key={item.id} className="tag-card">
                            <h2>{item.label}</h2>
                            <div>
                                <button className="btn-edit" onClick={() => handleEdit(item)}>Edit Tag</button>
                                <button className="btn-delete" onClick={() => handleDelete(item)}>Delete Tag</button>
                            </div>
                        </div>
                    ))}
                </div>
                <section className="rightSection">
                    <form className="create-post-form" onSubmit={handleSave}>
                        <h2 className="card-title">Create New Tag</h2>
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
}
