
export const CreatePostTags = ({ allTags }) => {

    const [selectedTags, setSelectedTags] = useState([])

    const handleChange = () => {
        return "changed"
    }

    const handleSubmit = () => {
        return "submitted"
    }

    return (
        <div className="page-container">
            <div className="tag-list-container">
                <form onSubmit={handleSubmit}>
                    {allTags.map((tag) => {
                        <label>
                        <input
                            type="checkbox"
                            name={tag.label}
                            checked={selectedTags.tag.label}
                            onChange={handleChange}
                            />
                        Item 1
                        </label>
                    })}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}