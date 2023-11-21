import HeroSection from "../../components/HeroSection/HeroSection";
import "./Home.scss";
import ServiceSection from "../../components/ServiceSection/ServiceSection";
import FeaturesList from "../../components/FeaturesList/FeaturesList";
import Testimonial from "../../components/Testimonial/Testimonial";
const Home = () => {
  return (
    <main className="home">
      <HeroSection />
      <ServiceSection />
      <FeaturesList />
      <Testimonial />
    </main>
  );
};

export default Home;
