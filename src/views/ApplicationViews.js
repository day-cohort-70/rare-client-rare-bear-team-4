import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllPosts } from "../components/posts/AllPosts"
import React, { useEffect, useState } from "react"
import { getAllPosts } from "../managers/PostManager"

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
        
      </Route>
    </Routes>
  </>
}
