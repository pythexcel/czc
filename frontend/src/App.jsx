import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Bots from "./Pages/Bots";
import Integrations from "./Pages/Integrations";
import AuditLog from "./Pages/AuditLog";
import MngUsers from "./Pages/MngUsers";
import UsageTracking from "./Pages/UsageTracking";
import FAQs from "./Pages/FAQS";
import ForgetPassword from "./Pages/Forgetpassword";
import ResetPassword from "./Pages/ResetPassword";
import PrivateRoute from "./Component/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {" "}
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="integrations" element={<Integrations />} />
          <Route path="bots" element={<Bots />} />
          <Route path="faqs" element={<FAQs />} />
          <Route path="auditlogs" element={<AuditLog />} />
          <Route path="mngusers" element={<MngUsers />} />
          <Route path="usagetracking" element={<UsageTracking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
