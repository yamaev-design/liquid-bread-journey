import { Droplets, Heart, Users, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import beerVarietiesImage from "@/assets/beer-varieties.jpg";
import beerBubblesImage from "@/assets/beer-bubbles.jpg";

const benefits = [
  {
    icon: Droplets,
    title: "Брожение и безопасность",
    description: "Процесс брожения убивал патогены, делая пиво безопаснее загрязнённой воды. В средневековье это спасло миллионы жизней.",
  },
  {
    icon: Heart,
    title: "Питательная ценность",
    description: "Пиво содержит витамины группы B, минералы и аминокислоты из солода и дрожжей. Это был полноценный источник калорий и питательных веществ.",
  },
  {
    icon: Users,
    title: "Социальная роль",
    description: "Монастыри, гильдии, праздники — пиво объединяло людей. Пивоварение было важной частью общественной и экономической жизни.",
  },
  {
    icon: Lightbulb,
    title: "Мифы и факты",
    description: "Кликните, чтобы узнать правду",
  },
];

const myths = [
  { myth: "Пиво всегда было алкогольным напитком", fact: "В древности пиво было едой и часто имело низкое содержание алкоголя (2-3%)" },
  { myth: "Пиво пили только взрослые", fact: "В средневековье пиво пили все, включая детей — оно было безопаснее воды" },
  { myth: "Пиво — современное изобретение", fact: "Пивоварению более 7000 лет — это один из древнейших напитков человечества" },
];

const Benefits = () => {
  const [currentMyth, setCurrentMyth] = useState(0);
  const [showFact, setShowFact] = useState(false);

  const toggleMyth = () => {
    if (showFact) {
      setCurrentMyth((prev) => (prev + 1) % myths.length);
      setShowFact(false);
    } else {
      setShowFact(true);
    }
  };

  return (
    <section id="benefits" className="py-20 px-6 bg-background relative overflow-hidden">
      {/* Background decorative images */}
      <div className="absolute top-20 right-0 w-1/3 h-64 opacity-10 pointer-events-none">
        <img src={beerBubblesImage} alt="" className="w-full h-full object-cover rounded-l-3xl" />
      </div>
      <div className="absolute bottom-20 left-0 w-1/4 h-48 opacity-10 pointer-events-none">
        <img src={beerVarietiesImage} alt="" className="w-full h-full object-cover rounded-r-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
            Польза и культурное значение пива
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Тысячелетиями пиво было источником пищи, безопасности и традиций
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isMyth = benefit.title === "Мифы и факты";

            return (
              <Card
                key={index}
                className={`shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in ${
                  isMyth ? "cursor-pointer bg-gradient-to-br from-accent/20 to-primary/20" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={isMyth ? toggleMyth : undefined}
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-amber rounded-full flex items-center justify-center mb-4 shadow-warm">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isMyth ? (
                    <div className="min-h-[120px] flex flex-col justify-center">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                        {showFact ? "✅ Факт:" : "❓ Миф:"}
                      </p>
                      <p className="text-foreground leading-relaxed">
                        {showFact ? myths[currentMyth].fact : myths[currentMyth].myth}
                      </p>
                      <p className="text-xs text-accent mt-4 font-medium">
                        {showFact ? "Нажмите для следующего мифа" : "Нажмите, чтобы узнать правду"}
                      </p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
