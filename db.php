<?php
/**
 * Ristorante La Pinetina - Database Connection Configuration
 * Database: risto114_menu
 * User: risto114_gestore
 */
define('DB_HOST', 'localhost');
define('DB_NAME', 'risto114_menu');
define('DB_USER', 'risto114_gestore');
define('DB_PASS', 'Pinetina2026#Sec');
define('DB_CHARSET', 'utf8mb4');

function getDBConnection() {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    try {
        return new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (\PDOException $e) {
        throw new \PDOException("Errore di connessione al database MySQL: " . $e->getMessage(), (int)$e->getCode());
    }
}
?>
