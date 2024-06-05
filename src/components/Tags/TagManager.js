import { deleteTag, getAllTags } from "../../managers/TagService.js";
import { useEffect, useState } from "react"
import { saveTagToDatabase } from "../../managers/TagService.js"
import "./tagManager.css"

export const TagManager = ({allTags, setAllTags}) => {
    const [newLabel, setNewLabel] = useState("")

    


    const handleSave = async (e) => {
        e.preventDefault();
        const newPost = {
            label: newLabel
        };
        const savedTag = await saveTagToDatabase(newPost);
        if (savedTag) {
            setNewLabel("");
            // Fetch the updated list of tags and update the state
            const updatedTags = await getAllTags();
            setAllTags(updatedTags);
        }

    }

    const handleDelete = (tag) => {
        if (window.confirm('Are you sure you want to delete the "'+tag.label+'" category?')) {
            deleteTag(tag.id).then(() => {
            // After successfully deleting the category, refresh the categories list
            getAllTags().then(setAllTags);
            // Reload the page after updating the state
            window.location.reload();
          }).catch(error => {
            console.error("Failed to delete category:", error);
          });
        }
      }  

return (
    <>
        <section className="header-of-page">
            <h1>Tags</h1>
        </section>
        <section className="fullPage">

            <div className="tag-list">
                {allTags.map((item) => {
                    return (
                        <ul key={item.id} className="tag-card">
                            <h2>{item.label}</h2>
                            <button className="btn-delete" onClick={() => handleDelete(item)}>
          {'delete'}</button>
                        </ul>
                    );
                })}
            </div>
            <section className="leftSection">
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
)
}