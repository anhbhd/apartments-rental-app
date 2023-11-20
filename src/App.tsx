import Home from "./pages/Home/Home";
import "./App.scss";

import ApartmentsList from "./pages/ApartmentsList/ApartmentsList";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Wishlist from "./pages/Wishlist/Wishlist";
import ApartmentDetails from "./pages/ApartmentDetails/ApartmentDetails";
import PersonalInfo from "./pages/PersonalInfo/PersonalInfo";
import MyRentalApplications from "./pages/MyRentalApplications/MyRentalApplications";
import ScrollToTop from "./utils/ScrollToTop";
import MainLayout from "./layouts/MainLayout/MainLayout";
import DetailedRentalApplication from "./pages/DetailedRentalApplication/DetailedRentalApplication";
import NotFound from "./pages/NotFound";
import GeneralProtectedRoute from "./routes/GeneralProtectedRoute";

function App() {
  return (
    <div className="App">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<ApartmentsList />} />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />

          <Route path="/" element={<GeneralProtectedRoute />}>
            <Route path="my_rental_apps" element={<MyRentalApplications />} />
            <Route path="personal_info" element={<PersonalInfo />} />
            <Route
              path="my_rental_apps/:rentalAppId"
              element={<DetailedRentalApplication />}
            />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route
            path="apartments/:apartmentId"
            element={<ApartmentDetails />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
