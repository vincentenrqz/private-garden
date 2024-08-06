import { Route, Routes } from "react-router-dom";

import Signin from "./pages/admin/page/Signin/Signin";
import Main from "./pages/client/Main";
import AdminDashboard from "./pages/admin/page/Overview/AdminDashboard";
import UserSettings from "./pages/admin/page/UserSettings/user-settings";
import Types from "./pages/admin/page/Types/types";
import Species from "./pages/admin/page/Species/Species";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/species" element={<Species />} />
        <Route path="/admin/types" element={<Types />} />
        <Route path="/admin/user-settings" element={<UserSettings />} />
      </Routes>
    </>
  );
};

export default App;
