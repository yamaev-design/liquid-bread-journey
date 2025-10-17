import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Benefits from "@/components/Benefits";
import BeerPourAnimation from "@/components/BeerPourAnimation";
import BeerSnacks from "@/components/BeerSnacks";
import Contemporary from "@/components/Contemporary";
import BeerRecipeGenerator from "@/components/BeerRecipeGenerator";
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
        <BeerSnacks />
        <Contemporary />
        <BeerRecipeGenerator />
        <Responsibility />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
