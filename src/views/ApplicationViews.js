import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagManager } from "../components/Tags/TagManager.js"
import { AllPosts } from "../components/posts/AllPosts"
import React, { useEffect, useState } from "react"
import { getAllPosts, getUserPosts } from "../managers/PostManager"
import { UserPosts } from "../components/posts/UserPosts.js"
import { CreatePost } from "../components/posts/CreatePost.js"
import { PostDetails } from "../components/posts/PostDetails.js"
import { CategoryList } from "../components/categories/CategoryList.js"
import { CreatePostTags } from "../components/PostTags/CreatePostTags.js"
import { getAllTags } from "../managers/TagService.js"
import EditTagForm from "../components/Tags/EditTagForm.js"


export const ApplicationViews = ({ token, setToken }) => {
  const [allTags, setAllTags] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])

  //get all posts with useEffect below
  const getAndSetAllPosts = async () => {
    await getAllPosts().then(res => setAllPosts(res))
  }
  useEffect(() => {
    getAndSetAllPosts()
  }, [])

  //get all user posts with useEffect below
  const getAndSetUserPosts = async () => {
    await getUserPosts(token).then(res => setUserPosts(res))
  }
  useEffect(() => {
    getAndSetUserPosts()
  }, [token])

  useEffect(() => {
    getAllTags({}).then((data) => { setAllTags(data) })
  }, []);

  return <>
    <Routes>
      <Route path="/" element={<UserPosts userPosts={userPosts} getAndSetUserPosts={getAndSetUserPosts} />}/>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}>

        <Route path="/posts">
          <Route index element={<AllPosts allPosts={allPosts} getAndSetAllPosts={getAndSetAllPosts} />} />
          <Route path=":postId" >
            <Route index element={<PostDetails token={token} />} />
            <Route path="post-tags" element={<CreatePostTags allTags={allTags} />} />
          </Route>
          <Route path="Edit/:postId" element={<Authorized token={token} />} />
          <Route path="myposts" element={<UserPosts userPosts={userPosts} getAndSetUserPosts={getAndSetUserPosts} />} />
        </Route>

        <Route path="/tag-manager" element={<TagManager setToken={setToken} allTags={allTags} setAllTags={setAllTags} />} />
        <Route path="/edit-tag/:id" element={<EditTagForm />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/newpost" element={<CreatePost token={token} />} />

      </Route>
    </Routes>
  </>
}
