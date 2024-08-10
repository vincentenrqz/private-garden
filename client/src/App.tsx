import { Route, Routes } from "react-router-dom";

import Signin from "./pages/admin/page/Signin/Signin";
import Main from "./pages/client/Main";
import AdminDashboard from "./pages/admin/page/Overview/AdminDashboard";
import UserSettings from "./pages/admin/page/UserSettings/user-settings";
import Species from "./pages/admin/page/Species/Species";
import { MediaContextProvider } from "./context/MediaContext";
import Map from "./pages/admin/page/Map/Map";
import Types from "./pages/admin/page/Types/Types";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MediaContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/species" element={<Species />} />
          <Route path="/admin/maps" element={<Map />} />
          <Route path="/admin/maps" element={<Map />} />
          <Route path="/admin/types" element={<Types />} />
          <Route path="/admin/user-settings" element={<UserSettings />} />
        </Routes>
      </MediaContextProvider>
    </ThemeProvider>
  );
};

export default App;
