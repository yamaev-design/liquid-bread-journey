import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import beerVarietiesImage from "@/assets/beer-varieties.jpg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const beerStyles = [
  {
    country: "Бельгия",
    style: "Ламбик",
    description: "Спонтанное брожение дикими дрожжами. Кислый, сложный вкус с многолетней выдержкой.",
    coordinates: [50.8503, 4.3517] as [number, number]
  },
  {
    country: "Германия",
    style: "Вайцен и Лагер",
    description: "Чистота, традиции и Reinheitsgebot. Пшеничное и чистое низовое брожение.",
    coordinates: [51.1657, 10.4515] as [number, number]
  },
  {
    country: "Чехия",
    style: "Пилзнер",
    description: "Золотой стандарт светлого пива. Хмельной аромат и чистота вкуса с 1842 года.",
    coordinates: [49.8175, 15.4730] as [number, number]
  },
  {
    country: "Англия",
    style: "Эль",
    description: "Верховое брожение, богатые вкусы. От светлого биттера до тёмного стаута.",
    coordinates: [52.3555, -1.1743] as [number, number]
  },
  {
    country: "США",
    style: "IPA и крафт",
    description: "Революция хмеля и креативности. Крафтовое движение вернуло пиву многообразие.",
    coordinates: [37.0902, -95.7129] as [number, number]
  }
];

const Contemporary = () => {
  const [hoveredStyle, setHoveredStyle] = useState<number | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([30, 15], 2);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Disable scroll zoom
    map.scrollWheelZoom.disable();

    // Add markers with popups
    beerStyles.forEach((style) => {
      const marker = L.marker(style.coordinates, { icon: DefaultIcon }).addTo(map);
      marker.bindPopup(`
        <div style="padding: 8px;">
          <h4 style="font-weight: bold; margin-bottom: 4px; color: hsl(var(--primary));">${style.country}</h4>
          <p style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: hsl(var(--accent));">${style.style}</p>
          <p style="font-size: 12px; line-height: 1.5; color: hsl(var(--muted-foreground));">${style.description}</p>
        </div>
      `);
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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

          {/* Interactive World Map */}
          <div 
            ref={mapRef}
            className="relative h-[500px] rounded-xl border-2 border-border overflow-hidden z-0"
          />
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
