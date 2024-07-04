import { Route, Routes } from "react-router-dom"
import HomeLayouts from "./layout/HomeLayouts"
import DashboardLayouts from "./layout/DashboardLayouts"
import { Cars, CarCreate, CarUpdate, CarLists, Dashboard, Home, Login, LoginExample } from "./pages"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayouts />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Cars />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/login/example" element={<LoginExample />} />

        <Route path="/admin" element={<DashboardLayouts />}>
          <Route index element={<Dashboard />} />

          <Route path="cars">
            <Route index element={<CarLists />} />
            <Route path="create" element={<CarCreate />} />
            <Route path="update/:id" element={<CarUpdate />} />
          </Route>

        </Route>
      </Routes>
    </>
  )
}

export default App
