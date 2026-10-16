<?php
/**
 * Ristorante La Pinetina - Digital Menu Viewer (SEO Optimized)
 * Ospitato su: http://menu.ristorantelapinetina.it/
 */
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once 'db.php';

$menu_type = isset($_GET['menu']) ? $_GET['menu'] : 'alla_carta';

$slug_map = [
    'menu' => 'alla_carta',
    'alla_carta' => 'alla_carta',
    'menu-business-lunch' => 'business_lunch',
    'business_lunch' => 'business_lunch',
    'menu-vini' => 'vini',
    'vini' => 'vini'
];

$db_key = isset($slug_map[$menu_type]) ? $slug_map[$menu_type] : 'alla_carta';

$title = "Ristorante La Pinetina - Menù Digitale";
$description = "Esplora i nostri menù digitali ufficiali.";
$content = null;
$menu_row = null;

try {
    $pdo = getDBConnection();
    $stmt = $pdo->prepare("SELECT * FROM menus WHERE menu_key = ?");
    $stmt->execute([$db_key]);
    $menu_row = $stmt->fetch();

    if ($menu_row) {
        $title = $menu_row['seo_title'] ?? $menu_row['title'];
        $description = $menu_row['seo_description'] ?? '';
        $content = json_decode($menu_row['content_json'], true);
    }
} catch (Exception $e) {
    // Gestione graceful se le tabelle non esistono ancora
    $error_message = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($title); ?></title>
    <meta name="description" content="<?php echo htmlspecialchars($description); ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --pinetina-green: #27684a;
            --pinetina-dark: #111827;
        }
        body {
            font-family: 'Inter', sans-serif;
            color: var(--pinetina-dark);
            background-color: #fcfbf9;
            margin: 0; padding: 0;
        }
        h1, h2, h3, .font-serif {
            font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
        .menu-header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid var(--pinetina-green); padding-bottom: 20px; }
        .menu-header h1 { font-size: 2.8rem; margin: 0; color: var(--pinetina-green); font-weight: 700; }
        .category-section { margin-bottom: 35px; background: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); border-left: 4px solid var(--pinetina-green); }
        .category-title { font-size: 1.8rem; color: var(--pinetina-green); margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .item-row { display: flex; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px dotted #e5e7eb; padding-bottom: 12px; }
        .item-info { flex: 1; padding-right: 15px; }
        .item-name { font-size: 1.25rem; font-weight: 600; color: #111; margin: 0 0 4px 0; font-family: 'Cormorant Garamond', Georgia, serif; }
        .item-desc { font-size: 0.95rem; color: #555; margin: 0; }
        .item-price { font-size: 1.2rem; font-weight: 700; color: var(--pinetina-green); white-space: nowrap; }
    </style>
</head>
<body>
    <div class="container">
        <div class="menu-header">
            <span style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: #666;">Ristorante La Pinetina</span>
            <h1><?php echo htmlspecialchars($menu_row['title'] ?? 'Menù Digitale'); ?></h1>
        </div>
        
        <?php if (isset($error_message)): ?>
            <div style="background: #fff3f3; border: 1px solid #ffcdd2; color: #c62828; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <strong>Avviso Database:</strong> Assicurati di aver importato lo script SQL in phpMyAdmin. Dettaglio: <?php echo htmlspecialchars($error_message); ?>
            </div>
        <?php endif; ?>

        <?php if ($content && isset($content['categories'])): ?>
            <?php foreach ($content['categories'] as $cat): ?>
                <div class="category-section">
                    <h2 class="category-title"><?php echo htmlspecialchars($cat['name']); ?></h2>
                    <?php if (!empty($cat['description'])): ?>
                        <p style="color: #666; font-style: italic; margin-top: -5px; margin-bottom: 15px;"><?php echo htmlspecialchars($cat['description']); ?></p>
                    <?php endif; ?>
                    <div>
                        <?php foreach ($cat['items'] as $item): ?>
                            <div class="item-row">
                                <div class="item-info">
                                    <h3 class="item-name"><?php echo htmlspecialchars($item['name']); ?></h3>
                                    <?php if (!empty($item['description'])): ?>
                                        <p class="item-desc"><?php echo htmlspecialchars($item['description']); ?></p>
                                    <?php endif; ?>
                                    <?php if (!empty($item['extras'])): ?>
                                        <div style="margin-top: 4px; font-size: 0.85rem; color: #27684a;">
                                            <?php foreach ($item['extras'] as $ex): ?>
                                                <span>✨ <?php echo htmlspecialchars($ex['name'] . ' ' . $ex['price']); ?></span>
                                            <?php endforeach; ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <div class="item-price">
                                    <?php echo !empty($item['price']) ? '€' . htmlspecialchars($item['price']) : ''; ?>
                                }
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p style="text-align: center; color: #666;">Seleziona un menù valido o importa i dati nel database MySQL.</p>
        <?php endif; ?>
    </div>
</body>
</html>
