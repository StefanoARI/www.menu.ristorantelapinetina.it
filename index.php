<?php
/**
 * Ristorante La Pinetina - Digital Menu Application (React Frontend + PHP/MySQL Backend)
 */
// Permetti l'incorporamento del menù nelle pagine del sito principale www.ristorantelapinetina.it e domini correlati
header_remove("X-Frame-Options");
header("Content-Security-Policy: frame-ancestors *;");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

session_start();
?>
<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="https://ristorantelapinetina.it/wp-content/uploads/2026/05/Logo_Green-V.1.svg" />
    <title>Ristorante La Pinetina | Menù Digitali</title>
    <meta name="description" content="Scopri i menù digitali di Ristorante La Pinetina: Menù Alla Carta, Business Lunch e Carta dei Vini." />
    <meta property="og:title" content="Ristorante La Pinetina | Menù Digitali" />
    <meta property="og:description" content="Scopri i menù digitali di Ristorante La Pinetina: Menù Alla Carta, Business Lunch e Carta dei Vini." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script type="module" crossorigin src="assets/index-CLcnvfMt.js"></script>
    <link rel="stylesheet" crossorigin href="assets/index-D0rRYySz.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
