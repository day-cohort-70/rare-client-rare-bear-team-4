import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost, getPostByPostId } from "../../managers/PostManager.js";
import { getUserById } from "../../managers/UserManager.js";
import "./PostDetails.css"
import { getPostPostTags } from "../../managers/PostTagManager.js";
export const PostDetails = ({token }) => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [poster, setPoster] = useState({});
    const [postPostTags, setPostPostTags] = useState([])

    const navigate = useNavigate()

    //get and set this individual post
    useEffect(() => {
        getPostByPostId(postId).then((data) => {
            setPost(data);
        });
    }, [postId, token]);

    //get the and set the user that posted this post
    useEffect(() => {
        getUserById(post.user_id).then((userObj) => {
            setPoster(userObj);
        });

    }, [post]);

    //get and set the post tags
    const getAndSetPostTags = async() => {
      await getPostPostTags(postId).then((res)=> {
        setPostPostTags(res)
      })
    }
    useEffect(() => {
      getAndSetPostTags()
    }, [post])

    // Check if the current user is the poster of the post
   // const isUserPoster = token === post?.user_id;

    const handleDeletePost = (postId) => {
        if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            deletePost(postId)
                .then(() => {
                    // Redirect to the Post list after successful deletion
                    navigate("/posts");
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                });
        } else {
            // If the user cancels, do nothing and stay on the same page
            console.log("Delete action canceled by user.");
        }
    };
    
    return (
        <div className="post-details-container">
            <section className="post-details-card">
              <h2 className="card-title">Post Details</h2>
              <div className="post-detail">
                <span className="post-info">Title:</span> {post?.title}
              </div>
              <div className="post-detail">
                <span className="post-info">Author's Display Name:</span> {poster?.username}
              </div>
              <div className="post-detail">
                <span className="post-info">Header Image:</span>
                {post?.image_url ? (
                  <img src={post.image_url} alt="Image link not working?" className="post-image" />
                ) : (
                  "No image available"
                )}
              </div>
              <div className="post-detail">
                <span className="post-info">Publication Date:</span> {post?.publication_date}
              </div>
              <div className="post-detail">
                <span className="post-info">Content:</span> {post?.content}
              </div>
              <div className="button-box">
            <button className="btn-delete" onClick={() => handleDeletePost(post.id)}>
              <i className="fa fa-trash"></i> Delete
            </button>
            <button className="btn-edit">
              <i className="fa fa-edit"></i> Edit
            </button>
          </div>
          <div className="post-details-tag-section">
                  {postPostTags.map((tag) => {
                    return (
                      <div key={tag.id} className="post-tag-item">
                        {tag.tag.tagLabel}
                      </div>
                    )
                  })}
          </div>
          <div>
            <button className="btn-edit" onClick={() => {navigate(`/posts/${postId}/post-tags`)}}>Manage Tags</button>
          </div>
            </section>
          </div>
      );
};
