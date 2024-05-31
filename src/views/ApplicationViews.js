import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagManager } from "../components/Tags/TagManager.js"
import { CategoryList } from "../categories/CategoryList.js"
import { AllPosts } from "../components/posts/AllPosts"
import React, { useEffect, useState } from "react"
import { getAllPosts, getUserPosts } from "../managers/PostManager"
import { UserPosts } from "../components/posts/UserPosts.js"
import { CreatePost } from "../components/posts/CreatePost.js"
import { PostDetails } from "../components/posts/PostDetails.js"

export const ApplicationViews = ({ token, setToken }) => {

  const [allPosts, setAllPosts] = useState([])
  const [userPosts, setUserPosts] = useState([])

  //get all posts with useEffect below
  const getAndSetAllPosts = async () => {
    await getAllPosts().then(res => setAllPosts(res))
  }
  useEffect(() => {
    getAndSetAllPosts()

  }, [])
  
  //get all posts with useEffect below
  const getAndSetUserPosts = async () => {
    await getUserPosts(token).then(res => setUserPosts(res))
  }
  useEffect(() => {
    getAndSetUserPosts()
  }, [token])

  return <>
    <Routes>
      
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>

        <Route path="/posts">
          <Route index element={<AllPosts allPosts={allPosts} getAndSetAllPosts={getAndSetAllPosts}/>}/>
          <Route path="/posts/:postId" element={<PostDetails token={token}/>}/>
          <Route path="Edit/:postId" element={<Authorized token={token} />}/>
          <Route path="/posts/myposts" element={<UserPosts userPosts={userPosts} getAndSetUserPosts={getAndSetUserPosts}/>} />
        </Route>
        
        <Route path="/tag-manager" element={<TagManager setToken={setToken} />}  />
        <Route path="/categories" element={<CategoryList />}  />
        <Route path="/newpost" element={<CreatePost token={token}/>}  />
        
      </Route>
    </Routes>
  </>
}
