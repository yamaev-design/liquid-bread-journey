import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Fish, Nut, Cookie, Beef, Pizza } from "lucide-react";
import beerSnacksImage from "@/assets/beer-snacks.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Snack {
  id: number;
  name: string;
  description: string;
  icon: any;
  pros: string[];
  cons: string[];
  bestWith: string;
  votes: number;
}

const snacks: Snack[] = [
  {
    id: 1,
    name: "Сухарики",
    description: "Классика пивных посиделок. Хрустящие, солёные, с разнообразными вкусами.",
    icon: Cookie,
    pros: ["Доступны везде", "Много вкусов", "Долго хранятся"],
    cons: ["Могут быть слишком солёными", "Быстро заканчиваются"],
    bestWith: "Светлое пиво, лагер",
    votes: 0
  },
  {
    id: 2,
    name: "Орешки",
    description: "Солёный арахис, фисташки или миндаль — питательная и вкусная закуска.",
    icon: Nut,
    pros: ["Питательные", "Много белка", "Сытные"],
    cons: ["Высокая калорийность", "Возможна аллергия"],
    bestWith: "Эль, IPA, тёмное пиво",
    votes: 0
  },
  {
    id: 3,
    name: "Сушёная и вяленая рыба",
    description: "Традиционная русская закуска. Таранка, вобла, анчоусы.",
    icon: Fish,
    pros: ["Традиционная закуска", "Богата белком", "Уникальный вкус"],
    cons: ["Сильный запах", "Специфический вкус", "Кости"],
    bestWith: "Светлое пиво, пилзнер",
    votes: 0
  },
  {
    id: 4,
    name: "Мясные закуски",
    description: "Колбаски, снеки, вяленое мясо, охотничьи колбаски.",
    icon: Beef,
    pros: ["Сытные", "Хорошо сочетаются", "Разнообразие"],
    cons: ["Дорогие", "Калорийные", "Быстро портятся"],
    bestWith: "Тёмное пиво, стаут, портер",
    votes: 0
  },
  {
    id: 5,
    name: "Картофельные чипсы",
    description: "Тонкие, хрустящие, солёные. Всегда под рукой.",
    icon: Pizza,
    pros: ["Хрустящие", "Много вкусов", "Быстро едятся"],
    cons: ["Неполезные", "Жирные", "Быстро размокают"],
    bestWith: "Любое светлое пиво",
    votes: 0
  }
];

