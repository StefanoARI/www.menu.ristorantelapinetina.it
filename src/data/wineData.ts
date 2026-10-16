export const fullWineMenu = {
  title: "Carta dei Vini",
  slug: "menu-vini",
  isActive: true,
  seoTitle: "Carta dei Vini | Ristorante La Pinetina",
  seoDescription: "La nostra esclusiva selezione di bollicine, champagne, vini bianchi, rosati, rossi e passiti.",
  subtitle: "Selezione Curata della Nostra Cantina",
  categories: [
    {
      id: "bollicine",
      name: "Bollicine",
      description: "Metodo Classico e spumanti d'eccellenza",
      items: [
        { id: "bol1", name: "Athesis brut DOC (Alto Adige)", description: "Kettmeir - Chardonnay, Pinot Bianco, Pinot Nero 12.5% Vol.", price: "45", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol2", name: "Athesis brut rosè DOC (Alto Adige)", description: "Kettmeir - Pinot Nero, Chardonnay 12.5% Vol.", price: "54", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol3", name: "1919 Riserva extra brut 2018 (Alto Adige)", description: "Kettmeir - Chardonnay, Pinot Nero 13% Vol.", price: "70", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol4", name: "Ferrari Perlè 2019 (Trentino- Alto Adige)", description: "Ferrari - Chardonnay 12.5% Vol. 2019", price: "85", allergens: [12], isFeatured: true, extras: [] },
        { id: "bol5", name: "Riserva Giulio Ferrari 2015 (Trentino- Alto Adige)", description: "Ferrari - Chardonnay 12.5% Vol.", price: "250", allergens: [12], isFeatured: true, extras: [] },
        { id: "bol6", name: "Franciacorta '61 Saten (Lombardia)", description: "Berlucchi - Chardonnay 12.5% Vol.", price: "42", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol7", name: "Franciacorta '61 Rosè (Lombardia)", description: "Berlucchi - Pinot Nero, Chardonnay 12.5% Vol.", price: "45", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol8", name: "Franciacorta Nature 2019 (Lombardia)", description: "Berlucchi - Chardonnay, Pinto Nero 12.5% Vol.", price: "56", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol9", name: "Franciacorta Nature Rose' 2018 (Lombardia)", description: "Berlucchi - Pinot Nero 12,5% Vol. 2018", price: "86", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol10", name: "Spumante Origine brut (Veneto)", description: "Valdo - Glera 11.5% Vol.", price: "26", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol11", name: "Spumante Origine brut rosè (Veneto)", description: "Valdo - Nerello Mascalese 11.5% Vol.", price: "26", allergens: [12], isFeatured: false, extras: [] },
        { id: "bol12", name: "Valdobbiadene Prosecco Superiore DOCG BRUT (Veneto)", description: "Santa Margherita - Glera 11.5% Vol.", price: "30", allergens: [12], isFeatured: false, extras: [] }
      ]
    },
    {
      id: "champagne",
      name: "Champagne",
      description: "Le più prestigiose Maison francesi",
      items: [
        { id: "ch1", name: "Bollinger Special Cuveè Brut", description: "Bollinger - Chardonnay, Pinot Meunier, Pinot Noir 12% Vol.", price: "122", allergens: [12], isFeatured: true, extras: [] },
        { id: "ch2", name: "Perrier Jouet Blanc de Blancs Brut", description: "Perrier Jouet - Chardonnay 12.5% Vol.", price: "143", allergens: [12], isFeatured: true, extras: [] },
        { id: "ch3", name: "Nicolas Feuillatte Reserve", description: "Nicolas Feuillatte - Pinot Noir, Pinot Meunier, Chardonnay 12.5% Vol.", price: "90", allergens: [12], isFeatured: false, extras: [] },
        { id: "ch4", name: "Louis Roederer - Collection 246", description: "Louis Roedere - Pinot Noir, Pinot Meunier, Chardonnay 12.5% Vol.", price: "150", allergens: [12], isFeatured: true, extras: [] },
        { id: "ch5", name: "Alexander Bonnet - Blanc de Noir", description: "Alexander Bonnet - Pinot Noir, 12.5% Vol.", price: "116", allergens: [12], isFeatured: false, extras: [] }
      ]
    },
    {
      id: "magnum",
      name: "Magnum 1.5l",
      description: "I grandi formati da condividere",
      items: [
        { id: "mag1", name: "Franciacorta '61 Saten (Lombardia)", description: "Berlucchi - Chardonnay 12.5% Vol.", price: "88", allergens: [12], isFeatured: false, extras: [] },
        { id: "mag2", name: "Franciacorta '61 Rosè (Lombardia)", description: "Berlucchi - Pinot Nero, Chardonnay 12.5% Vol.", price: "90", allergens: [12], isFeatured: false, extras: [] },
        { id: "mag3", name: "Alexander Bonnet - Blanc de Noir (Champagne)", description: "Alexandre Bonnet - Pinto Noir 12.5% Vol.", price: "250", allergens: [12], isFeatured: true, extras: [] }
      ]
    },
    {
      id: "bianchi_italia",
      name: "Vini Bianchi - Italia",
      description: "Espressioni d'eccellenza delle regioni italiane",
      items: [
        { id: "bi1", name: "Nascetta DOC - 2025 (Piemonte)", description: "Az.Agricola Elvio - Nascetta 13% Vol.", price: "48", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi2", name: "Roero Arneis - 2024 (Piemonte)", description: "Deltetto - Roero Arneis 13.5% Vol.", price: "37", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi3", name: "Riesling Kaiton - 2024 (Alto Adige)", description: "Az. Agricola Kuen Hofdi Simon Pliger - Bressanone 12.5% Vol.", price: "51", allergens: [12], isFeatured: true, extras: [] },
        { id: "bi4", name: "Gewurztraminer - 2025 (Alto Adige)", description: "Kettmeir - Gewurztraminer 13.5% Vol.", price: "36", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi5", name: "Muller Thurgau (Alto Adige)", description: "Kettmeir - Sauvignon 13% Vol.", price: "35", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi6", name: "Sauvignon - 2025 (Alto Adige)", description: "Kettmeir - Sauvignon 13.5%", price: "36", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi7", name: "MASO Chardonnay - 2023 (Alto Adige)", description: "Kettmeir - Chardonnay Vol. 14%", price: "54", allergens: [12], isFeatured: true, extras: [] },
        { id: "bi8", name: "Friulano (Friuli-Venezia Giulia)", description: "Russiz - Friulano 13% Vol.", price: "34", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi9", name: "Pinot Bianco - 2025 (Friuli-Venezia Giulia)", description: "Russiz - Pinot Bianco 13.5 % Vol.", price: "44", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi10", name: "Ribolla Gialla (Friuli-Venezia Giulia)", description: "Magredi - Ribolla Gialla 12,5% Vol", price: "32", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi11", name: "MOLIN Lugana Superiore DOC - 2023 (Veneto)", description: "Ca Maiol - Lugana 13% Vol.", price: "40", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi12", name: "Lugana PRESTIGE - 2025 (Veneto)", description: "Ca Maiol - Lugana 13.5% Vol.", price: "28", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi13", name: "Pecorino Bio DOCG - 2024 (Abruzzo)", description: "Villa Angela Offida - Pecorino 13% Vol.", price: "34", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi14", name: "EDDA - 2024 (Puglia)", description: "San Marzano - Chardonnay 14% Vol.", price: "38", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi15", name: "SERRO CIELO - 2024 (Campania)", description: "Feudi di San Gregorio - Falanghina 12.5% Vol.", price: "31", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi16", name: "Lighea — 2025 (Sicilia)", description: "Donna Fugata - Zibibbo 13% Vol.", price: "38", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi17", name: "Sul Vulcano - 2022 (Sicilia)", description: "Donna Fugata - Etna Bianco 12,5% Vol.", price: "47", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi18", name: "Passiperduti- 2025 (Sicilia)", description: "Donna Fugata - Grillo 13 % Vol.", price: "39", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi19", name: "Giunco — 2025 (Sardegna)", description: "Mesa - Vermentino 13.5% Vol.", price: "31", allergens: [12], isFeatured: false, extras: [] },
        { id: "bi20", name: "Opale — 2024 (Sardegna)", description: "Mesa - Vermentino 14 % Vol.", price: "40", allergens: [12], isFeatured: false, extras: [] }
      ]
    },
    {
      id: "bianchi_mondo",
      name: "Vini Bianchi - Mondo",
      description: "Grandi etichette bianche francesi e internazionali",
      items: [
        { id: "bm1", name: "Bourgogne Chardonnay — 2024 (Bourgogne)", description: "Maison Louis Latour di Beune - Chardonnay 12.5% Vol.", price: "53", allergens: [12], isFeatured: false, extras: [] },
        { id: "bm2", name: "Chablis la Chanfleure — 2024 (Bourgogne)", description: "Maison Louis Latour di Beaune - Chardonnay 12.5% Vol.", price: "61", allergens: [12], isFeatured: true, extras: [] },
        { id: "bm3", name: "Bourgogne Aligotè — 2025 (Bourgogne)", description: "Maison Louis Latour di Beaune - Chardonnay 12.5% Vol.", price: "44", allergens: [12], isFeatured: false, extras: [] },
        { id: "bm4", name: "Meursault sous la velle — 2023 (Bourgogne)", description: "Domaine Michelot di Mersault - Chardonnay 12.5% Vol.", price: "148", allergens: [12], isFeatured: true, extras: [] },
        { id: "bm5", name: "Sancerre Cuvèe Galinot Silex - 2022 (Loire)", description: "Domaine Gitton Père at fils di Mènètrèol sous Sancerre - Sauvignon Blanc 14% Vol.", price: "89", allergens: [12], isFeatured: false, extras: [] }
      ]
    },
    {
      id: "rosati_italia",
      name: "Vini Rosati - Italia",
      description: "Freschezza, eleganza e profumi floreali",
      items: [
        { id: "ro1", name: "ROSERI - 2025 (Lombardia)", description: "Cà Maiol - Chiaretto 12.5% Vol.", price: "27", allergens: [12], isFeatured: false, extras: [] },
        { id: "ro2", name: "Tramari - 2025 (Puglia)", description: "San Marzano - Primirivo 12.5% Vol.", price: "31", allergens: [12], isFeatured: false, extras: [] },
        { id: "ro3", name: "San Greg - 2024 (Campania)", description: "Feudi di San Gregorio - Aglianico 12% Vol.", price: "31", allergens: [12], isFeatured: false, extras: [] },
        { id: "ro4", name: "Rosa Grande - 2025 (Sardegna)", description: "Mesa - Sirah, Vermentino 13% Vol.", price: "30", allergens: [12], isFeatured: false, extras: [] }
      ]
    },
    {
      id: "rosati_mondo",
      name: "Vini Rosati - Mondo",
      description: "Il fascino dei grandi rosati provenzali",
      items: [
        { id: "rom1", name: "AIX Rosè - 2025 (Provenza)", description: "Coteaux d'Aix en Provence AOC - Grenache 13% Vol.", price: "52", allergens: [12], isFeatured: true, extras: [] }
      ]
    },
    {
      id: "passiti_italia",
      name: "Vini Passiti - Italia",
      description: "Vini da dessert e meditazione della tradizione italiana",
      items: [
        { id: "pas1", name: "Ben Rye — Passito di Pantelleria DOC - 2023 (Sicilia)", description: "Donna Fugata - Zibibbo 375 cl 14.5% Vol.", price: "58", allergens: [12], isFeatured: true, extras: [] }
      ]
    },
    {
      id: "passiti_mondo",
      name: "Vini Passiti - Mondo",
      description: "La nobile tradizione del Sauternes",
      items: [
        { id: "pasm1", name: "Sauternes - 2023 (Bordeaux)", description: "Chateau Liot - Semillon, Sauvignon, Muscadelle 13.5% Vol.", price: "53", allergens: [12], isFeatured: true, extras: [] }
      ]
    },
    {
      id: "al_calice",
      name: "Vini al calice",
      description: "Grandi passiti e vini fortificati serviti al calice",
      items: [
        { id: "cal1", name: "Ben Rye — Passito di Pantelleria DOC - 2023 (Sicilia)", description: "Donna Fugata - Zibibbo 14.5% Vol.", price: "9", allergens: [12], isFeatured: true, extras: [] },
        { id: "cal2", name: "Sauternes - 2023 (Bordeaux)", description: "Chateau Liot - Semillon, Sauvignon, Muscadelle 13.5% Vol.", price: "9", allergens: [12], isFeatured: true, extras: [] },
        { id: "cal3", name: "Forterosso - Passito Rosso - 2023 (Sardegna)", description: "Mesa - Carignano del Sulcis DOC 14.5% Vol.", price: "8", allergens: [12], isFeatured: false, extras: [] },
        { id: "cal4", name: "Porto Tawny Reserve (Portogallo, Valle del Duoro)", description: "Bulas Quinta da Foz - Touriga Nacional, Touriga Francia, Tempranillo, Tinta Barroca 19.5% Vol.", price: "8", allergens: [12], isFeatured: false, extras: [] }
      ]
    },
    {
      id: "rossi_italia",
      name: "Vini Rossi - Italia",
      description: "I grandi vitigni e territori rossi d'Italia",
      items: [
        { id: "ros1", name: "Lagrein - 2024 (Alto Adige)", description: "Kettmeir - Lagrein 13% Vol.", price: "31", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros2", name: "Pinot Nero - 2024 (Alto Adige)", description: "Kettmeir - Pinot Nero 13.5% Vol", price: "33", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros3", name: "MASO Pinot Nero - 2023 (Alto Adige)", description: "Kettmeir - Pinot Nero 14% Vol.", price: "53", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros4", name: "Sassella 2021 - (Lombardia)", description: "Nino Negri - Nebbiolo 13.5% Vol.", price: "43", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros5", name: "Cabernet Franc - 2022 (Friuli Venezia Giulia)", description: "Russiz - Cabernet Franc 13% Vol. 2022", price: "48", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros6", name: "Barbera d'Alba - 2023 (Piemonte)", description: "Deltetto - Barbera 14.5% Vol", price: "51", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros7", name: "Barolo - 2019 (Piemonte)", description: "Deltetto - Nebbiolo 14.5% Vol", price: "60", allergens: [12], isFeatured: true, extras: [] },
        { id: "ros8", name: "Valpolicella Classico - 2025 (Veneto)", description: "Monte del Fra - Corvina, Corvione, Rondinella 12.5 % Vol.", price: "27", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros9", name: "Valpolicella Ripasso - 2022 (Veneto)", description: "Monte del Fra - Corvina, Corvione, Rondinella 14% Vol.", price: "45", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros10", name: "Amarone della Valpolicella - 2020 (Veneto)", description: "Monte del Fra - Corvina, Corvione, Rondinella 15.5% Vol. 2020", price: "70", allergens: [12], isFeatured: true, extras: [] },
        { id: "ros11", name: "Cabernet Sauvignon - 2025 (Veneto)", description: "Magredi - Cabernet Sauvignon 12.5% Vol.", price: "29", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros12", name: "Montepulciano - 2023 (Abruzzo)", description: "Velenosi - Montepulciano 13.5% Vol.", price: "26", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros13", name: "Ruit Hora Bolgheri- 2023 (Toscana)", description: "Caccia al Piano - Cabernet Sauvignon, Merlot, Petit Verdot, Syrah 13% Vol.", price: "45", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros14", name: "Caccia al Piano Bolgheri Sup. - 2021 (Toscana)", description: "Caccia al Piano Bolgheri - Cabernet Sauvignon, Cabernet Franc 14.5% Vol.", price: "108", allergens: [12], isFeatured: true, extras: [] },
        { id: "ros15", name: "DUELAME - 2023 (Toscana)", description: "Lamole di Lamole - Chianti classico 14% Vol.", price: "40", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros16", name: "“F” - 2022 (Puglia)", description: "San Marzano - Negroamaro 14.5%", price: "45", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros17", name: "Sessant’anni Primitivo di Manduria - 2020 (Puglia)", description: "San Marzano - Primitivo 14.5%", price: "46", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros18", name: "Tancredi x Dolce&Gabbana - 2021 (Sicilia)", description: "Donna Fugata - Cabernet Sauvignon, Nero d’Avola e varie varietà 13.5% Vol.", price: "56", allergens: [12], isFeatured: true, extras: [] },
        { id: "ros19", name: "Sul Vulcano Etna Rosso - 2022 (Sicilia)", description: "Donna Fugata - Etna Rosso 14% Vol.", price: "47", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros20", name: "Buio — 2024 (Sardegna)", description: "Mesa - Carignano 14% Vol.", price: "30", allergens: [12], isFeatured: false, extras: [] },
        { id: "ros21", name: "Buio Buio Riserva - 2022 (Sardegna)", description: "Mesa - Carignano 14.5% Vol.", price: "52", allergens: [12], isFeatured: false, extras: [] }
      ]
    },
    {
      id: "rossi_mondo",
      name: "Vini Rossi - Mondo",
      description: "Grandi rossi internazionali dalla California e dalla Borgogna",
      items: [
        { id: "romd1", name: "Zinfandel - 2021 (California)", description: "The Big Top - Zinfandel 13.5% Vol.", price: "35", allergens: [12], isFeatured: false, extras: [] },
        { id: "romd2", name: "Les Ormes de Pez - 2019 (Bordeaux)", description: "Chateaux Saint Estèphe - Merlot, Cabernet Sauvignon, Cabernet Franc, Petit Verdot 14.5% Vol.", price: "73", allergens: [12], isFeatured: true, extras: [] },
        { id: "romd3", name: "Bourgogne Gamay - 2024 (Bourgogne)", description: "Maison Louis Latour di Beaune - Gamay 13% Vol.", price: "44", allergens: [12], isFeatured: false, extras: [] },
        { id: "romd4", name: "Bourgogne Pinot Noir - 2024 (Bourgogne)", description: "Maison Louis Latour di Beaun - Pinot Noir 14.5% Vol.", price: "50", allergens: [12], isFeatured: false, extras: [] }
      ]
    }
  ]
};
