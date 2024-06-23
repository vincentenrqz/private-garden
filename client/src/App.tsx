import { Route, Routes } from "react-router-dom";

import Signin from "./pages/admin/components/Signin/Signin";
import Main from "./pages/client/Main";
import Species from "./pages/admin/components/Species/Species";
import Maps from "./pages/admin/components/Maps/Maps";
import Settings from "./pages/admin/components/Settings/Settings";
import AdminDashboard from "./pages/admin/components/AdminDashboard";
import MapPage from "./pages/client/MapPage/Map";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/admin" element={<Signin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </>
  );
};

export default App;
