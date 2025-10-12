import { Scroll, Pyramid, Church, Ship, Beer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const timelineEvents = [
  {
    icon: Scroll,
    title: "Шумеры",
    period: "6-7 тыс. лет назад",
    description: "Клинописные таблички хранят древнейшие рецепты пивоварения. Шумеры почитали богиню Нинкаси — покровительницу пива.",
    fact: "Гимн Нинкаси — это одновременно молитва и рецепт пива"
  },
  {
    icon: Pyramid,
    title: "Египет",
    period: "3000 г. до н.э.",
    description: "Пиво было ежедневной пищей для фараонов и строителей пирамид. Его пили все — от детей до жрецов.",
    fact: "Рабочим давали пиво как часть зарплаты"
  },
  {
    icon: Church,
    title: "Средневековые монахи",
    period: "VI-XV века",
    description: "В постные дни монахи называли пиво 'жидким хлебом' (Flüssiges Brot). Монастыри стали центрами пивоварения.",
    fact: "Монахи могли выпивать до 5 литров пива в день во время поста"
  },
  {
    icon: Ship,
    title: "Ганзейские купцы",
    period: "XII-XVII века",
    description: "Пивные гильдии процветали в торговых городах. Пиво стало валютой и гарантией качества.",
    fact: "Гамбургское пиво поставлялось во все порты Балтики"
  },
  {
    icon: Beer,
    title: "Бавария",
    period: "XVI век - наше время",
    description: "Закон о чистоте пива (Reinheitsgebot) 1516 года. Появление лагера благодаря холодному брожению.",
    fact: "Баварские пивовары изобрели лагер, храня пиво в холодных пещерах"
  }
];

const Timeline = () => {
  return (
    <section id="origins" className="py-20 px-6 bg-card">
      <div className="max-w-7xl mx-auto">
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
                    <Card className="shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-gradient-amber rounded-full shadow-warm">
                            <Icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
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
                          </div>
                        </div>
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