const BeerSnacks = () => {
  const [snackVotes, setSnackVotes] = useState(snacks);
  const [selectedSnack, setSelectedSnack] = useState<number | null>(null);
  const [userVoted, setUserVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load snacks from database
  useEffect(() => {
    loadSnacks();
    checkIfVoted();
  }, []);

  const loadSnacks = async () => {
    const { data, error } = await supabase
      .from('snacks')
      .select('*')
      .order('id');
    
    if (data && !error) {
      const updatedSnacks = snacks.map(snack => {
        const dbSnack = data.find(d => d.id === snack.id);
        return dbSnack ? { ...snack, votes: dbSnack.votes } : snack;
      });
      setSnackVotes(updatedSnacks);
    }
  };

  const checkIfVoted = async () => {
    // Check localStorage first for client-side persistence
    const voted = localStorage.getItem('beer_snack_voted');
    if (voted) {
      setUserVoted(true);
      setSelectedSnack(parseInt(voted));
    }
  };

  const handleVote = async (id: number) => {
    if (userVoted || loading) return;
    
    setLoading(true);
    try {
      const response = await supabase.functions.invoke('vote-snack', {
        body: { snackId: id }
      });

      if (response.error) {
        toast({
          title: "Ошибка",
          description: response.error.message || "Не удалось проголосовать",
          variant: "destructive"
        });
        return;
      }

      if (response.data?.error) {
        toast({
          title: "Уже проголосовали",
          description: response.data.error,
          variant: "destructive"
        });
        return;
      }

      // Update local state with fresh data from server
      if (response.data?.snacks) {
        const updatedSnacks = snacks.map(snack => {
          const dbSnack = response.data.snacks.find((d: any) => d.id === snack.id);
          return dbSnack ? { ...snack, votes: dbSnack.votes } : snack;
        });
        setSnackVotes(updatedSnacks);
      }

      setUserVoted(true);
      setSelectedSnack(id);
      localStorage.setItem('beer_snack_voted', id.toString());
      
      toast({
        title: "Спасибо за голос!",
        description: "Ваш голос учтён"
      });
    } catch (error) {
      console.error('Vote error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось проголосовать. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetVotes = () => {
    localStorage.removeItem('beer_snack_voted');
    setUserVoted(false);
    setSelectedSnack(null);
    loadSnacks();
  };

  const totalVotes = snackVotes.reduce((sum, snack) => sum + snack.votes, 0);
  const sortedSnacks = [...snackVotes].sort((a, b) => b.votes - a.votes);

  return (
    <section id="snacks" className="py-20 px-6 bg-gradient-to-b from-card to-background relative overflow-hidden">
      {/* Background decorative image */}
      <div className="absolute top-1/2 right-0 w-1/3 h-96 opacity-10 pointer-events-none -translate-y-1/2">
        <img src={beerSnacksImage} alt="" className="w-full h-full object-cover rounded-l-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
            Битва закусок к пиву
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Извечный вопрос: что лучше подходит к пиву? Проголосуй за свою любимую закуску!
          </p>
          {userVoted && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <p className="text-accent font-semibold">
                ✅ Спасибо за голос! Всего голосов: {totalVotes}
              </p>
              <Button 
                onClick={resetVotes}
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform"
              >
                🔄 Сбросить голосование
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedSnacks.map((snack, index) => {
            const Icon = snack.icon;
            const isSelected = selectedSnack === snack.id;
            const votePercentage = totalVotes > 0 ? Math.round((snack.votes / totalVotes) * 100) : 0;
            const isLeader = index === 0 && snack.votes > 0;

            return (
              <Card
                key={snack.id}
                className={`shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in relative overflow-hidden ${
                  isSelected ? 'ring-2 ring-primary scale-105' : ''
                } ${isLeader ? 'border-2 border-primary' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleVote(snack.id)}
              >
                {isLeader && (
                  <div className="absolute top-2 right-2 bg-gradient-amber text-foreground px-3 py-1 rounded-full text-xs font-bold shadow-warm z-10">
                    👑 Лидер
                  </div>
                )}

                {userVoted && (
                  <div className="absolute top-0 left-0 right-0 h-2 bg-muted/30">
                    <div 
                      className="h-full gradient-amber transition-all duration-500"
                      style={{ width: `${votePercentage}%` }}
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-amber rounded-full flex items-center justify-center mb-4 shadow-warm">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">{snack.name}</CardTitle>
                    {userVoted && (
                      <span className="text-sm font-bold text-primary">
                        {votePercentage}%
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {snack.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
                        ✅ Плюсы:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {snack.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                        ❌ Минусы:
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {snack.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <p className="text-xs font-semibold text-accent mb-1">
                        🍺 Лучше всего с:
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        {snack.bestWith}
                      </p>
                    </div>
                  </div>

                  {!userVoted && (
                    <Button 
                      className="w-full gradient-amber text-foreground font-semibold shadow-warm hover:shadow-glow transition-all"
                      onClick={() => handleVote(snack.id)}
                      disabled={loading}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      {loading ? 'Голосую...' : 'Проголосовать'}
                    </Button>
                  )}

                  {userVoted && (
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <ThumbsUp className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">
                        {snack.votes} {snack.votes === 1 ? 'голос' : 'голосов'}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-warm bg-gradient-to-br from-accent/10 to-primary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              💡 Золотое правило закусок к пиву
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-4">
              Лучшая закуска — та, которая не перебивает вкус пива, а дополняет его. 
              Солёные закуски подчёркивают горечь хмеля, жирные — смягчают её. 
              Главное — умеренность и удовольствие!
            </p>
            <p className="text-sm text-accent font-semibold">
              Помни: закуска создаёт атмосферу, но главное — это компания и сам напиток 🍻
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BeerSnacks;
