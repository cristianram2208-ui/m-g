<?php
// 1. ARRANCAMOS LA SESIÓN: Esto es obligatorio siempre que usemos logins
session_start();

// 2. SI YA ESTÁ LOGUEADO: Lo enviamos directamente al panel admin para que no vea el login otra vez
if (isset($_SESSION['logueado']) && $_SESSION['logueado'] === true) {
    header("Location: admin.php");
    exit;
}

$mensaje_error = "";

// 3. SI EL FORMULARIO SE HA ENVIADO: Comprobamos los datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];

    // Credenciales de acceso (Más adelante las encriptaremos por seguridad)
    $usuario_correcto = "admin";
    $password_correcto = "";

    // 4. COMPROBACIÓN: ¿Coinciden los datos?
    if ($usuario === $usuario_correcto && $password === $password_correcto) {
        // Le damos el pase VIP y lo mandamos al admin
        $_SESSION['logueado'] = true;
        header("Location: admin.php");
        exit;
    } else {
        // Mostramos un error si falla
        $mensaje_error = "Usuario o contraseña incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso Admin | MyG Inmobiliaria</title>
    <link rel="stylesheet" href="css/styleCompras.css" />
    <style>
        /* Un poco de estilo rápido para centrar el login */
        body { display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f4f4f4; }
        .login-box { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%; }
        .login-box input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
        .error { color: red; margin-bottom: 15px; font-weight: bold; }
    </style>
</head>
<body>

    <div class="login-box">
        <img src="./fotos/myg-logo.webp" alt="MyG Inmobiliaria" style="max-width: 150px; margin-bottom: 20px;">
        <h2>Panel de Gestión</h2>
        
        <?php 
        // Si hay un error, lo mostramos aquí en HTML
        if ($mensaje_error !== "") { 
            echo "<p class='error'>$mensaje_error</p>"; 
        } 
        ?>

        <form method="POST" action="login.php">
            <input type="text" name="usuario" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit" class="filter-button" style="width: 100%; margin-top: 10px;">Entrar</button>
        </form>
    </div>

</body>
</html>