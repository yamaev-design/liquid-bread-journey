import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Fish, Nut, Cookie, Beef, Pizza } from "lucide-react";
import beerSnacksImage from "@/assets/beer-snacks.jpg";
import snackCrackersImage from "@/assets/snack-crackers.jpg";
import snackNutsImage from "@/assets/snack-nuts.jpg";
import snackFishImage from "@/assets/snack-fish.jpg";
import snackMeatImage from "@/assets/snack-meat.jpg";
import snackChipsImage from "@/assets/snack-chips.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Snack {
  id: number;
  name: string;
  description: string;
  icon: any;
  image: string;
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
    image: snackCrackersImage,
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
    image: snackNutsImage,
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
    image: snackFishImage,
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
    image: snackMeatImage,
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
    image: snackChipsImage,
    pros: ["Хрустящие", "Много вкусов", "Быстро едятся"],
    cons: ["Неполезные", "Жирные", "Быстро размокают"],
    bestWith: "Любое светлое пиво",
    votes: 0
  }
];

const BeerSnacks = () => {
  const [snackVotes, setSnackVotes] = useState(snacks);
  const [votedSnacks, setVotedSnacks] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load snacks from database
  useEffect(() => {
    loadSnacks();
    checkVotedSnacks();
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

  const checkVotedSnacks = () => {
    // Check localStorage for voted snacks
    const voted = localStorage.getItem('beer_snack_voted');
    if (voted) {
      try {
        const votedIds = JSON.parse(voted);
        setVotedSnacks(Array.isArray(votedIds) ? votedIds : []);
      } catch {
        setVotedSnacks([]);
      }
    }
  };

  const handleVote = async (id: number) => {
    if (votedSnacks.includes(id) || loading) return;
    
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

      const newVotedSnacks = [...votedSnacks, id];
      setVotedSnacks(newVotedSnacks);
      localStorage.setItem('beer_snack_voted', JSON.stringify(newVotedSnacks));
      
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
    setVotedSnacks([]);
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
          {votedSnacks.length > 0 && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <p className="text-accent font-semibold">
                ✅ Вы проголосовали за {votedSnacks.length} {votedSnacks.length === 1 ? 'закуску' : 'закуски'}! Всего голосов: {totalVotes}
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
            const hasVoted = votedSnacks.includes(snack.id);
            const votePercentage = totalVotes > 0 ? Math.round((snack.votes / totalVotes) * 100) : 0;
            const isLeader = index === 0 && snack.votes > 0;

            return (
              <Card
                key={snack.id}
                className={`shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in relative overflow-hidden ${
                  hasVoted ? 'ring-2 ring-primary scale-105' : ''
                } ${isLeader ? 'border-2 border-primary' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleVote(snack.id)}
              >
                {isLeader && (
                  <div className="absolute top-2 right-2 bg-gradient-amber text-foreground px-3 py-1 rounded-full text-xs font-bold shadow-warm z-10">
                    👑 Лидер
                  </div>
                )}

                {/* Snack Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={snack.image} 
                    alt={snack.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                </div>

                {votedSnacks.length > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-2 bg-muted/30 z-20">
                    <div 
                      className="h-full gradient-amber transition-all duration-500"
                      style={{ width: `${votePercentage}%` }}
                    />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-amber rounded-full flex items-center justify-center shadow-warm">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl">{snack.name}</CardTitle>
                    </div>
                    {votedSnacks.length > 0 && (
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

                  {!hasVoted && (
                    <Button 
                      className="w-full gradient-amber text-foreground font-semibold shadow-warm hover:shadow-glow transition-all"
                      onClick={() => handleVote(snack.id)}
                      disabled={loading}
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      {loading ? 'Голосую...' : 'Проголосовать'}
                    </Button>
                  )}

                  {hasVoted && (
                    <div className="flex items-center justify-center gap-2 text-sm bg-primary/10 py-2 rounded-lg">
                      <ThumbsUp className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">
                        ✅ Вы проголосовали
                      </span>
                    </div>
                  )}
                  
                  {votedSnacks.length > 0 && (
                    <div className="text-center mt-2 text-sm text-muted-foreground">
                      {snack.votes} {snack.votes === 1 ? 'голос' : 'голосов'}
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
