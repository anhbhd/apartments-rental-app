import Home from "./pages/Home/Home";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ApartmentsList from "./pages/ApartmentsList/ApartmentsList";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Home /> */}
      <ApartmentsList />
      <Footer />
    </div>
  );
}

export default App;
