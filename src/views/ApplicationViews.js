import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagManager } from "../components/Tags/TagManager.js"
import { CategoryList } from "../categories/CategoryList.js"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        <Route path="/tag-manager" element={<TagManager setToken={setToken} />}  />
        <Route path="/categories" element={<CategoryList />}  />
      </Route>
    </Routes>
  </>
}
