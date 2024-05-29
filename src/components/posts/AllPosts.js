import "./posts.css"
export const AllPosts = ({allPosts, getAndSetAllPosts}) => {

    return (
        <div className="page-container">
            {allPosts.map((post) => {
                return post.approved ? (
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