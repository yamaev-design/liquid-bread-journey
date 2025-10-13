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
            {/* SVG World Map Background */}
            <svg 
              viewBox="0 0 1000 500" 
              className="absolute inset-0 w-full h-full opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* North America */}
              <path d="M150,100 L180,80 L220,85 L240,100 L250,130 L245,160 L230,180 L200,190 L170,185 L150,170 L140,140 Z" 
                fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="1"/>
              
              {/* South America */}
              <path d="M230,250 L250,230 L270,240 L275,270 L280,310 L270,340 L250,360 L230,350 L220,320 L215,290 Z" 
                fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="1"/>
              
              {/* Europe */}
              <path d="M470,110 L500,100 L530,105 L540,125 L535,145 L520,155 L500,160 L480,150 L465,135 Z" 
                fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1"/>
              
              {/* Africa */}
              <path d="M480,190 L510,185 L540,200 L550,230 L555,270 L545,310 L520,330 L490,325 L470,300 L465,260 L468,220 Z" 
                fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="1"/>
              
              {/* Asia */}
              <path d="M550,80 L620,75 L680,85 L730,100 L760,130 L770,160 L760,190 L730,200 L680,195 L640,185 L600,170 L570,150 L555,125 Z" 
                fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="1"/>
              
              {/* Australia */}
              <path d="M750,320 L780,315 L810,325 L820,345 L815,365 L790,375 L760,370 L745,355 Z" 
                fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="1"/>
              
              {/* Grid lines for reference */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.3"/>
              <line x1="500" y1="0" x2="500" y2="500" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.3"/>
            </svg>
            
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
