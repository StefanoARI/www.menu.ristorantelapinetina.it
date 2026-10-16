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

-- Inserimento dati iniziali Menù alla Carta
INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) 
VALUES ('alla_carta', 'Menù alla Carta', 'Menù alla Carta | Ristorante La Pinetina', 'Scopri il nostro Menù alla Carta con antipasti d''eccezione, caviali ADAMAS, primi di pasta fresca, secondi di carne e pesce, pizze gourmet e dolci artigianali.', '{
  "title": "Menù alla Carta",
  "slug": "menu",
  "seoTitle": "Menù alla Carta | Ristorante La Pinetina",
  "seoDescription": "Scopri il nostro Menù alla Carta con antipasti d\'eccezione, caviali ADAMAS, primi di pasta fresca, secondi di carne e pesce, pizze gourmet e dolci artigianali.",
  "categories": [
    {
      "id": "antipasti",
      "name": "Antipasti",
      "description": "I nostri antipasti preparati con ingredienti freschi di stagione.",
      "items": [
        { "id": "a1", "name": "Carciofi in oliocottura", "description": "con mentuccia fresca", "price": "16.00", "allergens": [5], "isFeatured": false, "extras": [] },
        { "id": "a2", "name": "Moscardini* in guazzetto", "description": "origano e olive taggiasche", "price": "15.00", "allergens": [1, 4, 9, 12, 13, 14], "isFeatured": true, "extras": [] },
        { "id": "a3", "name": "Crostoni di polenta", "description": "con fonduta al Casera, pasta di salame mantovana e erba cipollina", "price": "15.00", "allergens": [1, 3, 5, 8], "isFeatured": false, "extras": [] },
        { "id": "a4", "name": "Vellutata di zucca", "description": "con sedano al limone, gamberi*, bacon e semi di zucca", "price": "15.00", "allergens": [2, 4, 8, 9], "isFeatured": false, "extras": [] },
        { "id": "a5", "name": "Capasanta* scottata", "description": "su crema di patate e carciofi croccanti", "price": "14.00", "allergens": [4, 12, 14], "isFeatured": true, "extras": [] },
        { "id": "a6", "name": "Battuta di filetto di manzo irlandese", "description": "mela verde e salsa al Parmigiano", "price": "18.00", "allergens": [7], "isFeatured": true, "extras": [{ "id": "ex1", "name": "+ Tartufo fresco a consumo", "price": "€2,5/g", "description": "in base alla disponibilità del mercato" }] },
        { "id": "a7", "name": "Ovetto al tegamino", "description": "con asparagi sautè e Parmigiano", "price": "12.00", "allergens": [3, 7], "isFeatured": false, "extras": [{ "id": "ex2", "name": "+ Tartufo fresco a consumo", "price": "€2,5/g", "description": "in base alla disponibilità del mercato" }] },
        { "id": "a8", "name": "Insalatina di puntarelle", "description": "con mozzarella di Bufala e acciughe del Mediterraneo", "price": "14.00", "allergens": [4, 7], "isFeatured": false, "extras": [] },
        { "id": "a9", "name": "Cruditè di pesce | per 2 persone", "description": "Ricci di mare, Salmone**, Tonno rosso**, Scampi Danimarca*, gambero di Mazara*, Capasanta*, Ostriche Fin de Claire, Tartufo di mare", "price": "60.00", "allergens": [2, 4, 12, 14], "isFeatured": true, "extras": [] }
      ]
    },
    {
      "id": "caviali",
      "name": "Selezione di caviali ADAMAS",
      "description": "Serviti in accompagnamento con: Pan brioche tostato, panna acida al rafano, burro alla maître d\'hôtel, pane carasau al rosmarino, cipolla rossa di Tropea all\'aceto di vino rosso",
      "items": [
        { "id": "c1", "name": "The Aqua Adamas Riviera Selection / Storione Italiano", "description": "€45/10gr o €95/30g", "price": "45.00", "allergens": [1, 3, 5, 6, 7, 8, 10, 11, 12], "isFeatured": true, "extras": [] },
        { "id": "c2", "name": "The Premium Beluga / Storione Beluga (Huso)", "description": "€90/10gr o €195/30g", "price": "90.00", "allergens": [1, 3, 5, 6, 7, 8, 10, 11, 12], "isFeatured": true, "extras": [] }
      ]
    },
    {
      "id": "primi",
      "name": "Primi Piatti",
      "description": "Pasta fresca fatta in casa e risotti mantecati.",
      "items": [
        { "id": "p1", "name": "Mezzi Paccheri Mancini", "description": "con Scorfano***, duetto di datterino e basilico", "price": "19.00", "allergens": [1, 2, 4, 9, 12, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "p2", "name": "Riso riserva San Massimo", "description": "mantecato al Castelmagno, trevisana al vino rosso e animelle al vitello*", "price": "19.00", "allergens": [3, 7, 9], "isFeatured": true, "extras": [] },
        { "id": "p3", "name": "Fettuccine con vongole", "description": "cime di rapa e gocce di provola silana", "price": "23.00", "allergens": [1, 3, 4, 7, 13, 14], "isFeatured": false, "extras": [] },
        { "id": "p4", "name": "Bottoni** di pasta fresca", "description": "ripieni di ossobuco, crema allo zafferano, fondo di vitello e salvia fritta", "price": "17.00", "allergens": [3, 5, 6, 7, 9], "isFeatured": true, "extras": [] },
        { "id": "p5", "name": "Gnocchi* freschi", "description": "ai formaggi di latte misto con miele e noci", "price": "14.00", "allergens": [1, 3, 5, 7, 8, 9, 12], "isFeatured": false, "extras": [] },
        { "id": "p6", "name": "Tagliolini all\'Astice Canadese", "description": "pomodorini e basilico fresco", "price": "70.00", "allergens": [1, 2, 4, 9], "isFeatured": true, "extras": [] }
      ]
    }
  ]
}')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_json=VALUES(content_json);

-- Inserimento dati iniziali Business Lunch
INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) 
VALUES ('business_lunch', 'Menù Business Lunch', 'Menù Business Lunch | Ristorante La Pinetina', 'Il menù business lunch ideale per le tue pause pranzo di lavoro dal lunedì al venerdì.', '{
  "title": "Menù Business Lunch",
  "slug": "menu-business-lunch",
  "seoTitle": "Menù Business Lunch | Ristorante La Pinetina",
  "seoDescription": "Il menù business lunch ideale per le tue pause pranzo di lavoro dal lunedì al venerdì.",
  "subtitle": "INCLUSI coperto, acqua e caffè",
  "categories": [
    {
      "id": "primo_scelta",
      "name": "MENÙ PRIMO (a scelta)",
      "description": "Inclusi coperto, acqua e caffè",
      "items": [
        { "id": "bl1", "name": "Spaghetto al pomodoro", "description": "con cipolla rossa e briciole di bacon", "price": "12.00", "isFeatured": false, "extras": [] },
        { "id": "bl2", "name": "Orecchiette", "description": "con salmone e pesto di basilico", "price": "12.00", "isFeatured": true, "extras": [] }
      ]
    }
  ]
}')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_json=VALUES(content_json);

-- Inserimento dati iniziali Carta dei Vini
INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) 
VALUES ('vini', 'Carta dei Vini', 'Carta dei Vini | Ristorante La Pinetina', 'La nostra esclusiva selezione di bollicine, champagne, vini bianchi, rosati, rossi e passiti.', '{
  "title": "Carta dei Vini",
  "slug": "menu-vini",
  "seoTitle": "Carta dei Vini | Ristorante La Pinetina",
  "seoDescription": "La nostra esclusiva selezione di bollicine, champagne, vini bianchi, rosati, rossi e passiti.",
  "categories": [
    {
      "id": "bollicine",
      "name": "Bollicine & Franciacorta",
      "items": [
        { "id": "v1", "name": "Athesis brut DOC (Alto Adige)", "description": "Kettmeir - 12.5% Vol.", "price": "45.00", "isFeatured": false, "extras": [] },
        { "id": "v2", "name": "Ferrari Perlè 2019", "description": "Ferrari - 12.5% Vol.", "price": "85.00", "isFeatured": true, "extras": [] }
      ]
    }
  ]
}')
ON DUPLICATE KEY UPDATE title=VALUES(title), content_json=VALUES(content_json);
