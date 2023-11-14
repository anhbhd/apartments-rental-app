import Home from "./pages/Home/Home";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ApartmentsList from "./pages/ApartmentsList/ApartmentsList";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Wishlist from "./pages/Wishlist/Wishlist";
import ApartmentDetails from "./pages/ApartmentDetails/ApartmentDetails";
import PersonalInfo from "./pages/PersonalInfo/PersonalInfo";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/search" element={<ApartmentsList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/personal_info" element={<PersonalInfo />} />
        <Route path="/checkout/:apartmentId" element={<ApartmentDetails />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
