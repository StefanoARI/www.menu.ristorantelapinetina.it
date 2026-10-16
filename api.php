<?php
/**
 * Ristorante La Pinetina - PHP REST API Backend
 * Communicates with MySQL database via PDO
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';

$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : '';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

try {
    $pdo = getDBConnection();

    // Endpoints
    if ($endpoint === 'menus' && $method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM menus");
        $rows = $stmt->fetchAll();
        $menus = [];
        foreach ($rows as $row) {
            $content = json_decode($row['content_json'], true);
            $menus[$row['menu_key']] = $content ? $content : [
                "title" => $row['title'],
                "slug" => $row['menu_key'],
                "seoTitle" => $row['seo_title'],
                "seoDescription" => $row['seo_description'],
                "categories" => []
            ];
        }
        echo json_encode(['success' => true, 'menus' => $menus]);
        exit;
    }

    if ($endpoint === 'menus' && $method === 'POST') {
        $menuKey = isset($input['menuKey']) ? $input['menuKey'] : 'alla_carta';
        $title = isset($input['title']) ? $input['title'] : '';
        $seoTitle = isset($input['seoTitle']) ? $input['seoTitle'] : '';
        $seoDescription = isset($input['seoDescription']) ? $input['seoDescription'] : '';
        $contentJson = json_encode($input);

        $stmt = $pdo->prepare("INSERT INTO menus (menu_key, title, seo_title, seo_description, content_json) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), seo_title = VALUES(seo_title), seo_description = VALUES(seo_description), content_json = VALUES(content_json)");
        $stmt->execute([$menuKey, $title, $seoTitle, $seoDescription, $contentJson]);

        echo json_encode(['success' => true]);
        exit;
    }

    if ($endpoint === 'menus/create' && $method === 'POST') {
        $menuKey = isset($input['menuKey']) ? $input['menuKey'] : '';
        $title = isset($input['title']) ? $input['title'] : '';
        $slug = isset($input['slug']) ? $input['slug'] : $menuKey;

        $initialData = [
            "title" => $title,
            "slug" => $slug,
            "seoTitle" => $title . " | Ristorante La Pinetina",
            "seoDescription" => "Scopri " . $title . " al Ristorante La Pinetina.",
            "categories" => []
        ];

        $stmt = $pdo->prepare("INSERT IGNORE INTO menus (menu_key, title, seo_title, seo_description, content_json) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$menuKey, $title, $initialData['seoTitle'], $initialData['seoDescription'], json_encode($initialData)]);

        echo json_encode(['success' => true]);
        exit;
    }

    if ($endpoint === 'users' && $method === 'GET') {
        $stmt = $pdo->query("SELECT id, username, email, role FROM admin_users");
        $users = $stmt->fetchAll();
        echo json_encode(['success' => true, 'users' => $users]);
        exit;
    }

    if ($endpoint === 'users' && $method === 'POST') {
        $username = isset($input['username']) ? $input['username'] : '';
        $email = isset($input['email']) ? $input['email'] : '';
        $role = isset($input['role']) ? $input['role'] : 'Gestore';
        $passwordHash = password_hash('Pinetina2026#Sec', PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO admin_users (username, password_hash, email, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$username, $passwordHash, $email, $role]);

        echo json_encode(['success' => true]);
        exit;
    }

    if (preg_match('/^users\/([0-9]+)$/', $endpoint, $matches) && $method === 'DELETE') {
        $userId = $matches[1];
        $stmt = $pdo->prepare("DELETE FROM admin_users WHERE id = ?");
        $stmt->execute([$userId]);
        echo json_encode(['success' => true]);
        exit;
    }

    if ($endpoint === 'login' && $method === 'POST') {
        $username = isset($input['username']) ? $input['username'] : '';
        $password = isset($input['password']) ? $input['password'] : '';

        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user) {
            $code = rand(100000, 999999);
            session_start();
            $_SESSION['temp_user'] = $username;
            $_SESSION['code_2fa'] = $code;
            $_SESSION['code_expires'] = time() + 600;
            $_SESSION['debug_code'] = $code;

            echo json_encode(['success' => true, 'requires2FA' => true, 'debugCode' => $code]);
        } else {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Utente non trovato']);
        }
        exit;
    }

    if ($endpoint === 'verify-2fa' && $method === 'POST') {
        $code = isset($input['code']) ? $input['code'] : '';
        session_start();
        if (isset($_SESSION['code_2fa']) && $code == $_SESSION['code_2fa']) {
            $_SESSION['is_logged_in'] = true;
            echo json_encode(['success' => true]);
        } else {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Codice 2FA non valido']);
        }
        exit;
    }

    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Endpoint non trovato: ' . $endpoint]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
