document.addEventListener('DOMContentLoaded', () => {
    // Proteger la página: si el usuario no está logueado, lo redirige.
    if (sessionStorage.getItem('ascendmc_admin_logged_in') !== 'true') {
        window.location.href = 'anuncios.html';
        return; // Detiene la ejecución del script
    }
    
    // Si está logueado, muestra el panel
    document.getElementById('admin-panel').style.display = 'block';

    const announcementForm = document.getElementById('announcement-form');
    const titleInput = document.getElementById('ann-title');
    const contentInput = document.getElementById('ann-content');

    announcementForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title || !content) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const newAnnouncement = {
            title: title,
            content: content,
            date: new Date().toISOString()
        };

        // Obtener anuncios existentes de localStorage
        const announcements = JSON.parse(localStorage.getItem('ascendmc_announcements')) || [];
        
        // Añadir el nuevo anuncio
        announcements.push(newAnnouncement);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('ascendmc_announcements', JSON.stringify(announcements));

        // Limpiar el formulario y dar feedback
        titleInput.value = '';
        contentInput.value = '';
        alert('¡Anuncio publicado con éxito!');

        // Redirigir a la página de anuncios para ver el resultado
        window.location.href = 'anuncios.html';
    });
});

