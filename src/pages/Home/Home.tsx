import HeroSection from "../../components/HeroSection/HeroSection";
import "./Home.scss";
import ServiceSection from "../../components/ServiceSection/ServiceSection";
import FeaturesList from "../../components/FeaturesList/FeaturesList";
import Testimonial from "../../components/Testimonial/Testimonial";
import CommonSection1 from "../../components/CommonSections/CommonSection1/CommonSection1";
import CommonSection2 from "../../components/CommonSections/CommonSection2/CommonSection2";
import { useState } from "react";
import FullLoadingScreen from "../../utils/FullLoadingScreen/FullLoadingScreen";
const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 200);

  return (
    <main className="home">
      {isLoading ? (
        <div className="min-h-screen">
          <FullLoadingScreen />
        </div>
      ) : (
        <>
          <HeroSection />
          <ServiceSection />
          <CommonSection1 />

          <FeaturesList />
          <CommonSection2 />
          <Testimonial />
        </>
      )}
    </main>
  );
};

export default Home;
