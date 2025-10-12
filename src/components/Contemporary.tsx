import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import beerVarietiesImage from "@/assets/beer-varieties.jpg";

const beerStyles = [
  {
    country: "Бельгия",
    style: "Ламбик",
    description: "Спонтанное брожение дикими дрожжами. Кислый, сложный вкус с многолетней выдержкой.",
    position: { top: "28%", left: "48%" }
  },
  {
    country: "Германия",
    style: "Вайцен и Лагер",
    description: "Чистота, традиции и Reinheitsgebot. Пшеничное и чистое низовое брожение.",
    position: { top: "30%", left: "50%" }
  },
  {
    country: "Чехия",
    style: "Пилзнер",
    description: "Золотой стандарт светлого пива. Хмельной аромат и чистота вкуса с 1842 года.",
    position: { top: "32%", left: "52%" }
  },
  {
    country: "Англия",
    style: "Эль",
    description: "Верховое брожение, богатые вкусы. От светлого биттера до тёмного стаута.",
    position: { top: "26%", left: "46%" }
  },
  {
    country: "США",
    style: "IPA и крафт",
    description: "Революция хмеля и креативности. Крафтовое движение вернуло пиву многообразие.",
    position: { top: "38%", left: "22%" }
  }
];

const Contemporary = () => {
  const [hoveredStyle, setHoveredStyle] = useState<number | null>(null);

  return (
    <section id="contemporary" className="py-20 px-6 bg-card relative overflow-hidden">
      {/* Background decorative image */}
      <div className="absolute bottom-0 right-0 w-2/5 h-80 opacity-10 pointer-events-none">
        <img src={beerVarietiesImage} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
            От индустриального пива к культурному возрождению
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            В XX веке пиво стало массовым и обезличенным, но в XXI веке произошло возрождение ремесла, вкусов и традиций. Крафтовое движение вернуло пиву его историческое многообразие.
          </p>
        </div>

        {/* World Map Visualization */}
        <div className="relative w-full max-w-5xl mx-auto mb-12 p-8 bg-muted/30 rounded-2xl overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Традиционные стили пива мира
            </h3>
            <p className="text-muted-foreground">
              Каждый регион внёс свой вклад в пивную культуру
            </p>
          </div>

          {/* Simplified World Map (decorative) */}
          <div className="relative h-[400px] bg-gradient-to-br from-primary/5 to-accent/10 rounded-xl border-2 border-border overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_0%,_transparent_50%)]" />
            
            {/* Map Markers */}
            {beerStyles.map((style, index) => (
              <div
                key={index}
                className="absolute group cursor-pointer animate-fade-in"
                style={{ 
                  top: style.position.top, 
                  left: style.position.left,
                  animationDelay: `${index * 0.15}s`
                }}
              >
                <div className="relative">
                  <MapPin className="w-8 h-8 text-primary drop-shadow-lg group-hover:scale-125 transition-transform duration-300" fill="currentColor" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <Card className="w-64 shadow-glow">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-primary mb-1">{style.country}</h4>
                        <p className="text-sm font-semibold text-accent mb-2">{style.style}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {style.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beer Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beerStyles.map((style, index) => (
            <Card 
              key={index} 
              className={`shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer ${
                hoveredStyle === index ? 'ring-2 ring-primary' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredStyle(index)}
              onMouseLeave={() => setHoveredStyle(null)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{style.country}</h4>
                    <p className="text-accent font-semibold text-sm">{style.style}</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {style.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contemporary;
