document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica para Copiar IP ---
    const copyIpBtn = document.getElementById('copy-ip-btn');
    const ipAddress = document.getElementById('ip-address');
    const copyFeedback = document.getElementById('copy-feedback');

    if (copyIpBtn) {
        copyIpBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(ipAddress.textContent)
                .then(() => {
                    copyFeedback.classList.add('show');
                    setTimeout(() => {
                        copyFeedback.classList.remove('show');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error al copiar la IP: ', err);
                    alert('No se pudo copiar la IP.');
                });
        });
    }

    // --- Lógica para Contador de Jugadores ---
    const playerCountSpan = document.getElementById('player-count');
    
    async function fetchPlayerCount() {
        if (!playerCountSpan) return;
        try {
            const response = await fetch('https://api.mcstatus.io/v2/status/java/ascendmc.xyz');
            if (!response.ok) {
                throw new Error('La respuesta del servidor no fue OK');
            }
            const data = await response.json();
            if (data.online) {
                playerCountSpan.textContent = data.players.online;
            } else {
                playerCountSpan.textContent = "0";
            }
        } catch (error) {
            console.error('Error al obtener el número de jugadores:', error);
            playerCountSpan.textContent = '???';
        }
    }

    fetchPlayerCount();
    // Actualizar cada 30 segundos
    setInterval(fetchPlayerCount, 30000);


    // --- Lógica para Mostrar Anuncios ---
    const announcementsList = document.getElementById('announcements-list');
    
    function displayAnnouncements() {
        if (!announcementsList) return;
        
        const announcements = JSON.parse(localStorage.getItem('ascendmc_announcements')) || [];
        
        if (announcements.length === 0) {
            announcementsList.innerHTML = '<p>No hay anuncios recientes.</p>';
            return;
        }

        announcementsList.innerHTML = ''; // Limpiar lista
        // Mostrar los más recientes primero
        announcements.slice().reverse().forEach(ann => {
            const annElement = document.createElement('div');
            annElement.classList.add('announcement');
            
            // Convertir saltos de línea en <br>
            const contentWithBreaks = ann.content.replace(/\n/g, '<br>');

            annElement.innerHTML = `
                <h3>${ann.title}</h3>
                <small>Publicado el ${new Date(ann.date).toLocaleString('es-ES')}</small>
                <p>${contentWithBreaks}</p>
            `;
            announcementsList.appendChild(annElement);
        });
    }

    // Mostrar anuncios en la página que corresponda
    if (announcementsList) {
        displayAnnouncements();
    }

});

