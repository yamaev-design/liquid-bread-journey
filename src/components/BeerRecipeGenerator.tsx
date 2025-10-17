import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const BeerRecipeGenerator = () => {
  const [preferences, setPreferences] = useState({
    color: "",
    bitterness: "",
    strength: "",
    style: ""
  });
  const [recipe, setRecipe] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateRecipe = async () => {
    if (!preferences.color || !preferences.bitterness || !preferences.strength || !preferences.style) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, ответьте на все вопросы опроса",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-beer-recipe', {
        body: { preferences }
      });

      if (error) throw error;

      setRecipe(data.recipe);
      toast({
        title: "Рецепт готов!",
        description: "Ваш персональный рецепт пива создан"
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать рецепт",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPreferences({
      color: "",
      bitterness: "",
      strength: "",
      style: ""
    });
    setRecipe("");
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Создай своё пиво
          </h2>
          <p className="text-xl text-muted-foreground">
            Ответьте на несколько вопросов и получите персональный рецепт
          </p>
        </div>

        {!recipe ? (
          <Card className="border-2 border-amber-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Расскажите о своих предпочтениях</CardTitle>
              <CardDescription>Опрос займёт всего минуту</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Какой цвет пива вы предпочитаете?</Label>
                <RadioGroup value={preferences.color} onValueChange={(value) => setPreferences({...preferences, color: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="светлое" id="light" />
                    <Label htmlFor="light" className="cursor-pointer">Светлое (золотистое, соломенное)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="янтарное" id="amber" />
                    <Label htmlFor="amber" className="cursor-pointer">Янтарное (медное, карамельное)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="тёмное" id="dark" />
                    <Label htmlFor="dark" className="cursor-pointer">Тёмное (коричневое, чёрное)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Какая горечь вам нравится?</Label>
                <RadioGroup value={preferences.bitterness} onValueChange={(value) => setPreferences({...preferences, bitterness: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="низкая" id="low-bitter" />
                    <Label htmlFor="low-bitter" className="cursor-pointer">Низкая (мягкое, сладковатое)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="средняя" id="medium-bitter" />
                    <Label htmlFor="medium-bitter" className="cursor-pointer">Средняя (сбалансированное)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="высокая" id="high-bitter" />
                    <Label htmlFor="high-bitter" className="cursor-pointer">Высокая (хмелевое, горькое)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Какую крепость предпочитаете?</Label>
                <RadioGroup value={preferences.strength} onValueChange={(value) => setPreferences({...preferences, strength: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="лёгкое" id="light-strength" />
                    <Label htmlFor="light-strength" className="cursor-pointer">Лёгкое (3-4% ABV)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="среднее" id="medium-strength" />
                    <Label htmlFor="medium-strength" className="cursor-pointer">Среднее (4.5-6% ABV)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="крепкое" id="strong-strength" />
                    <Label htmlFor="strong-strength" className="cursor-pointer">Крепкое (6.5%+ ABV)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold">Какой стиль пива вас интересует?</Label>
                <RadioGroup value={preferences.style} onValueChange={(value) => setPreferences({...preferences, style: value})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="лагер" id="lager" />
                    <Label htmlFor="lager" className="cursor-pointer">Лагер (чистое, освежающее)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="эль" id="ale" />
                    <Label htmlFor="ale" className="cursor-pointer">Эль (фруктовое, сложное)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="пшеничное" id="wheat" />
                    <Label htmlFor="wheat" className="cursor-pointer">Пшеничное (мягкое, пряное)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="стаут" id="stout" />
                    <Label htmlFor="stout" className="cursor-pointer">Стаут/Портер (насыщенное, кофейное)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={handleGenerateRecipe} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-6 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Создаём ваш рецепт...
                  </>
                ) : (
                  "Получить рецепт"
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-amber-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Ваш персональный рецепт</CardTitle>
              <CardDescription>Сохраните его для домашнего пивоварения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-amber max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-foreground">{recipe}</div>
              </div>
              <Button 
                onClick={handleReset}
                variant="outline"
                className="w-full border-amber-500/50 hover:bg-amber-500/10"
              >
                Создать новый рецепт
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default BeerRecipeGenerator;
