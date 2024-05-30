import { getAllTags } from "../../managers/TagService.js";
import { useEffect, useState } from "react"
import { saveTagToDatabase } from "../../managers/TagService.js"
import "./tagManager.css"

export const TagManager = () => {
    const [allTags, setAllTags] = useState([])
    const [newLabel, setNewLabel] = useState("")

    useEffect(() => {
        getAllTags({}).then((data) => { setAllTags(data) })
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const newPost = {
            label: newLabel
        };
        await saveTagToDatabase(newPost).then ()
    }

return (
    <>
        <section className="header-of-page">
            <h1>Tags</h1>
        </section>
        <section className="fullPage">

            <div className="allTagsList">
                {allTags.map((item) => {
                    return (
                        <li key={item.id}>
                            {item.label}
                        </li>
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