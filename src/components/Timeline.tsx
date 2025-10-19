import { Scroll, Pyramid, Church, Ship, Beer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import beerPourImage from "@/assets/beer-pour.jpg";
import sumerianImage from "@/assets/timeline-sumerians.jpg";
import egyptImage from "@/assets/timeline-egypt.jpg";
import monksImage from "@/assets/timeline-monks.jpg";
import hanseaticImage from "@/assets/timeline-hanseatic.jpg";
import bavariaImage from "@/assets/timeline-bavaria.jpg";

const timelineEvents = [
  {
    icon: Scroll,
    title: "Шумеры",
    period: "6-7 тыс. лет назад",
    description: "Клинописные таблички хранят древнейшие рецепты пивоварения. Шумеры почитали богиню Нинкаси — покровительницу пива.",
    fact: "Гимн Нинкаси — это одновременно молитва и рецепт пива",
    image: sumerianImage
  },
  {
    icon: Pyramid,
    title: "Египет",
    period: "3000 г. до н.э.",
    description: "Пиво было ежедневной пищей для фараонов и строителей пирамид. Его пили все — от детей до жрецов.",
    fact: "Рабочим давали пиво как часть зарплаты",
    image: egyptImage
  },
  {
    icon: Church,
    title: "Средневековые монахи",
    period: "VI-XV века",
    description: "В постные дни монахи называли пиво 'жидким хлебом' (Flüssiges Brot). Монастыри стали центрами пивоварения.",
    fact: "Монахи могли выпивать до 5 литров пива в день во время поста",
    image: monksImage
  },
  {
    icon: Ship,
    title: "Ганзейские купцы",
    period: "XII-XVII века",
    description: "Пивные гильдии процветали в торговых городах. Пиво стало валютой и гарантией качества.",
    fact: "Гамбургское пиво поставлялось во все порты Балтики",
    image: hanseaticImage
  },
  {
    icon: Beer,
    title: "Бавария",
    period: "XVI век - наше время",
    description: "Закон о чистоте пива (Reinheitsgebot) 1516 года. Появление лагера благодаря холодному брожению.",
    fact: "Баварские пивовары изобрели лагер, храня пиво в холодных пещерах",
    image: bavariaImage
  }
];

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  return (
    <section id="origins" className="py-20 px-6 bg-card relative overflow-hidden">
      {/* Background decorative image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
        <img src={beerPourImage} alt="" className="w-full h-full object-cover rounded-full blur-sm" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
            Истоки пивоварения
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Путешествие от шумерских табличек до средневековых монастырей
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary transform -translate-x-1/2" />

          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col gap-8 animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-5/12">
                    <Card 
                      className={`shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden ${
                        selectedEvent === index ? 'ring-2 ring-primary scale-105' : ''
                      }`}
                      onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                    >
                      {/* Image Header */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        <div className="absolute bottom-3 left-3 p-3 bg-gradient-amber rounded-full shadow-warm">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-bold mb-1 text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-sm text-accent font-semibold mb-3">
                          {event.period}
                        </p>
                        <p className="text-muted-foreground mb-3 leading-relaxed">
                          {event.description}
                        </p>
                        <p className="text-sm italic text-primary bg-primary/10 p-3 rounded-lg border-l-4 border-primary">
                          💡 {event.fact}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-6 h-6 bg-primary rounded-full shadow-glow border-4 border-background" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
