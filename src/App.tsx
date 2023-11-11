import Home from "./pages/Home/Home";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ApartmentsList from "./pages/ApartmentsList/ApartmentsList";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="search" element={<ApartmentsList />} />
        <Route path="wishlist" element={<ApartmentsList />} />
        <Route path="checkout/:apartmentId" />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
