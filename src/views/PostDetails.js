import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostByPostId } from "../services/PostService.js";
import { getCategoryById } from "../services/CategoryService.js";
import { getUserById } from "../services/UserService.js";

export const PostDetails = ({token }) => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [poster, setPoster] = useState({});
    const [category, setCategory] = useState({});

    useEffect(() => {
        getPostByPostId(postId).then((data) => {
            setPost(data[0]);
        });
    }, [postId, token]);

    useEffect(() => {
        getUserById(post?.user_id).then((poster0) => {
            setPoster(poster0[0]);
        });
        getCategoryById(post.category_id).then((category0) => {
            setCategory(category0[0])
        })

    }, [post]);

    // Check if the current user is the poster of the post
    const isUserPoster = token === post?.user_id;

    return (
        <>
            <section className="post">
                <header className="post-header">{post?.title}</header>
                <div><span className="post-info">Title : </span>{post?.title}</div>
                <div><span className="post-info">Author's Display Name : </span>{post?.userId}</div>
                <div><span className="post-info">Header image : </span>{post?.image_url}</div>
                <div><span className="post-info">Publication date : </span>{post?.publicationDate}</div>
                <div><span className="post-info">Post content : </span>{post?.content}</div>
                <div>
                    {/*Buttons here */}
                </div>
            </section>
        </>
    );
};
