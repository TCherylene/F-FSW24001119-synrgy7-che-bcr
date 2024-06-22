import { Route, Routes } from "react-router-dom"
import HomeLayouts from "./layout/HomeLayouts"
import DashboardLayouts from "./layout/DashboardLayouts"
import { Cars, Home, Dashboard, Login } from "./pages"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayouts />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Cars />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<DashboardLayouts />}>
          <Route index element={<Dashboard />} />
          <Route path="list" element={<Cars />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
