export const fullAllaCartaMenu = {
  title: "Menù alla Carta",
  slug: "menu",
  isActive: true,
  seoTitle: "Menù alla Carta Autunnale | Ristorante La Pinetina",
  seoDescription: "Scopri il Menù alla Carta Autunnale di Ristorante La Pinetina: Antipasti, Caviali ADAMAS, Primi Piatti, Secondi di Carne e Pesce, Pizze Gourmet, Dolci e Caffetteria.",
  subtitle: "Menù Autunnale · Prodotti di stagione selezionati con cura dallo Chef",
  categories: [
    {
      id: "antipasti",
      name: "Antipasti",
      description: "Pag. 0001 · I nostri antipasti preparati con ingredienti freschi di stagione.",
      items: [
        {
          id: "ac_a1",
          name: "Carciofi in oliocottura",
          description: "con mentuccia fresca",
          price: "16.00",
          allergens: [5],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_a2",
          name: "Moscardini* in guazzetto",
          description: "origano e olive taggiasche",
          price: "15.00",
          allergens: [1, 4, 9, 12, 13, 14],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_a3",
          name: "Crostoni di polenta",
          description: "con fonduta al Casera, pasta di salame mantovana e erba cipollina",
          price: "15.00",
          allergens: [1, 3, 5, 8],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_a4",
          name: "Vellutata di zucca",
          description: "con sedano al limone, gamberi*, bacon e semi di zucca",
          price: "15.00",
          allergens: [2, 4, 8, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_a5",
          name: "Capasanta* scottata",
          description: "su crema di patate e carciofi croccanti",
          price: "14.00",
          allergens: [4, 12, 14],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_a6",
          name: "Battuta di filetto di manzo irlandese",
          description: "mela verde e salsa al Parmigiano",
          price: "18.00",
          allergens: [7],
          isFeatured: false,
          extras: [
            {
              id: "ac_ex_tartufo_battuta",
              name: "+ Tartufo fresco a consumo",
              price: "€2,5/g",
              description: "in base alla disponibilità del mercato"
            }
          ]
        },
        {
          id: "ac_a7",
          name: "Ovetto al tegamino",
          description: "con asparagi sautè e Parmigiano",
          price: "12.00",
          allergens: [3, 7],
          isFeatured: false,
          extras: [
            {
              id: "ac_ex_tartufo_ovetto",
              name: "+ Tartufo fresco a consumo",
              price: "€2,5/g",
              description: "in base alla disponibilità del mercato"
            }
          ]
        },
        {
          id: "ac_a8",
          name: "Insalatina di puntarelle",
          description: "con mozzarella di Bufala e acciughe del Mediterraneo",
          price: "14.00",
          allergens: [4, 7],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_a9",
          name: "Cruditè di pesce | per 2 persone",
          description: "Ricci di mare, Salmone**, Tonno rosso**, Scampi Danimarca*, gambero di Mazara*, Capasanta*, Ostriche Fin de Claire, Tartufo di mare",
          price: "60.00",
          allergens: [2, 4, 6, 12, 14],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "caviali_adamas",
      name: "Selezione di caviali ADAMAS",
      description: "Pag. 0001 · Serviti in accompagnamento con: Pan brioche tostato, panna acida al rafano, burro alla maître d'hôtel, pane carasau al rosmarino, cipolla rossa di Tropea all'aceto di vino rosso",
      items: [
        {
          id: "ac_c1",
          name: "The Aqua Adamas Riviera Selection / Storione Italiano",
          description: "Storione Italiano di eccellenza. Servito con pan brioche tostato, panna acida al rafano, burro alla maître d'hôtel, pane carasau e cipolla di Tropea.",
          price: "45.00",
          allergens: [1, 3, 5, 6, 7, 8, 9, 10, 11, 12],
          isFeatured: false,
          extras: [
            {
              id: "ac_c1_10g",
              name: "Formato 10 gr",
              price: "€45,00",
              description: "The Aqua Adamas Riviera Selection"
            },
            {
              id: "ac_c1_30g",
              name: "Formato 30 gr",
              price: "€95,00",
              description: "The Aqua Adamas Riviera Selection"
            }
          ]
        },
        {
          id: "ac_c2",
          name: "The Premium Beluga / Storione Beluga (Huso)",
          description: "Storione Beluga (Huso) di prima scelta. Servito con pan brioche tostato, panna acida al rafano, burro alla maître d'hôtel, pane carasau e cipolla di Tropea.",
          price: "90.00",
          allergens: [1, 3, 5, 6, 7, 8, 9, 10, 11, 12],
          isFeatured: false,
          extras: [
            {
              id: "ac_c2_10g",
              name: "Formato 10 gr",
              price: "€90,00",
              description: "The Premium Beluga"
            },
            {
              id: "ac_c2_30g",
              name: "Formato 30 gr",
              price: "€195,00",
              description: "The Premium Beluga"
            }
          ]
        }
      ]
    },
    {
      id: "primi_piatti",
      name: "Primi Piatti",
      description: "Pag. 0002 · Pasta fresca fatta a mano, risotti mantecati e specialità dello Chef con tartufo e caviale.",
      items: [
        {
          id: "ac_p1",
          name: "Mezzi Paccheri Mancini",
          description: "con Scorfano***, duetto di datterino e basilico",
          price: "19.00",
          allergens: [1, 2, 4, 9, 12, 13, 14],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p2",
          name: "Riso riserva San Massimo",
          description: "mantecato al Castelmagno, trevisana al vino rosso e animelle al vitello*",
          price: "19.00",
          allergens: [3, 7, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p3",
          name: "Fettuccine con vongole",
          description: "cime di rapa e gocce di provola silana",
          price: "23.00",
          allergens: [1, 3, 4, 7, 13, 14],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p4",
          name: "Bottoni** di pasta fresca",
          description: "ripieni di ossobuco, crema allo zafferano, fondo di vitello e salvia fritta",
          price: "17.00",
          allergens: [3, 5, 6, 7, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p5",
          name: "Gnocchi* freschi",
          description: "ai formaggi di latte misto con miele e noci",
          price: "14.00",
          allergens: [1, 3, 5, 7, 8, 9, 12],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p6",
          name: "Tagliolini all'Astice Canadese",
          description: "pomodorini e basilico fresco (In base alla disponibilità dello chef)",
          price: "70.00",
          allergens: [1, 2, 4, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p7",
          name: "Riso Riserva San Massimo allo zafferano",
          description: "con ossobuco di vitello in gremolada (In base alla disponibilità dello chef)",
          price: "36.00",
          allergens: [1, 5, 7, 8, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p8",
          name: "Riso Riserva San Massimo ai funghi porcini",
          description: "ai funghi porcini di Borgotaro (In base alla disponibilità dello chef)",
          price: "23.00",
          allergens: [7, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_p9",
          name: "Tagliolini al burro, zest di limone con Tartufo",
          description: "Tagliolini freschi mantecati al burro e profumati con zest di limone, arricchiti con tartufo fresco a consumo",
          price: "10.00",
          allergens: [1, 7],
          isFeatured: false,
          extras: [
            {
              id: "ac_ex_tartufo_tagliolini",
              name: "+ Tartufo fresco a consumo",
              price: "€2,5/g",
              description: "in base alla disponibilità del mercato"
            }
          ]
        },
        {
          id: "ac_p10",
          name: "Tagliolini al burro, zest di limone con Caviali ADAMAS",
          description: "Tagliolini freschi mantecati al burro e zest di limone serviti con prestigiosa selezione di caviale ADAMAS a scelta",
          price: "10.00",
          allergens: [1, 7],
          isFeatured: false,
          extras: [
            {
              id: "ac_ex_caviale_aqua",
              name: "+ The Aqua Adamas Riviera Selection",
              price: "€45/10g o €95/30g",
              description: "Storione Italiano"
            },
            {
              id: "ac_ex_caviale_beluga",
              name: "+ The Premium Beluga",
              price: "€90/10g o €195/30g",
              description: "Storione Beluga (Huso)"
            }
          ]
        }
      ]
    },
    {
      id: "secondi_piatti",
      name: "Secondi Piatti",
      description: "Pag. 0003 · Carni nobili piemontesi, pescato del giorno e grandi preparazioni della tradizione.",
      items: [
        {
          id: "ac_s1",
          name: "Ossobuco di vitello in gremolada",
          description: "con purè di patate",
          price: "33.00",
          allergens: [1, 5, 7, 8, 9],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s2",
          name: "Guancia di vitello al vino rosso",
          description: "profumo di cannella e cioccolato fondente con cavolo nero brasato al peperoncino",
          price: "35.00",
          allergens: [1, 6, 7, 8, 9, 12],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s3",
          name: "Frittura di pesce",
          description: "con gamberi*, calamari*, baccalà* e maionese al lime",
          price: "23.00",
          allergens: [1, 2, 4, 5, 8, 12],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s4",
          name: "Zuppetta di pesce***",
          description: "in base alla disponibilità del pescato con crostone di pane",
          price: "24.00",
          allergens: [1, 2, 4, 5, 8, 9, 12, 13, 14],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s5",
          name: "Filetto di manzo bavarese ai ferri",
          description: "con cime di rapa e salsa bernese",
          price: "28.00",
          allergens: [5, 7, 8, 9, 10, 11],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s6",
          name: "Rana pescatrice* in foglia di verza",
          description: "con salsa alle vongole e gel di nero di seppia",
          price: "24.00",
          allergens: [1, 4, 5, 7, 8, 9, 12, 13, 14],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s7",
          name: "Branzino al sale da 1/1.3 kg",
          description: "con patate al forno e verdure sautè (In base alla disponibilità dello chef)",
          price: "120.00",
          allergens: [4, 5, 7],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s8",
          name: "Rombo al forno da 1/1.3 kg",
          description: "con salsa mediterranea, patate al forno e verdure sautè (In base alla disponibilità dello chef)",
          price: "130.00",
          allergens: [4, 5, 7],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s9",
          name: "Aragosta ai ferri | per 2 persone",
          description: "con burro alla maître d'hôtel e verdure di stagione (In base alla disponibilità dello chef)",
          price: "130.00",
          allergens: [2, 4],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s10",
          name: "Grigliata di pesce***",
          description: "in base al pescato del giorno accompagnata da verdure alla griglia e maionese al lime (In base alla disponibilità dello chef)",
          price: "31.00",
          allergens: [2, 4, 12, 13, 14],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s11",
          name: "Fiorentina di Scottona piemontese da 1,2/1,5 kg",
          description: "con patate al forno e verdure sautè (In base alla disponibilità dello chef)",
          price: "130.00",
          allergens: [5, 7],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_s12",
          name: "Costata di Scottona piemontese da 500/600 gr",
          description: "con patate al forno e verdure sautè (In base alla disponibilità dello chef)",
          price: "55.00",
          allergens: [5, 7],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "pizze",
      name: "Pizze",
      description: "Pag. 0004 · Impasti a lunga lievitazione e materie prime d'eccellenza.",
      items: [
        {
          id: "ac_pz1",
          name: "La Classica*",
          description: "Pomodoro, mozzarella fior di latte, mozzarella di bufala e basilico",
          price: "13.00",
          allergens: [1, 3, 6, 7, 8, 10, 11, 13],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_pz2",
          name: "La Bella*",
          description: "Mozzarella fior di latte, mortadella, pistacchi e stracciatella",
          price: "15.00",
          allergens: [1, 3, 6, 7, 8, 10, 11, 13],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_pz3",
          name: "La 4 Formaggi*",
          description: "Mozzarella fior di latte, gorgonzola, taleggio e scamorza",
          price: "14.00",
          allergens: [1, 3, 6, 7, 8, 10, 11, 13],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_pz4",
          name: "La Piccante*",
          description: "Pomodoro, mozzarella fior di latte, salame piccante",
          price: "14.00",
          allergens: [1, 3, 6, 7, 8, 10, 11, 13],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "dolci",
      name: "Dolci",
      description: "Pag. 0004 · Pasticceria artigianale preparata ogni giorno dalla nostra brigata.",
      items: [
        {
          id: "ac_d1",
          name: "Tarte tatin di mela",
          description: "con gelato alla cannella",
          price: "8.00",
          allergens: [1, 3, 5, 6, 7, 8, 12],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_d2",
          name: "Frolla artigianale",
          description: "con cremoso di cioccolato e pere allo zafferano",
          price: "9.00",
          allergens: [1, 3, 5, 7, 8],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_d3",
          name: "Cremoso al Gianduia",
          description: "croccante di arachidi e caramello salato",
          price: "13.00",
          allergens: [3, 7, 8, 12],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_d4",
          name: "Sorbetto a Limone o mela verde",
          description: "mantecato al tavolo",
          price: "10.00",
          allergens: [1, 3, 6, 7, 8],
          isFeatured: false,
          extras: [
            {
              id: "ac_ex_sorbetto_distillato",
              name: "Con aggiunta di distillato",
              price: "+2,00€",
              description: "Vodka premium o Calvados"
            }
          ]
        },
        {
          id: "ac_d5",
          name: "Gelato artigianale a scelta",
          description: "fior di latte, cioccolato, pistacchio",
          price: "6.00",
          allergens: [1, 3, 6, 7, 8],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_d6",
          name: "Carrello con selezione di formaggi | per 2 persone",
          description: "con confetture, miele, frutta secca e mostarda",
          price: "25.00",
          allergens: [3, 5, 6, 7, 8, 9, 10, 11],
          isFeatured: false,
          extras: []
        }
      ]
    },
    {
      id: "caffetteria_coperto",
      name: "Caffetteria & Coperto",
      description: "Pag. 0004 · Servizio al tavolo e caffetteria.",
      items: [
        {
          id: "ac_b1",
          name: "Acqua",
          description: "Naturale o Frizzante",
          price: "2.00",
          allergens: [],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_b2",
          name: "Caffè Nespresso",
          description: "Selezione Grand Cru Nespresso",
          price: "3.00",
          allergens: [],
          isFeatured: false,
          extras: []
        },
        {
          id: "ac_b3",
          name: "Coperto",
          description: "Servizio e pane artigianale",
          price: "4.00",
          allergens: [1],
          isFeatured: false,
          extras: []
        }
      ]
    }
  ]
};
