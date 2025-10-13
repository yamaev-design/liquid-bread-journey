import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trophy, RefreshCw, LogOut } from "lucide-react";

interface Snack {
  id: number;
  name: string;
  votes: number;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadSnacks();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Check if user has admin role
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (roleData) {
        setIsAuthenticated(true);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - in production, use proper auth
    if (password === "beeradmin2024") {
      // Check if there's already an admin user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Ошибка",
          description: "Сначала нужно войти в систему",
          variant: "destructive"
        });
        return;
      }

      // Give admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: user.id, role: 'admin' });

      if (error && !error.message.includes('duplicate')) {
        toast({
          title: "Ошибка",
          description: "Не удалось войти",
          variant: "destructive"
        });
        return;
      }

      setIsAuthenticated(true);
      toast({
        title: "Успешно",
        description: "Вы вошли в админ-панель"
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Неверный пароль",
        variant: "destructive"
      });
    }
  };

  const loadSnacks = async () => {
    const { data, error } = await supabase
      .from('snacks')
      .select('*')
      .order('votes', { ascending: false });
    
    if (data && !error) {
      setSnacks(data);
      setTotalVotes(data.reduce((sum, snack) => sum + snack.votes, 0));
    }
  };

  const handleResetVotes = async () => {
    if (!confirm('Вы уверены, что хотите сбросить все голоса?')) return;
    
    setLoading(true);
    try {
      // Reset all votes to 0
      const { error: updateError } = await supabase
        .from('snacks')
        .update({ votes: 0 })
        .neq('id', 0);

      if (updateError) throw updateError;

      // Delete all IP records
      const { error: deleteError } = await supabase
        .from('snack_votes_ips')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (deleteError) throw deleteError;

      toast({
        title: "Успешно",
        description: "Все голоса сброшены"
      });
      
      loadSnacks();
    } catch (error) {
      console.error('Reset error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сбросить голоса",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-card p-6">
        <Card className="w-full max-w-md shadow-warm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Админ-панель "Битва закусок"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full gradient-amber text-foreground font-semibold">
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Админ-панель "Битва закусок"
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/admin-login')}
              variant="outline"
              className="gap-2"
            >
              Админ-панель
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="gap-2"
            >
              На главную
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </Button>
          </div>
        </div>

        <Card className="mb-6 shadow-warm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-primary">{totalVotes}</p>
                <p className="text-muted-foreground">Всего голосов</p>
              </div>
              <Button
                onClick={handleResetVotes}
                disabled={loading}
                variant="destructive"
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Сбросить все голоса
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {snacks.map((snack, index) => {
            const percentage = totalVotes > 0 ? Math.round((snack.votes / totalVotes) * 100) : 0;
            return (
              <Card key={snack.id} className="shadow-warm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {index === 0 && snack.votes > 0 && (
                        <Trophy className="w-6 h-6 text-yellow-500" />
                      )}
                      <h3 className="text-xl font-semibold">{snack.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{snack.votes}</p>
                      <p className="text-sm text-muted-foreground">{percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-amber transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
