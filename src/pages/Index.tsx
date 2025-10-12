import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Benefits from "@/components/Benefits";
import BeerPourAnimation from "@/components/BeerPourAnimation";
import Contemporary from "@/components/Contemporary";
import Responsibility from "@/components/Responsibility";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Timeline />
        <Benefits />
        <BeerPourAnimation />
        <Contemporary />
        <Responsibility />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
