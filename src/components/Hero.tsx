import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-beer.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance leading-tight">
          Пиво: жидкий хлеб человечества
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-white/90 leading-relaxed">
          Пиво — это не просто напиток. Это история цивилизации в жидком виде. Мы приглашаем тебя взглянуть на него так, как смотрели наши предки — с уважением, любопытством и ответственностью.
        </p>
        <Button 
          size="lg"
          onClick={() => scrollToSection("origins")}
          className="gradient-amber text-foreground font-semibold px-8 py-6 text-lg shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105"
        >
          Начать путешествие
        </Button>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("origins")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce cursor-pointer"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
};

export default Hero;
