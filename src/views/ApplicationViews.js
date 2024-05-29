import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagManager } from "../components/Tags/TagManager.js"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/tag-manager" element={<TagManager setToken={setToken} />}  />
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        
      </Route>
    </Routes>
  </>
}
