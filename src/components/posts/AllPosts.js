import { useNavigate } from "react-router-dom";
import "./posts.css"
import { useEffect } from "react";


export const AllPosts = ({allPosts}) => {

    const sortedPosts = allPosts.sort((a, b) => {
        const dateA = new Date(a.publicationDate);
        const dateB = new Date(b.publicationDate);
        return dateB - dateA;
    })
    const today = new Date()
    today.setHours(0, 0, 0, 0)
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
                const publicationDate = new Date(post.publicationDate)
                return post.approved && publicationDate < today ? (
                    <div key={post.id} className="post-item" onClick={() => handleClick(post.id)}>
                        <h2>{post.title}</h2>
                        <h2>{post.user.userFirstName} {post.user.userLastName}</h2>
                        <h2>{post.category.categoryLabel}</h2>
                    </div>
                ) : null;
            })}
        </div>
    )
}