import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { brandName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Ты эксперт в области пивоварения и пивных брендов. 
На основе названия марки пива предоставь максимально подробную и достоверную информацию.

Структура ответа должна включать следующие разделы:

ОБЩАЯ ИНФОРМАЦИЯ
- Страна и регион производства
- Год основания бренда/пивоварни
- Тип пива (лагер, эль, стаут и т.д.)
- Краткая история бренда

ОРГАНОЛЕПТИЧЕСКИЕ ХАРАКТЕРИСТИКИ
- Цвет и прозрачность
- Аромат (хмель, солод, фруктовые ноты)
- Вкус (горечь, сладость, кислинка)
- Послевкусие
- Крепость (% ABV)
- Плотность начального сусла (если известна)

СОСТАВ
- Основные ингредиенты (солод, хмель, вода, дрожжи)
- Особые добавки (если есть)
- Технология производства

УПАКОВКА И ОБЪЁМ
- Доступные форматы (бутылка, банка, кег)
- Объёмы (0.33л, 0.5л и т.д.)
- Особенности дизайна упаковки

ГДЕ ПРОДАЁТСЯ
- Регионы доступности
- Типичные места продажи
- Международное распространение

НАГРАДЫ И ПРИЗНАНИЯ
- Медали на конкурсах
- Рейтинги (RateBeer, Untappd и др.)
- Профессиональные оценки

ИНТЕРЕСНЫЕ ФАКТЫ
- Уникальные особенности
- Истории и легенды
- Знаменитые поклонники

ПОЗИЦИОНИРОВАНИЕ
- Целевая аудитория
- Ценовая категория
- Имидж бренда
- Маркетинговые особенности

РЕКОМЕНДАЦИИ ПО ЗАКУСКАМ
- Идеальные снеки к этому пиву
- Сочетания с блюдами
- Температура подачи

ВАЖНО: Отвечай на русском языке. Не используй символы markdown (* # ** __ и т.д.). 
Для заголовков используй ЗАГЛАВНЫЕ БУКВЫ и пустые строки.
Для списков используй простые тире (-) или цифры с точкой (1.).
Если какая-то информация неизвестна, честно укажи это вместо выдумывания.`;

    const userPrompt = `Предоставь подробную информацию о пиве марки: ${brandName}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Превышен лимит запросов, попробуйте позже." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Требуется пополнение баланса Lovable AI." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Ошибка AI генерации" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const info = data.choices[0].message.content;

    return new Response(JSON.stringify({ info }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-beer-brand error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Неизвестная ошибка" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
