import { Quote, Book, Users2, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
const resources = [{
  icon: Book,
  title: "Исторические музеи",
  description: "Музей пива в Мюнхене, Pilsner Urquell Museum в Пльзени"
}, {
  icon: Users2,
  title: "Клубы любителей",
  description: "Homebrew клубы, дегустационные сообщества, пивные туры"
}, {
  icon: GraduationCap,
  title: "Образовательные ресурсы",
  description: "Книги, документальные фильмы, курсы пивоварения"
}];
const Responsibility = () => {
  return <section id="responsibility" className="py-20 px-6 bg-gradient-to-b from-background to-card">
      <div className="max-w-5xl mx-auto">
        {/* Quote Block */}
        <div className="mb-16 animate-fade-in">
          <div className="relative bg-gradient-amber p-12 md:p-16 rounded-3xl shadow-glow">
            <Quote className="absolute top-8 left-8 w-16 h-16 text-primary-foreground/20" />
            <blockquote className="relative z-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance leading-relaxed mb-6 text-slate-950">
                Пиво — это хлеб, вода, труд и время. Оно соединяет прошлое и настоящее. Наслаждайся им с уважением — как частью человеческой культуры.
              </p>
              <footer className="text-lg md:text-xl text-primary-foreground/80 font-medium bg-slate-950">
                — Мудрость веков
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary animate-fade-in">
            Узнай больше о культуре пива
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
            const Icon = resource.icon;
            return <Card key={index} className="shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105 animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-amber rounded-full flex items-center justify-center mx-auto mb-4 shadow-warm">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-foreground">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center animate-fade-in">
          <Card className="bg-muted/50 border-2 border-border">
            <CardContent className="p-8">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                <strong className="text-foreground">Важное примечание:</strong> Этот проект носит исключительно просветительский и образовательный характер. Мы представляем исторические и культурные аспекты пивоварения как часть человеческого наследия. Мы выступаем за ответственное и осознанное потребление любых напитков. Чрезмерное употребление алкоголя вредит вашему здоровью.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Responsibility;