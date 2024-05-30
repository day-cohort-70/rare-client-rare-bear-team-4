import "./AllPosts.css"
export const AllPosts = ({allPosts, getAndSetAllPosts}) => {

    const sortedPosts = allPosts.sort((a, b) => {
        const dateA = new Date(a.publicationDate);
        const dateB = new Date(b.publicationDate);
        return dateB - dateA;
    })
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return (
        <div className="page-container">
            <div className="post-item-header">
                <h1>Title</h1>
                <h1>Author</h1>
                <h1>Category</h1>
            </div>
            {allPosts.map((post) => {
                const publicationDate = new Date(post.publicationDate)
                return post.approved && publicationDate < today ? (
                    <div key={post.id} className="post-item">
                        <h2>{post.title}</h2>
                        <h2>{post.user.userFirstName} {post.user.userLastName}</h2>
                        <h2>{post.category.categoryLabel}</h2>
                    </div>
                ) : null;
            })}
        </div>
    )
}