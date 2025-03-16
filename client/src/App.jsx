import "./App.css";

import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from './context/FavoritesContext';
import DashboardHome from "./pages/Dashboard/DashboardHome";
import ProtectedRoute from "./components/common/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Applications from "./pages/Dashboard/Applications";
import Profile from "./pages/Dashboard/Profile";
import Favorites from "./pages/Dashboard/Favorites";
import PetListings from "./pages/PetListings";
import PetDetails from "./pages/PetDetails";

function App() {
  return (
    <>
      {/* <Navbar />
      <div className="h-[1000vh] bg-yellow-300"></div> */}
      {/* <SignUp /> */}
      {/* <div className=" bg-[#207CC8] bg-gradient-to-b from-[#103D62] from-0% to-[#207CC8] to-90% shadow text-[#f9e5bd]">
        <Navbar />
        <HeroSection />
      </div> */}

      <AuthProvider>
        <FavoritesProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Animal Routes */}
            <Route path="/animals" element={<PetListings />} />
            <Route path="/animals/:id" element={<PetDetails />} />

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >

              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<Profile />} />
              <Route path="applications" element={<Applications />} />
              <Route path="favorites" element={<Favorites />} />
            </Route>

            {/* Fallback for old routes */}
            {/* <Route path="/pets" element={<PetListings />} />
          <Route path="/pets/:id" element={<PetDetails />} /> */}

          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
