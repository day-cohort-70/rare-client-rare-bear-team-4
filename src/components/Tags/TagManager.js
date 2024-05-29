import { getAllTags } from "../../managers/TagService.js";
import { useEffect, useState } from "react"



export const TagManager = () => {
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        getAllTags({}).then((data) => { setAllTags(data) })
    }, []);

    return (
        <>
            <section className="header-of-page">
                <h1>Tags</h1>
            </section>
            <div className="allTagsList">
                {allTags.map((item) => {
                    return (
                        <li key={item.id}>
                            {item.label}
                        </li>
                    );
                })}
            </div>

            <form>
                <h1>Create New Tag</h1>

                <input type="submit"></input>
            </form >
        </>
    )
}