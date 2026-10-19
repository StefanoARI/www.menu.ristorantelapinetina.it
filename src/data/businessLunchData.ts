export const fullBusinessLunchMenu = {
  title: "Menù Business Lunch",
  slug: "menu-business-lunch",
  isActive: true,
  seoTitle: "Menù Business Lunch 19-23 Ottobre 2026 | Ristorante La Pinetina",
  seoDescription: "Menù Business Lunch di Ristorante La Pinetina valido dal 19 al 23 Ottobre 2026. Menù Primo a 12€, Secondo a 14€, Completo a 20€ (inclusi coperto, acqua e caffè), Specialità, Contorni, Dolci e Vini al calice.",
  subtitle: "19 - 23 Ottobre 2026 | INCLUSI coperto, acqua e caffè",
  categories: [
    {
      id: "primo_scelta",
      name: "MENÙ PRIMO (a scelta) - 12€",
      description: "Inclusi coperto, acqua e caffè - 12€",
      items: [
        {
          id: "bl_p1",
          name: "Risotto",
          description: "con crema di zucca e fonduta di formaggi",
          price: "12.00",
          allergens: [7],
          isFeatured: true,
          extras: []
        },
        {
          id: "bl_p2",
          name: "Tagliolini",
          description: "con burro agli agrumi, trota salmonata e aneto",
          price: "12.00",
          allergens: [1, 4, 7],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_p3",
          name: "Orecchiette",
          description: "con melenzane, pomodoro, acciughe e capperi",
          price: "12.00",
          allergens: [1, 4],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "secondo_scelta",
      name: "MENÙ SECONDO (a scelta) - 14€",
      description: "Inclusi coperto, acqua e caffè - 14€",
      items: [
        {
          id: "bl_s1",
          name: "Scaloppa di vitello al limone",
          description: "con cavolo nero brasato",
          price: "14.00",
          allergens: [1],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_s2",
          name: "Polpettone ripieno",
          description: "con scamorza e zucchine trifolate alla mentuccia",
          price: "14.00",
          allergens: [1, 3, 7],
          isFeatured: true,
          extras: []
        },
        {
          id: "bl_s3",
          name: "Filetto di salmerino in crosta di patate",
          description: "con fumetto di pesce e scarola arrostita",
          price: "14.00",
          allergens: [4],
          isFeatured: true,
          extras: []
        }
      ]
    },
    {
      id: "completo_scelta",
      name: "MENÙ COMPLETO - 20€",
      description: "Primo + Secondo a scelta tra le proposte del giorno (Inclusi coperto, acqua e caffè)",
      items: [
        {
          id: "bl_c1",
          name: "Primo + Secondo (a scelta)",
          description: "Scegli un primo e un secondo tra i piatti del giorno. Inclusi coperto, acqua e caffè",
          price: "20.00",
          allergens: [],
          isFeatured: true,
          extras: []
        }
      ]
    },
    {
      id: "specialita",
      name: "LE SPECIALITÀ",
      description: "Le proposte speciali dello Chef per la pausa pranzo",
      items: [
        {
          id: "bl_sp1",
          name: "Insalata Nizzarda",
          description: "con tonno, acciughe e patate",
          price: "14.00",
          allergens: [3, 4],
          isFeatured: true,
          extras: []
        },
        {
          id: "bl_sp2",
          name: "Crema di patate",
          description: "parmentier con insalata riccia alla brace e olio al pomodoro",
          price: "12.00",
          allergens: [7],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "contorni",
      name: "I CONTORNI - 5€",
      description: "Contorni freschi di stagione - 5€ cad.",
      items: [
        {
          id: "bl_co1",
          name: "Patate al forno",
          description: "dorate con rosmarino fresco",
          price: "5.00",
          allergens: [],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_co2",
          name: "Purè di patate",
          description: "morbido e mantecato con burro e latte",
          price: "5.00",
          allergens: [7],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_co3",
          name: "Verdure grigliate",
          description: "selezione di verdure fresche alla griglia",
          price: "5.00",
          allergens: [],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_co4",
          name: "Insalata mista",
          description: "misticanza fresca di stagione",
          price: "5.00",
          allergens: [],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "dolci",
      name: "DOLCE DEL GIORNO - 4€",
      description: "I dessert della nostra pasticceria - 4€ cad.",
      items: [
        {
          id: "bl_d1",
          name: "Frutta",
          description: "fresca di stagione a fette",
          price: "4.00",
          allergens: [],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_d2",
          name: "Gelato",
          description: "gelato artigianale di nostra produzione",
          price: "4.00",
          allergens: [7],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_d3",
          name: "Tiramisù",
          description: "classico tiramisù della tradizione",
          price: "4.00",
          allergens: [1, 3, 7],
          isFeatured: true,
          extras: []
        }
      ]
    },
    {
      id: "vini",
      name: "IL VINO - 5€",
      description: "I vini selezionati al calice per il pranzo - 5€ cad.",
      items: [
        {
          id: "bl_v1",
          name: "Pico Maccario, Nebbiolo Barbera, ANIMA MIA",
          description: "Pico Maccario - Calice di rosso elegante e avvolgente",
          price: "5.00",
          allergens: [12],
          isFeatured: true,
          extras: []
        },
        {
          id: "bl_v2",
          name: "Pico Maccario, Chardonnay IGT, Lazio, ANIMA MIA",
          description: "Pico Maccario - Calice di bianco fresco, minerale e profumato",
          price: "5.00",
          allergens: [12],
          isFeatured: true,
          extras: []
        }
      ]
    }
  ]
};
