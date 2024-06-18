import { useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"
import Login from "../views/Auth/Login"
import Registration from "../views/Auth/Registration"
import PositionsPage from "../views/Positions"
import PositionsFormPage from "../views/Positions/PositionsFormPage"

const Router = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)

  if (!isAuth)
    return (
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login " />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/positions" />} />
        <Route path="positions" element={<PositionsPage />} />
        <Route path="positions/create" element={<PositionsFormPage />} />
        <Route path="positions/:id" element={<PositionsFormPage />} />
        



        <Route path="*" element={<Navigate to="positions" />} />
      </Route>
      <Route path="*" element={<Navigate to="positions" />} />
    </Routes>
  )
}

export default Router
