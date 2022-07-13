import { Route, Routes } from "react-router-dom"
import Admin from "../admin/Admin"

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin/>} />
        </Routes>
    )
}
