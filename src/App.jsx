import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/dashboard/main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tools from "./pages/dashboard/Tools";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./errors/NotFound";
import Layout from "./layout/Layout";

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
                <Main />
              </Layout>
            }
          />
          <Route
            path="/tools"
            element={
              <Layout>
                <Tools />
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
