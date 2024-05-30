import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagManager } from "../components/Tags/TagManager.js"
import { CategoryList } from "../categories/CategoryList.js"
import { AllPosts } from "../components/posts/AllPosts"
import React, { useEffect, useState } from "react"
import { getAllPosts } from "../managers/PostManager"
import { CreatePost } from "../components/posts/CreatePost.js"

export const ApplicationViews = ({ token, setToken }) => {

  const [allPosts, setAllPosts] = useState([])

  //get all posts with useEffect below
  const getAndSetAllPosts = async () => {
    await getAllPosts().then(res => setAllPosts(res))
  }
  useEffect(() => {
    getAndSetAllPosts()

  }, [])

  return <>
    <Routes>
      
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/posts" element={<AllPosts allPosts={allPosts} getAndSetAllPosts={getAndSetAllPosts}/>} />
        <Route path="/tag-manager" element={<TagManager setToken={setToken} />}  />
        <Route path="/categories" element={<CategoryList />}  />
        <Route path="/newpost" element={<CreatePost token={token}/>}  />
      </Route>
    </Routes>
  </>
}
