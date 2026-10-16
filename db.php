<?php
/**
 * Ristorante La Pinetina - Secure Database Connection
 * Protects against direct access and SQL injection via prepared statements
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

function getDBConnection() {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    
    // Try primary password first
    try {
        return new PDO($dsn, DB_USER, DB_PASS_PRIMARY, $options);
    } catch (\PDOException $e) {
        // Fallback to secondary password if access denied
        if ($e->getCode() == 1045 || strpos($e->getMessage(), '1045') !== false) {
            try {
                return new PDO($dsn, DB_USER, DB_PASS_SECONDARY, $options);
            } catch (\PDOException $e2) {
                error_log("Database connection failed: " . $e2->getMessage());
                throw new \PDOException("Errore di connessione al database MySQL: " . $e2->getMessage(), (int)$e2->getCode());
            }
        }
        error_log("Database connection failed: " . $e->getMessage());
        throw $e;
    }
}
?>
