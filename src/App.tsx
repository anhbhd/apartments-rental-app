import Home from "./pages/Home/Home";

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
import GeneralProtectedRoutes from "./routes/GeneralProtectedRoutes";
import ForbiddenLoggedRoutes from "./routes/ForbiddenLoggedRoutes";
import { Dashboard } from "./pages/ADMIN/Dashboard/Dashboard";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import AddOrEditApartments from "./pages/ADMIN/ApartmentsManagement/AddOrEditApartments";
import ApartmentListAdmin from "./pages/ADMIN/ApartmentsManagement/ApartmentsList";
import UsersManagement from "./pages/ADMIN/UsersManagement/UsersManagement";
import RentalApplicationsManagement from "./pages/ADMIN/RentalsManagement/RentalsManagement";
import CategoriesManagement from "./pages/ADMIN/CategoriesManagement/CategoriesManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateForAdminRoutes from "./routes/PrivateForAdminRoutes";
function App() {
  return (
    <div className="App">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<ApartmentsList />} />

          <Route path="/" element={<ForbiddenLoggedRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
          </Route>

          <Route path="/" element={<GeneralProtectedRoutes />}>
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<PrivateForAdminRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route
              path="apartments/add_or_edit"
              element={<AddOrEditApartments />}
            />
            <Route
              path="apartments/add_or_edit/:apartmentId"
              element={<AddOrEditApartments />}
            />
            <Route path="users" element={<UsersManagement />} />
            <Route
              path="rental_applications"
              element={<RentalApplicationsManagement />}
            />
            <Route path="categories" element={<CategoriesManagement />} />
            <Route path="apartments" element={<ApartmentListAdmin />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
