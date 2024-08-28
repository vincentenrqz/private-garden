import { Route, Routes } from "react-router-dom";
import Signin from "./pages/admin/page/Signin/Signin";
import Main from "./pages/client/Main";
import AdminDashboard from "./pages/admin/page/Overview/AdminDashboard";
import UserSettings from "./pages/admin/page/UserSettings/user-settings";
import Species from "./pages/admin/page/Species/Species";
import { MediaContextProvider } from "./context/MediaContext";
import ClientMap from "./pages/client/MapPage/Map";
import AdminMap from "./pages/admin/page/Map/Map";
import Types from "./pages/admin/page/Types/types";
import { ThemeProvider, createTheme } from "@mui/material";
import CustomMap from "./pages/components/CustomMap";

// Global set styling
const theme = createTheme({
  typography: {
    fontFamily: "Minion Bold Condensed Caption, sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MediaContextProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/maps" element={<ClientMap />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/species" element={<Species />} />
          <Route path="/admin/maps" element={<AdminMap />} />
          <Route path="/admin/types" element={<Types />} />
          <Route path="/admin/user-settings" element={<UserSettings />} />
        </Routes>
      </MediaContextProvider>
    </ThemeProvider>
  );
};

export default App;
