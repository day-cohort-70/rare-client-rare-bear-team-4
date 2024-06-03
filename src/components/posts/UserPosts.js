import { useNavigate } from "react-router-dom";
import "./posts.css"


export const UserPosts = ({ getAndSetUserPosts, userPosts}) => {
    
    const sortedPosts = userPosts.sort((a, b) => {
        const dateA = new Date(a.publicationDate);
        const dateB = new Date(b.publicationDate);
        return dateB - dateA;
    })

    let navigate = useNavigate()

    const handleClick = (postId) => {
        navigate(`/posts/${postId}`); 
    };

    return (
        <div className="page-container">
            <div className="post-item-header">
                <h1>Title</h1>
                <h1>Author</h1>
                <h1>Category</h1>
            </div>
            {sortedPosts.map((post) => {
                return (
                    <div key={post.id} className="post-item" onClick={() => handleClick(post.id)}>
                        <h2>{post.title}</h2>
                        <h2>{post.user.userFirstName} {post.user.userLastName}</h2>
                        <h2>{post.category.categoryLabel}</h2>
                    </div>
                )
            })}
        </div>
    )
}