<?php
/**
 * Ristorante La Pinetina - Secure Database Connection & Auto-Schema Bootstrapper
 * Protects against direct access, SQL injection, and automatically provisions tables if missing.
 */
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    header('HTTP/1.0 403 Forbidden');
    exit('Access Denied');
}

define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'risto114_menu');
define('DB_USER', getenv('DB_USER') ?: 'risto114_gestore');
define('DB_PASS_PRIMARY', '?wef#cZJ*hCN^~aY');
define('DB_PASS_SECONDARY', 'Pinetina2026#Sec');
define('DB_CHARSET', 'utf8mb4');

function initTablesIfMissing($pdo) {
    try {
        // 1. Ensure 'menus' table exists
        $pdo->exec("CREATE TABLE IF NOT EXISTS menus (
            id INT AUTO_INCREMENT PRIMARY KEY,
            menu_key VARCHAR(50) NOT NULL UNIQUE,
            title VARCHAR(150) NOT NULL,
            seo_title VARCHAR(255) NULL,
            seo_description TEXT NULL,
            content_json LONGTEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 2. Ensure 'admin_users' table exists
        $pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            email VARCHAR(150) NOT NULL,
            role VARCHAR(50) DEFAULT 'Gestore'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // 3. Ensure Super Admin exists
        $checkUsers = $pdo->query("SELECT COUNT(*) FROM admin_users");
        if ((int)$checkUsers->fetchColumn() === 0) {
            $defaultHash = password_hash('Pinetina2026#Sec', PASSWORD_DEFAULT);
            $uStmt = $pdo->prepare("INSERT INTO admin_users (username, password_hash, email, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE email=VALUES(email)");
            $uStmt->execute(['assistenza@arimediagroup.it', $defaultHash, 'assistenza@arimediagroup.it', 'Super Admin']);
            $uStmt->execute(['risto114_gestore', $defaultHash, 'assistenza@arimediagroup.it', 'Gestore']);
        }

        // 4. Ensure Default Menus exist if table is empty
        $checkMenus = $pdo->query("SELECT COUNT(*) FROM menus");
        if ((int)$checkMenus->fetchColumn() === 0) {
            seedDefaultMenus($pdo);
        }
    } catch (\Throwable $t) {
        error_log("initTablesIfMissing error: " . $t->getMessage());
    }
}

function seedDefaultMenus($pdo) {
    $mStmt = $pdo->prepare("INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title)");

    // Menù alla Carta
    $allaCarta = [
        "title" => "Menù alla Carta",
        "slug" => "menu",
        "isActive" => true,
        "seoTitle" => "Menù alla Carta | Ristorante La Pinetina",
        "seoDescription" => "Scopri il nostro Menù alla Carta con antipasti d'eccezione, caviali ADAMAS, primi di pasta fresca, secondi di carne e pesce, pizze gourmet e dolci artigianali.",
        "categories" => [
            [
                "id" => "antipasti",
                "name" => "Antipasti",
                "description" => "I nostri antipasti preparati con ingredienti freschi di stagione.",
                "items" => [
                    [ "id" => "a1", "name" => "Carciofi in oliocottura", "description" => "con mentuccia fresca", "price" => "16.00", "allergens" => [5], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "a2", "name" => "Moscardini* in guazzetto", "description" => "origano e olive taggiasche", "price" => "15.00", "allergens" => [1, 4, 9, 12, 13, 14], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "a3", "name" => "Crostoni di polenta", "description" => "con fonduta al Casera, pasta di salame mantovana e erba cipollina", "price" => "15.00", "allergens" => [1, 3, 5, 8], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "a4", "name" => "Vellutata di zucca", "description" => "con sedano al limone, gamberi*, bacon e semi di zucca", "price" => "15.00", "allergens" => [2, 4, 8, 9], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "a5", "name" => "Capasanta* scottata", "description" => "su crema di patate e carciofi croccanti", "price" => "14.00", "allergens" => [4, 12, 14], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "a6", "name" => "Battuta di filetto di manzo irlandese", "description" => "mela verde e salsa al Parmigiano", "price" => "18.00", "allergens" => [7], "isFeatured" => true, "extras" => [[ "id" => "ex1", "name" => "+ Tartufo fresco a consumo", "price" => "€2,5/g", "description" => "in base alla disponibilità del mercato" ]] ],
                    [ "id" => "a7", "name" => "Ovetto al tegamino", "description" => "con asparagi sautè e Parmigiano", "price" => "12.00", "allergens" => [3, 7], "isFeatured" => false, "extras" => [[ "id" => "ex2", "name" => "+ Tartufo fresco a consumo", "price" => "€2,5/g", "description" => "in base alla disponibilità del mercato" ]] ],
                    [ "id" => "a8", "name" => "Insalatina di puntarelle", "description" => "con mozzarella di Bufala e acciughe del Mediterraneo", "price" => "14.00", "allergens" => [4, 7], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "a9", "name" => "Cruditè di pesce | per 2 persone", "description" => "Ricci di mare, Salmone**, Tonno rosso**, Scampi Danimarca*, gambero di Mazara*, Capasanta*, Ostriche Fin de Claire, Tartufo di mare", "price" => "60.00", "allergens" => [2, 4, 12, 14], "isFeatured" => true, "extras" => [] ]
                ]
            ],
            [
                "id" => "caviali",
                "name" => "Selezione di caviali ADAMAS",
                "description" => "Serviti in accompagnamento con: Pan brioche tostato, panna acida al rafano, burro alla maître d'hôtel, pane carasau al rosmarino, cipolla rossa di Tropea all'aceto di vino rosso",
                "items" => [
                    [ "id" => "c1", "name" => "The Aqua Adamas Riviera Selection / Storione Italiano", "description" => "€45/10gr o €95/30g", "price" => "45.00", "allergens" => [1, 3, 5, 6, 7, 8, 10, 11, 12], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "c2", "name" => "The Premium Beluga / Storione Beluga (Huso)", "description" => "€90/10gr o €195/30g", "price" => "90.00", "allergens" => [1, 3, 5, 6, 7, 8, 10, 11, 12], "isFeatured" => true, "extras" => [] ]
                ]
            ],
            [
                "id" => "primi",
                "name" => "Primi Piatti",
                "description" => "Pasta fresca fatta in casa e risotti mantecati.",
                "items" => [
                    [ "id" => "p1", "name" => "Mezzi Paccheri Mancini", "description" => "con Scorfano***, duetto di datterino e basilico", "price" => "19.00", "allergens" => [1, 2, 4, 9, 12, 13, 14], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "p2", "name" => "Riso riserva San Massimo", "description" => "mantecato al Castelmagno, trevisana al vino rosso e animelle al vitello*", "price" => "19.00", "allergens" => [3, 7, 9], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "p3", "name" => "Fettuccine con vongole", "description" => "cime di rapa e gocce di provola silana", "price" => "23.00", "allergens" => [1, 3, 4, 7, 13, 14], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "p4", "name" => "Bottoni** di pasta fresca", "description" => "ripieni di ossobuco, crema allo zafferano, fondo di vitello e salvia fritta", "price" => "17.00", "allergens" => [3, 5, 6, 7, 9], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "p5", "name" => "Gnocchi* freschi", "description" => "ai formaggi di latte misto con miele e noci", "price" => "14.00", "allergens" => [1, 3, 5, 7, 8, 9, 12], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "p6", "name" => "Tagliolini all'Astice Canadese", "description" => "pomodorini e basilico fresco", "price" => "70.00", "allergens" => [1, 2, 4, 9], "isFeatured" => true, "extras" => [] ]
                ]
            ]
        ]
    ];
    $mStmt->execute(['alla_carta', $allaCarta['title'], $allaCarta['seoTitle'], $allaCarta['seoDescription'], json_encode($allaCarta, JSON_UNESCAPED_UNICODE)]);

    // Menù Business Lunch
    $businessLunch = [
        "title" => "Menù Business Lunch",
        "slug" => "menu-business-lunch",
        "isActive" => true,
        "seoTitle" => "Menù Business Lunch | Ristorante La Pinetina",
        "seoDescription" => "Il menù business lunch ideale per le tue pause pranzo di lavoro dal lunedì al venerdì.",
        "subtitle" => "INCLUSI coperto, acqua e caffè",
        "categories" => [
            [
                "id" => "primo_scelta",
                "name" => "MENÙ PRIMO (a scelta)",
                "description" => "Inclusi coperto, acqua e caffè",
                "items" => [
                    [ "id" => "bl1", "name" => "Spaghetto al pomodoro", "description" => "con cipolla rossa e briciole di bacon", "price" => "12.00", "allergens" => [1], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "bl2", "name" => "Orecchiette", "description" => "con salmone e pesto di basilico", "price" => "12.00", "allergens" => [1, 4], "isFeatured" => true, "extras" => [] ]
                ]
            ],
            [
                "id" => "secondo_scelta",
                "name" => "MENÙ SECONDO (a scelta)",
                "description" => "Inclusi coperto, acqua e caffè",
                "items" => [
                    [ "id" => "bl3", "name" => "Tagliata di manzo con rucola e grana", "description" => "Cottura a scelta con contorno", "price" => "16.00", "allergens" => [7], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "bl4", "name" => "Filetto di orata al forno", "description" => "con patate novelle e pomodorini", "price" => "16.00", "allergens" => [4], "isFeatured" => false, "extras" => [] ]
                ]
            ]
        ]
    ];
    $mStmt->execute(['business_lunch', $businessLunch['title'], $businessLunch['seoTitle'], $businessLunch['seoDescription'], json_encode($businessLunch, JSON_UNESCAPED_UNICODE)]);

    // Menù Vini
    $vini = [
        "title" => "Carta dei Vini",
        "slug" => "menu-vini",
        "isActive" => true,
        "seoTitle" => "Carta dei Vini | Ristorante La Pinetina",
        "seoDescription" => "La nostra esclusiva selezione di bollicine, champagne, vini bianchi, rosati, rossi e passiti.",
        "categories" => [
            [
                "id" => "bollicine",
                "name" => "Bollicine & Franciacorta",
                "description" => "Metodo Classico e bollicine d'eccellenza",
                "items" => [
                    [ "id" => "v1", "name" => "Athesis brut DOC (Alto Adige)", "description" => "Kettmeir - 12.5% Vol.", "price" => "45.00", "allergens" => [12], "isFeatured" => false, "extras" => [] ],
                    [ "id" => "v2", "name" => "Ferrari Perlè 2019", "description" => "Ferrari - 12.5% Vol.", "price" => "85.00", "allergens" => [12], "isFeatured" => true, "extras" => [] ]
                ]
            ],
            [
                "id" => "bianchi",
                "name" => "Vini Bianchi",
                "description" => "Selezione dalle migliori cantine italiane ed internazionali",
                "items" => [
                    [ "id" => "v3", "name" => "Lugana DOC Prestige", "description" => "Cà Maiol - 13% Vol.", "price" => "32.00", "allergens" => [12], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "v4", "name" => "Gewürztraminer DOC", "description" => "Tramin - 14% Vol.", "price" => "38.00", "allergens" => [12], "isFeatured" => false, "extras" => [] ]
                ]
            ],
            [
                "id" => "rossi",
                "name" => "Vini Rossi",
                "description" => "Grandi rossi della tradizione",
                "items" => [
                    [ "id" => "v5", "name" => "Barolo DOCG", "description" => "Pio Cesare - 14.5% Vol.", "price" => "95.00", "allergens" => [12], "isFeatured" => true, "extras" => [] ],
                    [ "id" => "v6", "name" => "Amarone della Valpolicella Classico", "description" => "Masi - 15% Vol.", "price" => "85.00", "allergens" => [12], "isFeatured" => false, "extras" => [] ]
                ]
            ]
        ]
    ];
    $mStmt->execute(['vini', $vini['title'], $vini['seoTitle'], $vini['seoDescription'], json_encode($vini, JSON_UNESCAPED_UNICODE)]);
}

function getDBConnection() {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    
    $pdo = null;
    // Try primary password first
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS_PRIMARY, $options);
    } catch (\PDOException $e) {
        // Fallback to secondary password if access denied
        if ($e->getCode() == 1045 || strpos($e->getMessage(), '1045') !== false) {
            try {
                $pdo = new PDO($dsn, DB_USER, DB_PASS_SECONDARY, $options);
            } catch (\PDOException $e2) {
                error_log("Database connection failed: " . $e2->getMessage());
                throw new \PDOException("Errore di connessione al database MySQL: " . $e2->getMessage(), (int)$e2->getCode());
            }
        } else {
            error_log("Database connection failed: " . $e->getMessage());
            throw $e;
        }
    }

    if ($pdo) {
        initTablesIfMissing($pdo);
    }

    return $pdo;
}
?>
