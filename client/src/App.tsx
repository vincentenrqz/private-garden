import { Route, Routes } from "react-router-dom";

import Signin from "./pages/admin/components/Signin";
import Main from "./pages/client/Main";
import AdminDashboard from "./pages/admin/components/AdminDashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Signin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default App;
