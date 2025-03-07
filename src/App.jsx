import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./errors/NotFound";
import Layout from "./layout/Layout";
import Scaner from "./pages/dashboard/Scaner";
import Dashboard_Main from "./pages/Dashboard/Dashboard_Main";
import Tools_Main from "./pages/Dashboard/Tools/Tools_Main";
import SubTool from "./pages/Dashboard/Tools/SubTool";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Wrapped with Layout) */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard_Main />
              </Layout>
            }
          />

          {/* Tools */}
          <Route
            path="/tools"
            element={
              <Layout>
                <Tools_Main />
              </Layout>
            }
          />
          <Route
            path="/tools/:toolTitle/scan"
            element={
              <Layout>
                <Scaner />
              </Layout>
            }
          />
          {/* Dynamic subtools route */}
          <Route
            path="/tools/:toolTitle"
            element={
              <Layout>
                <SubTool />
              </Layout>
            }
          />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
