import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import beerVarietiesImage from "@/assets/beer-varieties.jpg";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const beerStyles = [
  {
    country: "Бельгия",
    style: "Ламбик",
    description: "Спонтанное брожение дикими дрожжами. Кислый, сложный вкус с многолетней выдержкой.",
    coordinates: { lat: 50.8503, lng: 4.3517 }
  },
  {
    country: "Германия",
    style: "Вайцен и Лагер",
    description: "Чистота, традиции и Reinheitsgebot. Пшеничное и чистое низовое брожение.",
    coordinates: { lat: 51.1657, lng: 10.4515 }
  },
  {
    country: "Чехия",
    style: "Пилзнер",
    description: "Золотой стандарт светлого пива. Хмельной аромат и чистота вкуса с 1842 года.",
    coordinates: { lat: 49.8175, lng: 15.4730 }
  },
  {
    country: "Англия",
    style: "Эль",
    description: "Верховое брожение, богатые вкусы. От светлого биттера до тёмного стаута.",
    coordinates: { lat: 52.3555, lng: -1.1743 }
  },
  {
    country: "Россия",
    style: "Русский империал и лагер",
    description: "Крепкое тёмное пиво и классический лагер. От имперских стаутов до лёгкого жигулёвского.",
    coordinates: { lat: 55.7558, lng: 37.6173 }
  },
  {
    country: "США",
    style: "IPA и крафт",
    description: "Революция хмеля и креативности. Крафтовое движение вернуло пиву многообразие.",
    coordinates: { lat: 37.0902, lng: -95.7129 }
  }
];

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 30,
  lng: 15
};

const mapOptions = {
  zoom: 2,
  disableDefaultUI: false,
  zoomControl: true,
  scrollwheel: false,
  gestureHandling: 'cooperative'
};

// Замените на ваш Google Maps API ключ
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE";

const Contemporary = () => {
  const [hoveredStyle, setHoveredStyle] = useState<number | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

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

          {/* Interactive Google Map */}
          <div className="relative h-[500px] rounded-xl border-2 border-border overflow-hidden z-0">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                options={mapOptions}
              >
                {beerStyles.map((style, index) => (
                  <Marker
                    key={index}
                    position={style.coordinates}
                    onClick={() => setSelectedMarker(index)}
                  >
                    {selectedMarker === index && (
                      <InfoWindow
                        position={style.coordinates}
                        onCloseClick={() => setSelectedMarker(null)}
                      >
                        <div style={{ padding: '8px', maxWidth: '250px' }}>
                          <h4 style={{ fontWeight: 'bold', marginBottom: '4px', color: 'hsl(36 75% 50%)' }}>
                            {style.country}
                          </h4>
                          <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'hsl(42 85% 65%)' }}>
                            {style.style}
                          </p>
                          <p style={{ fontSize: '12px', lineHeight: '1.5', color: 'hsl(30 20% 45%)' }}>
                            {style.description}
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              </GoogleMap>
            </LoadScript>
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
              onClick={() => setSelectedMarker(index)}
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
