import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./protect/ProtectedRoute";
import NotFound from "./errors/NotFound";
import Layout from "./layout/Layout";
import Dashboard_Main from "./pages/Dashboard/Dashboard_Main";
import Tools_Main from "./pages/Dashboard/Tools/Tools_Main";
import SubTool from "./pages/Dashboard/Tools/SubTool";
import Reports from "./pages/Dashboard/Reports";
import Scaner from "./pages/Dashboard/Scaner";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Scan from "./pages/Dashboard/Scan";
import NewScan from "./pages/Dashboard/NewScan";
import Account from "./pages/Dashboard/Account";
import PricingPlan from "./pages/Dashboard/PricingPlan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Wrapped with Layout) */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route>
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

          {/* Reports Route */}
          <Route
            path="/reports"
            element={
              <Layout>
                <Reports />
              </Layout>
            }
          />

          <Route
            path="/scan"
            element={
              <Layout>
                <Scan />
              </Layout>
            }
          />
          <Route
            path="/new-scan"
            element={
              <Layout>
                <NewScan />
              </Layout>
            }
          />
          <Route
            path="/account"
            element={
              <Layout>
                <Account />
              </Layout>
            }
          />
          <Route
            path="/plans&pricing"
            element={
              <Layout>
                <PricingPlan />
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
