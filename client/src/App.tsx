import { Route, Routes } from "react-router-dom";

import Signin from "./pages/admin/components/Signin/Signin";
import Main from "./pages/client/Main";
import AdminDashboard from "./pages/admin/components/Overview/AdminDashboard";
import Species from "./pages/admin/components/Species/Species";
import Maps from "./pages/admin/components/Maps/Maps";
import Settings from "./pages/admin/components/Settings/Settings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Signin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/species" element={<Species />} />
        <Route path="/admin/maps" element={<Maps />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;
