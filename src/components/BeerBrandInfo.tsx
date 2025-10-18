import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Search } from "lucide-react";

const BeerBrandInfo = () => {
  const [brandName, setBrandName] = useState("");
  const [beerInfo, setBeerInfo] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyzeBrand = async () => {
    if (!brandName.trim()) {
      toast({
        title: "Введите название",
        description: "Пожалуйста, укажите марку пива",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-beer-brand', {
        body: { brandName: brandName.trim() }
      });

      if (error) throw error;

      setBeerInfo(data.info);
      toast({
        title: "Информация получена!",
        description: "Анализ марки пива завершён"
      });
    } catch (error) {
      console.error('Error analyzing brand:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось получить информацию о пиве",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBrandName("");
    setBeerInfo("");
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-accent/10 to-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent">
            Узнай о своём любимом пиве
          </h2>
          <p className="text-xl text-muted-foreground">
            Введите марку пива и получите подробную информацию о нём
          </p>
        </div>

        {!beerInfo ? (
          <Card className="border-2 border-amber-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Какое пиво вы любите?</CardTitle>
              <CardDescription>
                Например: Guinness, Corona, Балтика 3, Carlsberg, Hoegaarden
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="brand-name" className="text-lg font-semibold">
                  Название марки пива
                </Label>
                <Input
                  id="brand-name"
                  placeholder="Введите название..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAnalyzeBrand();
                    }
                  }}
                  className="text-lg py-6"
                />
              </div>

              <Button 
                onClick={handleAnalyzeBrand} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-6 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Анализируем пиво...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Получить информацию
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-amber-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Информация о {brandName}</CardTitle>
              <CardDescription>Подробный анализ марки пива</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-amber max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-foreground">{beerInfo}</div>
              </div>
              <Button 
                onClick={handleReset}
                variant="outline"
                className="w-full border-amber-500/50 hover:bg-amber-500/10"
              >
                Узнать о другом пиве
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default BeerBrandInfo;
