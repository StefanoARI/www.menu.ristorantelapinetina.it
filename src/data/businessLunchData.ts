export const fullBusinessLunchMenu = {
  title: "Menù Business Lunch",
  slug: "menu-business-lunch",
  isActive: true,
  seoTitle: "Menù Business Lunch 02-06 Novembre 2026 | Ristorante La Pinetina",
  seoDescription: "Menù Business Lunch di Ristorante La Pinetina valido dal Lunedì 02/11 al Venerdì 06/11 a pranzo. Menù Primo a 12€, Secondo a 14€, Completo a 20€ (inclusi coperto, acqua e caffè), Specialità, Contorni, Dolci e Vini del giorno.",
  subtitle: "Dal Lunedì 02/11 al Venerdì 06/11 Pranzo | INCLUSI coperto, acqua e caffè",
  categories: [
    {
      id: "primo_scelta",
      name: "MENÙ PRIMO (A SCELTA) - 12€",
      description: "Inclusi coperto, acqua e caffè - 12€",
      items: [
        {
          id: "bl_p1",
          name: "Fusilloni alla norma",
          description: "con melanzane, pomodoro, basilico fresco e ricotta salata",
          price: "12.00",
          allergens: [1, 7],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_p2",
          name: "Risotto alla salsiccia e parmigiano",
          description: "mantecato con salsiccia nostrana e Parmigiano Reggiano",
          price: "12.00",
          allergens: [7],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_p3",
          name: "Mezze maniche al ragù di pesce",
          description: "pasta fresca con ragù di pescato fresco e pomodorini",
          price: "12.00",
          allergens: [1, 4, 9, 14],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "secondo_scelta",
      name: "MENÙ SECONDO (A SCELTA) - 14€",
      description: "Inclusi coperto, acqua e caffè - 14€",
      items: [
        {
          id: "bl_s1",
          name: "Salsiccia e friarielli con patate al forno",
          description: "saporita salsiccia rosolata con friarielli campani e patate al forno",
          price: "14.00",
          allergens: [],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_s2",
          name: "Cavolfiori gratinati con besciamella e formaggio",
          description: "al forno dorati con besciamella artigianale e formaggio filante",
          price: "14.00",
          allergens: [1, 7],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_s3",
          name: "Bocconcino di pollo al curry con riso pilaf e verdure",
          description: "bocconcini di pollo tenero al curry profumato accompagnati da riso pilaf e verdure",
          price: "14.00",
          allergens: [],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "completo_scelta",
      name: "MENÙ COMPLETO - 20€",
      description: "Primo a scelta + Secondo a scelta tra le proposte del giorno (Inclusi coperto, acqua e caffè)",
      items: [
        {
          id: "bl_c1",
          name: "Primo a scelta + Secondo a scelta",
          description: "Scegli un primo e un secondo tra i piatti del giorno. Inclusi coperto, acqua e caffè",
          price: "20.00",
          allergens: [],
          isFeatured: false,
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
          name: "RIBOLLITA TOSCANA",
          description: "con fagioli, cavolo nero, patate e verdure di stagione",
          price: "13.00",
          allergens: [1, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_sp2",
          name: "HAMBURGER",
          description: "di manzo con crema di avocado, insalata, pomodoro, bacon croccante, con patatine fritte e salsa rosa",
          price: "15.00",
          allergens: [1, 3, 7, 10, 11],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "contorni",
      name: "CONTORNO - 5€",
      description: "Contorni freschi di stagione - 5€ cad.",
      items: [
        {
          id: "bl_co1",
          name: "Patate al forno",
          description: "dorate con erbe aromatiche",
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
      name: "DOLCE - 4€",
      description: "I dessert della casa - 4€ cad.",
      items: [
        {
          id: "bl_d1",
          name: "Strudel di mela con panna montata",
          description: "tradizionale strudel di mele profumato alla cannella con soffice panna montata",
          price: "4.00",
          allergens: [1, 3, 7, 8],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_d2",
          name: "Gelato al cioccolato",
          description: "cremoso gelato artigianale al cioccolato",
          price: "4.00",
          allergens: [7],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "vini",
      name: "VINO DEL GIORNO - 5€",
      description: "I vini selezionati al calice per il pranzo - 5€ cad.",
      items: [
        {
          id: "bl_v1",
          name: "Mesa BUIO, carignano",
          description: "Cantina Mesa - Carignano del Sulcis DOC, rosso elegante e avvolgente",
          price: "5.00",
          allergens: [12],
          isFeatured: false,
          extras: []
        },
        {
          id: "bl_v2",
          name: "Mesa GIUNCO, vermentino",
          description: "Cantina Mesa - Vermentino di Sardegna DOC, bianco fresco, minerale e profumato",
          price: "5.00",
          allergens: [12],
          isFeatured: false,
          extras: []
        }
      ]
    }
  ]
};
