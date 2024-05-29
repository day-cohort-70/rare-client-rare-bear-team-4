import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostDetails } from "./PostDetails.js"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path="posts">
        <Route index element={<Authorized token={token} />}/>
        <Route path=":postId" element={<PostDetails token={token}/>}/>
        <Route path="Edit/:postId" element={<Authorized token={token} />}/>
      </Route>
        
      </Route>
    </Routes>
  </>
}
