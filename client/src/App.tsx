import { Route, Routes } from "react-router-dom";

import Signin from "./pages/admin/components/Signin/Signin";
import Main from "./pages/client/Main";
import AdminDashboard from "./pages/admin/components/Overview/AdminDashboard";
import { MediaContextProvider } from "./context/MediaContext";

const App = () => {
  return (
    <>
      <MediaContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<Signin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </MediaContextProvider>
    </>
  );
};

export default App;
