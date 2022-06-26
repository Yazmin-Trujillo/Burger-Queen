import { Route, Routes } from "react-router-dom"
import Login from "../login/Login"

type Props = {
    setIsAuth: (value: boolean) => void
}

export const PublicRoutes = ({ setIsAuth }: Props) => {
    return (
        <Routes>
            <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
    )
}