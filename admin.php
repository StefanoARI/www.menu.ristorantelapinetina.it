<?php
/**
 * Ristorante La Pinetina - Admin Backend & Menu Manager
 * URL: http://menu.ristorantelapinetina.it/admin.php
 */
session_start();
require_once 'db.php';

$error = '';
$success = '';

// Gestione Login / Auth 2FA
if (isset($_POST['action']) && $_POST['action'] === 'login') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if ($username === 'risto114_gestore' || $username === 'admin') {
        // Genera codice 2FA e simula invio email
        $code = rand(100000, 999999);
        $_SESSION['temp_user'] = $username;
        $_SESSION['code_2fa'] = $code;
        $_SESSION['code_expires'] = time() + 600; // 10 min
        
        // Per comodità in ambiente di test salviamo il codice in sessione
        $_SESSION['debug_code'] = $code;
        header('Location: admin.php?step=2fa');
        exit;
    } else {
        $error = 'Credenziali non valide.';
    }
}

if (isset($_POST['action']) && $_POST['action'] === 'verify_2fa') {
    $entered_code = trim($_POST['code_2fa']);
    if (isset($_SESSION['code_2fa']) && time() < $_SESSION['code_expires'] && $entered_code == $_SESSION['code_2fa']) {
        $_SESSION['is_logged_in'] = true;
        unset($_SESSION['code_2fa']);
        header('Location: admin.php');
        exit;
    } else {
        $error = 'Codice 2FA errato o scaduto.';
    }
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

$is_logged = isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true;
$step = isset($_GET['step']) ? $_GET['step'] : 'dashboard';

// Connessione DB per recupero menù se loggati
$menus = [];
try {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM menus");
    $menus = $stmt->fetchAll();
} catch (Exception $e) {
    $error = "Errore DB: " . $e.getMessage();
}
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Area Riservata Gestore | Ristorante La Pinetina</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root { --pinetina-green: #27684a; --pinetina-dark: #111827; }
        body { font-family: 'Inter', sans-serif; color: var(--pinetina-dark); background-color: #fcfbf9; margin: 0; padding: 0; }
        h1, h2, h3, .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .card { background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #e5e7eb; margin-bottom: 25px; }
        .btn { background: var(--pinetina-green); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn:hover { background: #1e5239; }
        .input-field { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 15px; box-sizing: border-box; }
        .alert-error { background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: 8px; margin-bottom: 15px; font-size: 0.9rem; }
        .alert-success { background: #d1fae5; color: #065f46; padding: 12px; border-radius: 8px; margin-bottom: 15px; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid var(--pinetina-green); padding-bottom: 15px;">
            <div>
                <span style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #666;">Ristorante La Pinetina</span>
                <h1 style="margin: 0; color: var(--pinetina-green); font-size: 2.2rem;">Pannello di Controllo</h1>
            </div>
            <?php if ($is_logged): ?>
                <a href="admin.php?logout=1" class="btn" style="background: #ef4444;">Esci</a>
            <?php endif; ?>
        </div>

        <?php if (!empty($error)): ?>
            <div class="alert-error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>

        <?php if (!$is_logged): ?>
            <?php if ($step === '2fa'): ?>
                <div class="card" style="max-width: 450px; margin: 0 auto;">
                    <h2 style="margin-top: 0; color: var(--pinetina-green);">Autenticazione a 2 Fattori</h2>
                    <p style="color: #555; font-size: 0.95rem;">Abbiamo inviato un codice di sicurezza a <strong>gestore@ristorantelapinetina.it</strong>.</p>
                    
                    <?php if (isset($_SESSION['debug_code'])): ?>
                        <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 12px; border-radius: 8px; margin-bottom: 15px; font-size: 0.9rem;">
                            <strong>Simulazione E-mail 2FA:</strong> Il tuo codice di accesso è: <span style="font-size: 1.2rem; font-weight: bold; color: var(--pinetina-green);"><?php echo $_SESSION['debug_code']; ?></span>
                        </div>
                    <?php endif; ?>

                    <form method="POST">
                        <input type="hidden" name="action" value="verify_2fa">
                        <label style="display: block; font-weight: 500; margin-bottom: 5px;">Inserisci Codice a 6 cifre</label>
                        <input type="text" name="code_2fa" maxlength="6" class="input-field" placeholder="123456" required style="text-align: center; font-size: 1.5rem; letter-spacing: 4px;">
                        <button type="submit" class="btn" style="width: 100%;">Verifica Codice</button>
                    </form>
                </div>
            <?php else: ?>
                <div class="card" style="max-width: 450px; margin: 0 auto;">
                    <h2 style="margin-top: 0; color: var(--pinetina-green);">Accesso Gestore</h2>
                    <form method="POST">
                        <input type="hidden" name="action" value="login">
                        <label style="display: block; font-weight: 500; margin-bottom: 5px;">Username</label>
                        <input type="text" name="username" value="risto114_gestore" class="input-field" required>
                        
                        <label style="display: block; font-weight: 500; margin-bottom: 5px;">Password</label>
                        <input type="password" name="password" value="Pinetina2026#Sec" class="input-field" required>
                        
                        <button type="submit" class="btn" style="width: 100%;">Accedi con 2FA</button>
                    </form>
                </div>
            <?php endif; ?>
        <?php else: ?>
            <div class="card">
                <h2 style="margin-top: 0; color: var(--pinetina-green);">Benvenuto nell'Area Riservata</h2>
                <p style="color: #555;">Da qui puoi visualizzare i menù presenti sul database MySQL e i codici di incorporamento per il sito ufficiale.</p>
                
                <h3 style="margin-top: 30px;">I Tuoi Menù Attivi</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <?php foreach ($menus as $m): ?>
                        <li style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="font-size: 1.1rem; color: #111;"><?php echo htmlspecialchars($m['title']); ?></strong>
                                <span style="display: block; font-size: 0.85rem; color: #666;">Chiave: <?php echo htmlspecialchars($m['menu_key']); ?> | Slug: <?php echo htmlspecialchars($m['menu_key']); ?></span>
                            </div>
                            <a href="index.php?menu=<?php echo htmlspecialchars($m['menu_key']); ?>" target="_blank" class="btn" style="padding: 8px 16px; font-size: 0.85rem;">Visualizza Pubblico</a>
                        </li>
                    <?php endforeach; ?>
                </ul>

                <h3 style="margin-top: 30px;">Codici d'Incorporamento (Embed) per il Sito Ufficiale</h3>
                <p style="font-size: 0.9rem; color: #555;">Copia il codice sottostante e incollalo nelle pagine ufficiali di <a href="https://ristorantelapinetina.it" target="_blank" style="color: var(--pinetina-green);">ristorantelapinetina.it</a>:</p>
                
                <div style="background: #111827; color: #e5e7eb; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 0.85rem; overflow-x: auto; margin-bottom: 15px;">
                    &lt;iframe src="http://menu.ristorantelapinetina.it/index.php?menu=alla_carta" width="100%" height="800px" style="border:none; border-radius:12px;"&gt;&lt;/iframe&gt;
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
