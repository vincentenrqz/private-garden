import { Route, Routes, useLocation } from "react-router-dom";
import Signin from "./pages/admin/page/Signin/Signin";
import AdminDashboard from "./pages/admin/page/Overview/AdminDashboard";
import UserSettings from "./pages/admin/page/UserSettings/user-settings";
import Species from "./pages/admin/page/Species/Species";
import { MediaContextProvider } from "./context/MediaContext";
import ClientMap from "./pages/client/MapPage/Map";
import AdminMap from "./pages/admin/page/Map/Map";
import Types from "./pages/admin/page/Types/types";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { lazy, useEffect, useState } from "react";
import PageEffect from "./pages/components/PageEffect";
import LandingPage from "./pages/client/LandingPage";
import { useFetchData } from "./utils/queries";
import LandingPageLoader from "./pages/components/LandingPageLoader";

const Flipbook = lazy(() => import("../src/pages/client/Flip"));

const theme = createTheme({
  typography: {
    fontFamily: "Sans serif",
  },
});

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const controls = useAnimation();
  const location = useLocation();

  const { loading } = useFetchData();

  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  const pageTransition = {
    initial: { x: "100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100vw", opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" },
  };

  const mobile = useMediaQuery("(max-width:900px)");

  return (
    <ThemeProvider theme={theme}>
      <MediaContextProvider>
        <PageEffect isTransitioning={isTransitioning} />
        <div
          style={{
            overflow: !mobile || currentPage === 1 ? "hidden " : "auto",
            height: "100vh",
            width: "100vw",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div {...pageTransition}>
                    {loading ? <LandingPageLoader /> : <LandingPage />}
                  </motion.div>
                }
              />
              <Route
                path="/maps"
                element={
                  <motion.div {...pageTransition}>
                    {loading ? <LandingPageLoader /> : <ClientMap />}
                  </motion.div>
                }
              />
              <Route
                path="/flipbook"
                element={
                  <motion.div {...pageTransition}>
                    {loading ? <LandingPageLoader /> : <Flipbook />}
                  </motion.div>
                }
              />
              {/* <Route path="/signin" element={<Signin />} /> */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/species" element={<Species />} />
              <Route path="/admin/maps" element={<AdminMap />} />
              <Route path="/admin/types" element={<Types />} />
              {/* <Route path="/admin/user-settings" element={<UserSettings />} /> */}
            </Routes>
          </AnimatePresence>
        </div>
      </MediaContextProvider>
    </ThemeProvider>
  );
};

export default App;
