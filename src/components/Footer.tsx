import { Beer, Mail, Heart } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-amber rounded-full shadow-warm">
                <Beer className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">Жидкий хлеб</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Просветительский проект о тысячелетней истории пива и его роли в развитии человеческой цивилизации.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Разделы</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => document.getElementById("origins")?.scrollIntoView({
                behavior: "smooth"
              })} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Истоки пивоварения
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("benefits")?.scrollIntoView({
                behavior: "smooth"
              })} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Польза и культура
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("contemporary")?.scrollIntoView({
                behavior: "smooth"
              })} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Современность
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById("responsibility")?.scrollIntoView({
                behavior: "smooth"
              })} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ответственность
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Связь</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Mail className="w-4 h-4" />
              <span>info@beerheritage.com</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Если у вас есть вопросы, предложения или вы хотите внести свой вклад в проект, свяжитесь с нами.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Жидкий хлеб. Все права защищены. Проект носит просветительский характер.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Сделано с</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span>для любителей bp 10-24 </span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;