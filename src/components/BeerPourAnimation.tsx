import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import beerFoamImage from "@/assets/beer-foam.jpg";

const BeerPourAnimation = () => {
  const [isPoured, setIsPoured] = useState(false);
  const [isPouring, setIsPouring] = useState(false);

  const handlePour = () => {
    if (isPoured) {
      setIsPoured(false);
      return;
    }
    
    setIsPouring(true);
    setTimeout(() => {
      setIsPouring(false);
      setIsPoured(true);
    }, 3000);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
            Искусство наслаждения
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Нажмите на кружку, чтобы налить пиво
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="shadow-warm hover:shadow-glow transition-all duration-500">
            <CardContent className="p-8">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer group" onClick={handlePour}>
                <div className="absolute inset-0 bg-muted/20 group-hover:bg-muted/40 transition-colors duration-300" />
                
                {/* Empty glass state */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isPoured || isPouring ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-40 border-4 border-primary/50 rounded-b-3xl mx-auto mb-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10" />
                      </div>
                      <p className="text-muted-foreground font-semibold">Нажмите, чтобы налить</p>
                    </div>
                  </div>
                </div>

                {/* Pouring animation - Animated filling */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isPouring ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="relative w-full h-full bg-gradient-to-b from-slate-800 to-slate-900">
                    {/* Glass outline */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-64 border-4 border-amber-200/30 rounded-b-[3rem] relative overflow-hidden">
                        {/* Beer liquid filling animation */}
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400"
                          style={{
                            animation: 'fillGlass 3s ease-out forwards',
                            height: '0%'
                          }}
                        />
                        {/* Foam forming on top */}
                        <div 
                          className="absolute top-0 w-full h-16 bg-gradient-to-b from-amber-100 to-transparent"
                          style={{
                            animation: 'foamAppear 3s ease-out 1.5s forwards',
                            opacity: 0
                          }}
                        />
                        {/* Bubbles */}
                        <div className="absolute inset-0">
                          {[...Array(15)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1 h-1 bg-amber-200/60 rounded-full"
                              style={{
                                left: `${Math.random() * 80 + 10}%`,
                                bottom: '0',
                                animation: `bubbleRise ${2 + Math.random() * 2}s ease-in infinite ${Math.random() * 2}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Pour stream */}
                    <div 
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-amber-400 to-amber-600 opacity-80"
                      style={{
                        animation: 'pourStream 3s ease-out forwards',
                        height: '32px'
                      }}
                    />
                  </div>
                </div>

                {/* Poured state */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isPoured && !isPouring ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={beerFoamImage} 
                    alt="Налитое пиво с пеной" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-warm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-primary">🍺 Правильная температура</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Лагеры — 4-7°C, эли — 8-12°C, стауты — 12-14°C. Температура раскрывает вкус и аромат.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-warm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-primary">🥛 Правильный бокал</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Форма бокала влияет на аромат и пенообразование. Пшеничное пиво — в высоких бокалах, стаут — в тюльпанах.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-warm">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-primary">⏱️ Наслаждайтесь моментом</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Пиво — это не спринт, это марафон. Почувствуйте аромат, оцените цвет, насладитесь вкусом.
                </p>
              </CardContent>
            </Card>

            <Button 
              onClick={handlePour} 
              className="w-full gradient-amber text-foreground font-semibold py-6 text-lg shadow-warm hover:shadow-glow transition-all duration-300"
            >
              {isPoured ? "🔄 Налить снова" : isPouring ? "⏳ Наливаем..." : "🍺 Налить пиво"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeerPourAnimation;
