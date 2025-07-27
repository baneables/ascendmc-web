document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // ADVERTENCIA: Esta es una autenticación del lado del cliente y es
        // extremadamente insegura. Es solo para fines de demostración.
        // NUNCA uses esto en un entorno de producción real.
        const correctEmail = 'ascendmc@gmail.com';
        const correctPassword = 'ascend123elmejorservidormc';

        if (emailInput.value === correctEmail && passwordInput.value === correctPassword) {
            // Guardar un token de sesión simple
            sessionStorage.setItem('ascendmc_admin_logged_in', 'true');
            // Redirigir a la página de administración
            window.location.href = 'admin.html';
        } else {
            errorMessage.style.display = 'block';
            passwordInput.value = '';
        }
    });
});

