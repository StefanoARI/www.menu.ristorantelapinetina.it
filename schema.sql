-- Schema MySQL Completo per Ristorante La Pinetina
-- Database: risto114_menu

CREATE DATABASE IF NOT EXISTS risto114_menu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE risto114_menu;

CREATE TABLE IF NOT EXISTS menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_key VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    content_json LONGTEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'Gestore'
);

INSERT INTO admin_users (username, password_hash, email, role) 
VALUES ('assistenza@arimediagroup.it', '$2y$10$EXAMPLEHASHSECURE', 'assistenza@arimediagroup.it', 'Super Admin'),
       ('risto114_gestore', '$2y$10$EXAMPLEHASHSECURE', 'assistenza@arimediagroup.it', 'Gestore')
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- Inserimento dati iniziali Menù alla Carta (Aggiornato pagine 0001 - 0006)
INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) 
VALUES ('alla_carta', 'Menù alla Carta', 'Menù alla Carta Autunnale | Ristorante La Pinetina', 'Scopri il Menù alla Carta Autunnale di Ristorante La Pinetina: Antipasti, Caviali ADAMAS, Primi Piatti, Secondi di Carne e Pesce, Pizze Gourmet, Dolci e Caffetteria.', '{
  "title": "Menù alla Carta",
  "slug": "menu",
  "isActive": true,
  "seoTitle": "Menù alla Carta Autunnale | Ristorante La Pinetina",
  "seoDescription": "Scopri il Menù alla Carta Autunnale di Ristorante La Pinetina: Antipasti, Caviali ADAMAS, Primi Piatti, Secondi di Carne e Pesce, Pizze Gourmet, Dolci e Caffetteria.",
  "subtitle": "Menù Autunnale · Prodotti di stagione selezionati con cura dallo Chef",
  "categories": [
    {
      "id": "antipasti",
      "name": "Antipasti",
      "description": "Pag. 0001 · I nostri antipasti preparati con ingredienti freschi di stagione.",
      "items": [
        { "id": "ac_a1", "name": "Carciofi in oliocottura", "description": "con mentuccia fresca", "price": "16.00", "allergens": [5], "isFeatured": false, "extras": [] },
        { "id": "ac_a2", "name": "Moscardini* in guazzetto", "description": "origano e olive taggiasche", "price": "15.00", "allergens": [1, 4, 9, 12, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "ac_a3", "name": "Crostoni di polenta", "description": "con fonduta al Casera, pasta di salame mantovana e erba cipollina", "price": "15.00", "allergens": [1, 3, 5, 8], "isFeatured": false, "extras": [] },
        { "id": "ac_a4", "name": "Vellutata di zucca", "description": "con sedano al limone, gamberi*, bacon e semi di zucca", "price": "15.00", "allergens": [2, 4, 8, 9], "isFeatured": false, "extras": [] },
        { "id": "ac_a5", "name": "Capasanta* scottata", "description": "su crema di patate e carciofi croccanti", "price": "14.00", "allergens": [4, 12, 14], "isFeatured": false, "extras": [] },
        { "id": "ac_a6", "name": "Battuta di filetto di manzo irlandese", "description": "mela verde e salsa al Parmigiano", "price": "18.00", "allergens": [7], "isFeatured": false, "extras": [{ "id": "ac_ex_tartufo_battuta", "name": "+ Tartufo fresco a consumo", "price": "€2,5/g", "description": "in base alla disponibilità del mercato" }] },
        { "id": "ac_a7", "name": "Ovetto al tegamino", "description": "con asparagi sautè e Parmigiano", "price": "12.00", "allergens": [3, 7], "isFeatured": false, "extras": [{ "id": "ac_ex_tartufo_ovetto", "name": "+ Tartufo fresco a consumo", "price": "€2,5/g", "description": "in base alla disponibilità del mercato" }] },
        { "id": "ac_a8", "name": "Insalatina di puntarelle", "description": "con mozzarella di Bufala e acciughe del Mediterraneo", "price": "14.00", "allergens": [4, 7], "isFeatured": false, "extras": [] },
        { "id": "ac_a9", "name": "Cruditè di pesce | per 2 persone", "description": "Ricci di mare, Salmone**, Tonno rosso**, Scampi Danimarca*, gambero di Mazara*, Capasanta*, Ostriche Fin de Claire, Tartufo di mare", "price": "60.00", "allergens": [2, 4, 6, 12, 14], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "caviali_adamas",
      "name": "Selezione di caviali ADAMAS",
      "description": "Pag. 0001 · Serviti in accompagnamento con: Pan brioche tostato, panna acida al rafano, burro alla maître d\'hôtel, pane carasau al rosmarino, cipolla rossa di Tropea all\'aceto di vino rosso",
      "items": [
        { "id": "ac_c1", "name": "The Aqua Adamas Riviera Selection / Storione Italiano", "description": "Storione Italiano di eccellenza. Servito con pan brioche tostato, panna acida al rafano, burro alla maître d\'hôtel, pane carasau e cipolla di Tropea.", "price": "45.00", "allergens": [1, 3, 5, 6, 7, 8, 9, 10, 11, 12], "isFeatured": false, "extras": [{ "id": "ac_c1_10g", "name": "Formato 10 gr", "price": "€45,00", "description": "The Aqua Adamas Riviera Selection" }, { "id": "ac_c1_30g", "name": "Formato 30 gr", "price": "€95,00", "description": "The Aqua Adamas Riviera Selection" }] },
        { "id": "ac_c2", "name": "The Premium Beluga / Storione Beluga (Huso)", "description": "Storione Beluga (Huso) di prima scelta. Servito con pan brioche tostato, panna acida al rafano, burro alla maître d\'hôtel, pane carasau e cipolla di Tropea.", "price": "90.00", "allergens": [1, 3, 5, 6, 7, 8, 9, 10, 11, 12], "isFeatured": false, "extras": [{ "id": "ac_c2_10g", "name": "Formato 10 gr", "price": "€90,00", "description": "The Premium Beluga" }, { "id": "ac_c2_30g", "name": "Formato 30 gr", "price": "€195,00", "description": "The Premium Beluga" }] }
      ]
    },
    {
      "id": "primi_piatti",
      "name": "Primi Piatti",
      "description": "Pag. 0002 · Pasta fresca fatta a mano, risotti mantecati e specialità dello Chef con tartufo e caviale.",
      "items": [
        { "id": "ac_p1", "name": "Mezzi Paccheri Mancini", "description": "con Scorfano***, duetto di datterino e basilico", "price": "19.00", "allergens": [1, 2, 4, 9, 12, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "ac_p2", "name": "Riso riserva San Massimo", "description": "mantecato al Castelmagno, trevisana al vino rosso e animelle al vitello*", "price": "19.00", "allergens": [3, 7, 9], "isFeatured": false, "extras": [] },
        { "id": "ac_p3", "name": "Fettuccine con vongole", "description": "cime di rapa e gocce di provola silana", "price": "23.00", "allergens": [1, 3, 4, 7, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "ac_p4", "name": "Bottoni** di pasta fresca", "description": "ripieni di ossobuco, crema allo zafferano, fondo di vitello e salvia fritta", "price": "17.00", "allergens": [3, 5, 6, 7, 9], "isFeatured": false, "extras": [] },
        { "id": "ac_p5", "name": "Gnocchi* freschi", "description": "ai formaggi di latte misto con miele e noci", "price": "14.00", "allergens": [1, 3, 5, 7, 8, 9, 12], "isFeatured": false, "extras": [] },
        { "id": "ac_p6", "name": "Tagliolini all\'Astice Canadese", "description": "pomodorini e basilico fresco (In base alla disponibilità dello chef)", "price": "70.00", "allergens": [1, 2, 4, 9], "isFeatured": false, "extras": [] },
        { "id": "ac_p7", "name": "Riso Riserva San Massimo allo zafferano", "description": "con ossobuco di vitello in gremolada (In base alla disponibilità dello chef)", "price": "36.00", "allergens": [1, 5, 7, 8, 9], "isFeatured": false, "extras": [] },
        { "id": "ac_p8", "name": "Riso Riserva San Massimo ai funghi porcini", "description": "ai funghi porcini di Borgotaro (In base alla disponibilità dello chef)", "price": "23.00", "allergens": [7, 9], "isFeatured": false, "extras": [] },
        { "id": "ac_p9", "name": "Tagliolini al burro, zest di limone con Tartufo", "description": "Tagliolini freschi mantecati al burro e profumati con zest di limone, arricchiti con tartufo fresco a consumo", "price": "10.00", "allergens": [1, 7], "isFeatured": false, "extras": [{ "id": "ac_ex_tartufo_tagliolini", "name": "+ Tartufo fresco a consumo", "price": "€2,5/g", "description": "in base alla disponibilità del mercato" }] },
        { "id": "ac_p10", "name": "Tagliolini al burro, zest di limone con Caviali ADAMAS", "description": "Tagliolini freschi mantecati al burro e zest di limone serviti con prestigiosa selezione di caviale ADAMAS a scelta", "price": "10.00", "allergens": [1, 7], "isFeatured": false, "extras": [{ "id": "ac_ex_caviale_aqua", "name": "+ The Aqua Adamas Riviera Selection", "price": "€45/10g o €95/30g", "description": "Storione Italiano" }, { "id": "ac_ex_caviale_beluga", "name": "+ The Premium Beluga", "price": "€90/10g o €195/30g", "description": "Storione Beluga (Huso)" }] }
      ]
    },
    {
      "id": "secondi_piatti",
      "name": "Secondi Piatti",
      "description": "Pag. 0003 · Carni nobili piemontesi, pescato del giorno e grandi preparazioni della tradizione.",
      "items": [
        { "id": "ac_s1", "name": "Ossobuco di vitello in gremolada", "description": "con purè di patate", "price": "33.00", "allergens": [1, 5, 7, 8, 9], "isFeatured": false, "extras": [] },
        { "id": "ac_s2", "name": "Guancia di vitello al vino rosso", "description": "profumo di cannella e cioccolato fondente con cavolo nero brasato al peperoncino", "price": "35.00", "allergens": [1, 6, 7, 8, 9, 12], "isFeatured": false, "extras": [] },
        { "id": "ac_s3", "name": "Frittura di pesce", "description": "con gamberi*, calamari*, baccalà* e maionese al lime", "price": "23.00", "allergens": [1, 2, 4, 5, 8, 12], "isFeatured": false, "extras": [] },
        { "id": "ac_s4", "name": "Zuppetta di pesce***", "description": "in base alla disponibilità del pescato con crostone di pane", "price": "24.00", "allergens": [1, 2, 4, 5, 8, 9, 12, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "ac_s5", "name": "Filetto di manzo bavarese ai ferri", "description": "con cime di rapa e salsa bernese", "price": "28.00", "allergens": [5, 7, 8, 9, 10, 11], "isFeatured": false, "extras": [] },
        { "id": "ac_s6", "name": "Rana pescatrice* in foglia di verza", "description": "con salsa alle vongole e gel di nero di seppia", "price": "24.00", "allergens": [1, 4, 5, 7, 8, 9, 12, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "ac_s7", "name": "Branzino al sale da 1/1.3 kg", "description": "con patate al forno e verdure sautè (In base alla disponibilità dello chef)", "price": "120.00", "allergens": [4, 5, 7], "isFeatured": false, "extras": [] },
        { "id": "ac_s8", "name": "Rombo al forno da 1/1.3 kg", "description": "con salsa mediterranea, patate al forno e verdure sautè (In base alla disponibilità dello chef)", "price": "130.00", "allergens": [4, 5, 7], "isFeatured": false, "extras": [] },
        { "id": "ac_s9", "name": "Aragosta ai ferri | per 2 persone", "description": "con burro alla maître d\'hôtel e verdure di stagione (In base alla disponibilità dello chef)", "price": "130.00", "allergens": [2, 4], "isFeatured": false, "extras": [] },
        { "id": "ac_s10", "name": "Grigliata di pesce***", "description": "in base al pescato del giorno accompagnata da verdure alla griglia e maionese al lime (In base alla disponibilità dello chef)", "price": "31.00", "allergens": [2, 4, 12, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "ac_s11", "name": "Fiorentina di Scottona piemontese da 1,2/1,5 kg", "description": "con patate al forno e verdure sautè (In base alla disponibilità dello chef)", "price": "130.00", "allergens": [5, 7], "isFeatured": false, "extras": [] },
        { "id": "ac_s12", "name": "Costata di Scottona piemontese da 500/600 gr", "description": "con patate al forno e verdure sautè (In base alla disponibilità dello chef)", "price": "55.00", "allergens": [5, 7], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "pizze",
      "name": "Pizze",
      "description": "Pag. 0004 · Impasti a lunga lievitazione e materie prime d\'eccellenza.",
      "items": [
        { "id": "ac_pz1", "name": "La Classica*", "description": "Pomodoro, mozzarella fior di latte, mozzarella di bufala e basilico", "price": "13.00", "allergens": [1, 3, 6, 7, 8, 10, 11, 13], "isFeatured": false, "extras": [] },
        { "id": "ac_pz2", "name": "La Bella*", "description": "Mozzarella fior di latte, mortadella, pistacchi e stracciatella", "price": "15.00", "allergens": [1, 3, 6, 7, 8, 10, 11, 13], "isFeatured": false, "extras": [] },
        { "id": "ac_pz3", "name": "La 4 Formaggi*", "description": "Mozzarella fior di latte, gorgonzola, taleggio e scamorza", "price": "14.00", "allergens": [1, 3, 6, 7, 8, 10, 11, 13], "isFeatured": false, "extras": [] },
        { "id": "ac_pz4", "name": "La Piccante*", "description": "Pomodoro, mozzarella fior di latte, salame piccante", "price": "14.00", "allergens": [1, 3, 6, 7, 8, 10, 11, 13], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "dolci",
      "name": "Dolci",
      "description": "Pag. 0004 · Pasticceria artigianale preparata ogni giorno dalla nostra brigata.",
      "items": [
        { "id": "ac_d1", "name": "Tarte tatin di mela", "description": "con gelato alla cannella", "price": "8.00", "allergens": [1, 3, 5, 6, 7, 8, 12], "isFeatured": false, "extras": [] },
        { "id": "ac_d2", "name": "Frolla artigianale", "description": "con cremoso di cioccolato e pere allo zafferano", "price": "9.00", "allergens": [1, 3, 5, 7, 8], "isFeatured": false, "extras": [] },
        { "id": "ac_d3", "name": "Cremoso al Gianduia", "description": "croccante di arachidi e caramello salato", "price": "13.00", "allergens": [3, 7, 8, 12], "isFeatured": false, "extras": [] },
        { "id": "ac_d4", "name": "Sorbetto a Limone o mela verde", "description": "mantecato al tavolo", "price": "10.00", "allergens": [1, 3, 6, 7, 8], "isFeatured": false, "extras": [{ "id": "ac_ex_sorbetto_distillato", "name": "Con aggiunta di distillato", "price": "+2,00€", "description": "Vodka premium o Calvados" }] },
        { "id": "ac_d5", "name": "Gelato artigianale a scelta", "description": "fior di latte, cioccolato, pistacchio", "price": "6.00", "allergens": [1, 3, 6, 7, 8], "isFeatured": false, "extras": [] },
        { "id": "ac_d6", "name": "Carrello con selezione di formaggi | per 2 persone", "description": "con confetture, miele, frutta secca e mostarda", "price": "25.00", "allergens": [3, 5, 6, 7, 8, 9, 10, 11], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "caffetteria_coperto",
      "name": "Caffetteria & Coperto",
      "description": "Pag. 0004 · Servizio al tavolo e caffetteria.",
      "items": [
        { "id": "ac_b1", "name": "Acqua", "description": "Naturale o Frizzante", "price": "2.00", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "ac_b2", "name": "Caffè Nespresso", "description": "Selezione Grand Cru Nespresso", "price": "3.00", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "ac_b3", "name": "Coperto", "description": "Servizio e pane artigianale", "price": "4.00", "allergens": [1], "isFeatured": false, "extras": [] }
      ]
    }
  ]
}')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_json=VALUES(content_json);

-- Inserimento dati iniziali Business Lunch (Aggiornato 19 - 23 Ottobre 2026)
INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) 
VALUES ('business_lunch', 'Menù Business Lunch', 'Menù Business Lunch 19-23 Ottobre 2026 | Ristorante La Pinetina', 'Menù Business Lunch di Ristorante La Pinetina valido dal 19 al 23 Ottobre 2026. Menù Primo a 12€, Secondo a 14€, Completo a 20€ (inclusi coperto, acqua e caffè), Specialità, Contorni, Dolci e Vini al calice.', '{
  "title": "Menù Business Lunch",
  "slug": "menu-business-lunch",
  "isActive": true,
  "seoTitle": "Menù Business Lunch 02-06 Novembre 2026 | Ristorante La Pinetina",
  "seoDescription": "Menù Business Lunch di Ristorante La Pinetina valido dal Lunedì 02/11 al Venerdì 06/11 a pranzo. Menù Primo a 12€, Secondo a 14€, Completo a 20€ (inclusi coperto, acqua e caffè), Specialità, Contorni, Dolci e Vini del giorno.",
  "subtitle": "Dal Lunedì 02/11 al Venerdì 06/11 Pranzo | INCLUSI coperto, acqua e caffè",
  "categories": [
    {
      "id": "primo_scelta",
      "name": "MENÙ PRIMO (A SCELTA) - 12€",
      "description": "Inclusi coperto, acqua e caffè - 12€",
      "items": [
        { "id": "bl_p1", "name": "Fusilloni alla norma", "description": "con melanzane, pomodoro, basilico fresco e ricotta salata", "price": "12.00", "allergens": [1, 7], "isFeatured": false, "extras": [] },
        { "id": "bl_p2", "name": "Risotto alla salsiccia e parmigiano", "description": "mantecato con salsiccia nostrana e Parmigiano Reggiano", "price": "12.00", "allergens": [7], "isFeatured": false, "extras": [] },
        { "id": "bl_p3", "name": "Mezze maniche al ragù di pesce", "description": "pasta fresca con ragù di pescato fresco e pomodorini", "price": "12.00", "allergens": [1, 4, 9, 14], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "secondo_scelta",
      "name": "MENÙ SECONDO (A SCELTA) - 14€",
      "description": "Inclusi coperto, acqua e caffè - 14€",
      "items": [
        { "id": "bl_s1", "name": "Salsiccia e friarielli con patate al forno", "description": "saporita salsiccia rosolata con friarielli campani e patate al forno", "price": "14.00", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "bl_s2", "name": "Cavolfiori gratinati con besciamella e formaggio", "description": "al forno dorati con besciamella artigianale e formaggio filante", "price": "14.00", "allergens": [1, 7], "isFeatured": false, "extras": [] },
        { "id": "bl_s3", "name": "Bocconcino di pollo al curry con riso pilaf e verdure", "description": "bocconcini di pollo tenero al curry profumato accompagnati da riso pilaf e verdure", "price": "14.00", "allergens": [], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "completo_scelta",
      "name": "MENÙ COMPLETO - 20€",
      "description": "Primo a scelta + Secondo a scelta tra le proposte del giorno (Inclusi coperto, acqua e caffè)",
      "items": [
        { "id": "bl_c1", "name": "Primo a scelta + Secondo a scelta", "description": "Scegli un primo e un secondo tra i piatti del giorno. Inclusi coperto, acqua e caffè", "price": "20.00", "allergens": [], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "specialita",
      "name": "LE SPECIALITÀ",
      "description": "Le proposte speciali dello Chef per la pausa pranzo",
      "items": [
        { "id": "bl_sp1", "name": "RIBOLLITA TOSCANA", "description": "con fagioli, cavolo nero, patate e verdure di stagione", "price": "13.00", "allergens": [1, 9], "isFeatured": false, "extras": [] },
        { "id": "bl_sp2", "name": "HAMBURGER", "description": "di manzo con crema di avocado, insalata, pomodoro, bacon croccante, con patatine fritte e salsa rosa", "price": "15.00", "allergens": [1, 3, 7, 10, 11], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "contorni",
      "name": "CONTORNO - 5€",
      "description": "Contorni freschi di stagione - 5€ cad.",
      "items": [
        { "id": "bl_co1", "name": "Patate al forno", "description": "dorate con erbe aromatiche", "price": "5.00", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "bl_co2", "name": "Purè di patate", "description": "morbido e mantecato con burro e latte", "price": "5.00", "allergens": [7], "isFeatured": false, "extras": [] },
        { "id": "bl_co3", "name": "Verdure grigliate", "description": "selezione di verdure fresche alla griglia", "price": "5.00", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "bl_co4", "name": "Insalata mista", "description": "misticanza fresca di stagione", "price": "5.00", "allergens": [], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "dolci",
      "name": "DOLCE - 4€",
      "description": "I dessert della casa - 4€ cad.",
      "items": [
        { "id": "bl_d1", "name": "Strudel di mela con panna montata", "description": "tradizionale strudel di mele profumato alla cannella con soffice panna montata", "price": "4.00", "allergens": [1, 3, 7, 8], "isFeatured": false, "extras": [] },
        { "id": "bl_d2", "name": "Gelato al cioccolato", "description": "cremoso gelato artigianale al cioccolato", "price": "4.00", "allergens": [7], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "vini",
      "name": "VINO DEL GIORNO - 5€",
      "description": "I vini selezionati al calice per il pranzo - 5€ cad.",
      "items": [
        { "id": "bl_v1", "name": "Mesa BUIO, carignano", "description": "Cantina Mesa - Carignano del Sulcis DOC, rosso elegante e avvolgente", "price": "5.00", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bl_v2", "name": "Mesa GIUNCO, vermentino", "description": "Cantina Mesa - Vermentino di Sardegna DOC, bianco fresco, minerale e profumato", "price": "5.00", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    }
  ]
}')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_json=VALUES(content_json);

-- Inserimento dati iniziali Menù Serata Bollito
INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) 
VALUES ('serata_bollito', 'Serata Bollito', 'Menù Serata Bollito del Giovedì | Ristorante La Pinetina', 'Ogni Giovedì sera al Ristorante La Pinetina: Gran Carrello dei Bolliti, Mondeghino di benvenuto, salse tradizionali, contorni caldi e calice di vino a 40€ a persona (coperto e acqua inclusi).', '{
  "title": "Serata Bollito",
  "slug": "serata-bollito",
  "isActive": true,
  "seoTitle": "Menù Serata Bollito del Giovedì | Ristorante La Pinetina",
  "seoDescription": "Ogni Giovedì sera al Ristorante La Pinetina: Gran Carrello dei Bolliti, Mondeghino di benvenuto, salse tradizionali, contorni caldi e calice di vino a 40€ a persona (coperto e acqua inclusi).",
  "subtitle": "Tutti i Giovedì a Cena · 40€ a Persona (Coperto, acqua e calice di vino inclusi)",
  "categories": [
    {
      "id": "benvenuto_chef",
      "name": "Il Benvenuto dello Chef",
      "description": "L''apertura della serata con la grande tradizione milanese",
      "items": [
        { "id": "boll_b1", "name": "Mondeghino della tradizione", "description": "Tradizionale polpetta milanese dorata e croccante, accompagnata da maionese al cappero", "price": "Incluso", "allergens": [1, 3, 7], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "carrello_bolliti",
      "name": "Il Carrello dei Bolliti",
      "description": "I migliori tagli di carne selezionati e cotti a regola d''arte nel brodo aromatico della tradizione",
      "items": [
        { "id": "boll_c1", "name": "Muscolo di scottona", "description": "Tenero muscolo di pregiata scottona cotto a fuoco lento", "price": "Incluso", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "boll_c2", "name": "Lingua di vitello salmistrata", "description": "Delicata lingua di vitello marinata e speziata secondo antica ricetta", "price": "Incluso", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "boll_c3", "name": "Biancostato di manzo", "description": "Taglio ricco e succulento di manzo bollito", "price": "Incluso", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "boll_c4", "name": "Cotechino artigianale", "description": "Autentico cotechino di lavorazione artigianale nostrana", "price": "Incluso", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "salse_condimenti",
      "name": "Salse & Condimenti",
      "description": "Le quattro salse d''accompagnamento immancabili per il gran bollito",
      "items": [
        { "id": "boll_s1", "name": "Salsa verde tradizionale", "description": "A base di prezzemolo fresco, acciughe, capperi e mollica", "price": "Incluso", "allergens": [1, 3, 4, 12], "isFeatured": false, "extras": [] },
        { "id": "boll_s2", "name": "Salsa cren", "description": "Piccante e balsamica salsa al rafano fresco grattugiato", "price": "Incluso", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "boll_s3", "name": "Mostarda piacentina", "description": "Frutta mista candita piccante e speziata all''essenza di senape", "price": "Incluso", "allergens": [10, 12], "isFeatured": false, "extras": [] },
        { "id": "boll_s4", "name": "Cipolline borretane in agrodolce", "description": "Delicate cipolline glassate all''aceto balsamico e miele", "price": "Incluso", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "contorni_caldi",
      "name": "Contorni Caldi",
      "description": "Contorni caldi preparati al momento per esaltare le carni",
      "items": [
        { "id": "boll_co1", "name": "Patate al vapore", "description": "Patate tenere cotte a vapore con sale grosso ed erbe", "price": "Incluso", "allergens": [], "isFeatured": false, "extras": [] },
        { "id": "boll_co2", "name": "Erbette ripassate in padella", "description": "Verdure di campo a foglia verde saltate in padella con olio extravergine", "price": "Incluso", "allergens": [], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "vini_inclusi",
      "name": "Un Calice di Vino a Scelta Incluso",
      "description": "Selezione della prestigiosa cantina Pico Maccario inclusa nel prezzo del menù",
      "items": [
        { "id": "boll_v1", "name": "Anima Mia – Pico Maccario Barbera & Nebbiolo 2025", "description": "Pico Maccario - Rosso armonico, fresco e strutturato, perfetto abbinamento per il bollito", "price": "Incluso", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "boll_v2", "name": "Anima Mia – Pico Maccario Chardonnay Lazio IGT 2025", "description": "Pico Maccario - Bianco minerale e avvolgente con note fruttate", "price": "Incluso", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    }
  ]
}')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_json=VALUES(content_json);

-- Inserimento dati iniziali Carta dei Vini (Tutte le 12 Categorie)
INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) 
VALUES ('vini', 'Carta dei Vini', 'Carta dei Vini | Ristorante La Pinetina', 'La nostra esclusiva selezione di bollicine, champagne, vini bianchi, rosati, rossi e passiti.', '{
  "title": "Carta dei Vini",
  "slug": "menu-vini",
  "isActive": true,
  "seoTitle": "Carta dei Vini | Ristorante La Pinetina",
  "seoDescription": "La nostra esclusiva selezione di bollicine, champagne, vini bianchi, rosati, rossi e passiti.",
  "subtitle": "Selezione Curata della Nostra Cantina",
  "categories": [
    {
      "id": "bollicine",
      "name": "Bollicine",
      "description": "Metodo Classico e spumanti d''eccellenza",
      "items": [
        { "id": "bol1", "name": "Athesis brut DOC (Alto Adige)", "description": "Kettmeir - Chardonnay, Pinot Bianco, Pinot Nero 12.5% Vol.", "price": "45", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol2", "name": "Athesis brut rosè DOC (Alto Adige)", "description": "Kettmeir - Pinot Nero, Chardonnay 12.5% Vol.", "price": "54", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol3", "name": "1919 Riserva extra brut 2018 (Alto Adige)", "description": "Kettmeir - Chardonnay, Pinot Nero 13% Vol.", "price": "70", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol4", "name": "Ferrari Perlè 2019 (Trentino- Alto Adige)", "description": "Ferrari - Chardonnay 12.5% Vol. 2019", "price": "85", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol5", "name": "Riserva Giulio Ferrari 2015 (Trentino- Alto Adige)", "description": "Ferrari - Chardonnay 12.5% Vol.", "price": "250", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol6", "name": "Franciacorta ''61 Saten (Lombardia)", "description": "Berlucchi - Chardonnay 12.5% Vol.", "price": "42", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol7", "name": "Franciacorta ''61 Rosè (Lombardia)", "description": "Berlucchi - Pinot Nero, Chardonnay 12.5% Vol.", "price": "45", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol8", "name": "Franciacorta Nature 2019 (Lombardia)", "description": "Berlucchi - Chardonnay, Pinto Nero 12.5% Vol.", "price": "56", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol9", "name": "Franciacorta Nature Rose'' 2018 (Lombardia)", "description": "Berlucchi - Pinot Nero 12,5% Vol. 2018", "price": "86", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol10", "name": "Spumante Origine brut (Veneto)", "description": "Valdo - Glera 11.5% Vol.", "price": "26", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol11", "name": "Spumante Origine brut rosè (Veneto)", "description": "Valdo - Nerello Mascalese 11.5% Vol.", "price": "26", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bol12", "name": "Valdobbiadene Prosecco Superiore DOCG BRUT (Veneto)", "description": "Santa Margherita - Glera 11.5% Vol.", "price": "30", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "champagne",
      "name": "Champagne",
      "description": "Le più prestigiose Maison francesi",
      "items": [
        { "id": "ch1", "name": "Bollinger Special Cuveè Brut", "description": "Bollinger - Chardonnay, Pinot Meunier, Pinot Noir 12% Vol.", "price": "122", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ch2", "name": "Perrier Jouet Blanc de Blancs Brut", "description": "Perrier Jouet - Chardonnay 12.5% Vol.", "price": "143", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ch3", "name": "Nicolas Feuillatte Reserve", "description": "Nicolas Feuillatte - Pinot Noir, Pinot Meunier, Chardonnay 12.5% Vol.", "price": "90", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ch4", "name": "Louis Roederer - Collection 246", "description": "Louis Roedere - Pinot Noir, Pinot Meunier, Chardonnay 12.5% Vol.", "price": "150", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ch5", "name": "Alexander Bonnet - Blanc de Noir", "description": "Alexander Bonnet - Pinot Noir, 12.5% Vol.", "price": "116", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "magnum",
      "name": "Magnum 1.5l",
      "description": "I grandi formati da condividere",
      "items": [
        { "id": "mag1", "name": "Franciacorta ''61 Saten (Lombardia)", "description": "Berlucchi - Chardonnay 12.5% Vol.", "price": "88", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "mag2", "name": "Franciacorta ''61 Rosè (Lombardia)", "description": "Berlucchi - Pinot Nero, Chardonnay 12.5% Vol.", "price": "90", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "mag3", "name": "Alexander Bonnet - Blanc de Noir (Champagne)", "description": "Alexandre Bonnet - Pinto Noir 12.5% Vol.", "price": "250", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "bianchi_italia",
      "name": "Vini Bianchi - Italia",
      "description": "Espressioni d''eccellenza delle regioni italiane",
      "items": [
        { "id": "bi1", "name": "Nascetta DOC - 2025 (Piemonte)", "description": "Az.Agricola Elvio - Nascetta 13% Vol.", "price": "48", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi2", "name": "Roero Arneis - 2024 (Piemonte)", "description": "Deltetto - Roero Arneis 13.5% Vol.", "price": "37", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi3", "name": "Riesling Kaiton - 2024 (Alto Adige)", "description": "Az. Agricola Kuen Hofdi Simon Pliger - Bressanone 12.5% Vol.", "price": "51", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi4", "name": "Gewurztraminer - 2025 (Alto Adige)", "description": "Kettmeir - Gewurztraminer 13.5% Vol.", "price": "36", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi5", "name": "Muller Thurgau (Alto Adige)", "description": "Kettmeir - Sauvignon 13% Vol.", "price": "35", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi6", "name": "Sauvignon - 2025 (Alto Adige)", "description": "Kettmeir - Sauvignon 13.5%", "price": "36", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi7", "name": "MASO Chardonnay - 2023 (Alto Adige)", "description": "Kettmeir - Chardonnay Vol. 14%", "price": "54", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi8", "name": "Friulano (Friuli-Venezia Giulia)", "description": "Russiz - Friulano 13% Vol.", "price": "34", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi9", "name": "Pinot Bianco - 2025 (Friuli-Venezia Giulia)", "description": "Russiz - Pinot Bianco 13.5 % Vol.", "price": "44", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi10", "name": "Ribolla Gialla (Friuli-Venezia Giulia)", "description": "Magredi - Ribolla Gialla 12,5% Vol", "price": "32", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi11", "name": "MOLIN Lugana Superiore DOC - 2023 (Veneto)", "description": "Ca Maiol - Lugana 13% Vol.", "price": "40", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi12", "name": "Lugana PRESTIGE - 2025 (Veneto)", "description": "Ca Maiol - Lugana 13.5% Vol.", "price": "28", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi13", "name": "Pecorino Bio DOCG - 2024 (Abruzzo)", "description": "Villa Angela Offida - Pecorino 13% Vol.", "price": "34", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi14", "name": "EDDA - 2024 (Puglia)", "description": "San Marzano - Chardonnay 14% Vol.", "price": "38", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi15", "name": "SERRO CIELO - 2024 (Campania)", "description": "Feudi di San Gregorio - Falanghina 12.5% Vol.", "price": "31", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi16", "name": "Lighea — 2025 (Sicilia)", "description": "Donna Fugata - Zibibbo 13% Vol.", "price": "38", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi17", "name": "Sul Vulcano - 2022 (Sicilia)", "description": "Donna Fugata - Etna Bianco 12,5% Vol.", "price": "47", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi18", "name": "Passiperduti- 2025 (Sicilia)", "description": "Donna Fugata - Grillo 13 % Vol.", "price": "39", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi19", "name": "Giunco — 2025 (Sardegna)", "description": "Mesa - Vermentino 13.5% Vol.", "price": "31", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bi20", "name": "Opale — 2024 (Sardegna)", "description": "Mesa - Vermentino 14 % Vol.", "price": "40", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "bianchi_mondo",
      "name": "Vini Bianchi - Mondo",
      "description": "Grandi etichette bianche francesi e internazionali",
      "items": [
        { "id": "bm1", "name": "Bourgogne Chardonnay — 2024 (Bourgogne)", "description": "Maison Louis Latour di Beune - Chardonnay 12.5% Vol.", "price": "53", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bm2", "name": "Chablis la Chanfleure — 2024 (Bourgogne)", "description": "Maison Louis Latour di Beaune - Chardonnay 12.5% Vol.", "price": "61", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bm3", "name": "Bourgogne Aligotè — 2025 (Bourgogne)", "description": "Maison Louis Latour di Beaune - Chardonnay 12.5% Vol.", "price": "44", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bm4", "name": "Meursault sous la velle — 2023 (Bourgogne)", "description": "Domaine Michelot di Mersault - Chardonnay 12.5% Vol.", "price": "148", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "bm5", "name": "Sancerre Cuvèe Galinot Silex - 2022 (Loire)", "description": "Domaine Gitton Père at fils di Mènètrèol sous Sancerre - Sauvignon Blanc 14% Vol.", "price": "89", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "rosati_italia",
      "name": "Vini Rosati - Italia",
      "description": "Freschezza, eleganza e profumi floreali",
      "items": [
        { "id": "ro1", "name": "ROSERI - 2025 (Lombardia)", "description": "Cà Maiol - Chiaretto 12.5% Vol.", "price": "27", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ro2", "name": "Tramari - 2025 (Puglia)", "description": "San Marzano - Primirivo 12.5% Vol.", "price": "31", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ro3", "name": "San Greg - 2024 (Campania)", "description": "Feudi di San Gregorio - Aglianico 12% Vol.", "price": "31", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ro4", "name": "Rosa Grande - 2025 (Sardegna)", "description": "Mesa - Sirah, Vermentino 13% Vol.", "price": "30", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "rosati_mondo",
      "name": "Vini Rosati - Mondo",
      "description": "Il fascino dei grandi rosati provenzali",
      "items": [
        { "id": "rom1", "name": "AIX Rosè - 2025 (Provenza)", "description": "Coteaux d''Aix en Provence AOC - Grenache 13% Vol.", "price": "52", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "passiti_italia",
      "name": "Vini Passiti - Italia",
      "description": "Vini da dessert e meditazione della tradizione italiana",
      "items": [
        { "id": "pas1", "name": "Ben Rye — Passito di Pantelleria DOC - 2023 (Sicilia)", "description": "Donna Fugata - Zibibbo 375 cl 14.5% Vol.", "price": "58", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "passiti_mondo",
      "name": "Vini Passiti - Mondo",
      "description": "La nobile tradizione del Sauternes",
      "items": [
        { "id": "pasm1", "name": "Sauternes - 2023 (Bordeaux)", "description": "Chateau Liot - Semillon, Sauvignon, Muscadelle 13.5% Vol.", "price": "53", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "al_calice",
      "name": "Vini al calice",
      "description": "Grandi passiti e vini fortificati serviti al calice",
      "items": [
        { "id": "cal1", "name": "Ben Rye — Passito di Pantelleria DOC - 2023 (Sicilia)", "description": "Donna Fugata - Zibibbo 14.5% Vol.", "price": "9", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "cal2", "name": "Sauternes - 2023 (Bordeaux)", "description": "Chateau Liot - Semillon, Sauvignon, Muscadelle 13.5% Vol.", "price": "9", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "cal3", "name": "Forterosso - Passito Rosso - 2023 (Sardegna)", "description": "Mesa - Carignano del Sulcis DOC 14.5% Vol.", "price": "8", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "cal4", "name": "Porto Tawny Reserve (Portogallo, Valle del Duoro)", "description": "Bulas Quinta da Foz - Touriga Nacional, Touriga Francia, Tempranillo, Tinta Barroca 19.5% Vol.", "price": "8", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "rossi_italia",
      "name": "Vini Rossi - Italia",
      "description": "I grandi vitigni e territori rossi d''Italia",
      "items": [
        { "id": "ros1", "name": "Lagrein - 2024 (Alto Adige)", "description": "Kettmeir - Lagrein 13% Vol.", "price": "31", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros2", "name": "Pinot Nero - 2024 (Alto Adige)", "description": "Kettmeir - Pinot Nero 13.5% Vol", "price": "33", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros3", "name": "MASO Pinot Nero - 2023 (Alto Adige)", "description": "Kettmeir - Pinot Nero 14% Vol.", "price": "53", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros4", "name": "Sassella 2021 - (Lombardia)", "description": "Nino Negri - Nebbiolo 13.5% Vol.", "price": "43", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros5", "name": "Cabernet Franc - 2022 (Friuli Venezia Giulia)", "description": "Russiz - Cabernet Franc 13% Vol. 2022", "price": "48", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros6", "name": "Barbera d''Alba - 2023 (Piemonte)", "description": "Deltetto - Barbera 14.5% Vol", "price": "51", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros7", "name": "Barolo - 2019 (Piemonte)", "description": "Deltetto - Nebbiolo 14.5% Vol", "price": "60", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros8", "name": "Valpolicella Classico - 2025 (Veneto)", "description": "Monte del Fra - Corvina, Corvione, Rondinella 12.5 % Vol.", "price": "27", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros9", "name": "Valpolicella Ripasso - 2022 (Veneto)", "description": "Monte del Fra - Corvina, Corvione, Rondinella 14% Vol.", "price": "45", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros10", "name": "Amarone della Valpolicella - 2020 (Veneto)", "description": "Monte del Fra - Corvina, Corvione, Rondinella 15.5% Vol. 2020", "price": "70", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros11", "name": "Cabernet Sauvignon - 2025 (Veneto)", "description": "Magredi - Cabernet Sauvignon 12.5% Vol.", "price": "29", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros12", "name": "Montepulciano - 2023 (Abruzzo)", "description": "Velenosi - Montepulciano 13.5% Vol.", "price": "26", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros13", "name": "Ruit Hora Bolgheri- 2023 (Toscana)", "description": "Caccia al Piano - Cabernet Sauvignon, Merlot, Petit Verdot, Syrah 13% Vol.", "price": "45", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros14", "name": "Caccia al Piano Bolgheri Sup. - 2021 (Toscana)", "description": "Caccia al Piano Bolgheri - Cabernet Sauvignon, Cabernet Franc 14.5% Vol.", "price": "108", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros15", "name": "DUELAME - 2023 (Toscana)", "description": "Lamole di Lamole - Chianti classico 14% Vol.", "price": "40", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros16", "name": "“F” - 2022 (Puglia)", "description": "San Marzano - Negroamaro 14.5%", "price": "45", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros17", "name": "Sessant’anni Primitivo di Manduria - 2020 (Puglia)", "description": "San Marzano - Primitivo 14.5%", "price": "46", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros18", "name": "Tancredi x Dolce&Gabbana - 2021 (Sicilia)", "description": "Donna Fugata - Cabernet Sauvignon, Nero d’Avola e varie varietà 13.5% Vol.", "price": "56", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros19", "name": "Sul Vulcano Etna Rosso - 2022 (Sicilia)", "description": "Donna Fugata - Etna Rosso 14% Vol.", "price": "47", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros20", "name": "Buio — 2024 (Sardegna)", "description": "Mesa - Carignano 14% Vol.", "price": "30", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "ros21", "name": "Buio Buio Riserva - 2022 (Sardegna)", "description": "Mesa - Carignano 14.5% Vol.", "price": "52", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    },
    {
      "id": "rossi_mondo",
      "name": "Vini Rossi - Mondo",
      "description": "Grandi rossi internazionali dalla California e dalla Borgogna",
      "items": [
        { "id": "romd1", "name": "Zinfandel - 2021 (California)", "description": "The Big Top - Zinfandel 13.5% Vol.", "price": "35", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "romd2", "name": "Les Ormes de Pez - 2019 (Bordeaux)", "description": "Chateaux Saint Estèphe - Merlot, Cabernet Sauvignon, Cabernet Franc, Petit Verdot 14.5% Vol.", "price": "73", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "romd3", "name": "Bourgogne Gamay - 2024 (Bourgogne)", "description": "Maison Louis Latour di Beaune - Gamay 13% Vol.", "price": "44", "allergens": [12], "isFeatured": false, "extras": [] },
        { "id": "romd4", "name": "Bourgogne Pinot Noir - 2024 (Bourgogne)", "description": "Maison Louis Latour di Beaun - Pinot Noir 14.5% Vol.", "price": "50", "allergens": [12], "isFeatured": false, "extras": [] }
      ]
    }
  ]
}')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_json=VALUES(content_json);
