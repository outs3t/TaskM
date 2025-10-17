// pwa-init.js

// 1. Aggiunge dinamicamente il manifest
(function() {
    if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = 'manifest.json'; // assicurati sia il nome corretto
        document.head.appendChild(link);
    }
})();

// 2. Registra il service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js') // o il tuo file ESV
            .then(reg => console.log('Service Worker registrato', reg))
            .catch(err => console.error('Errore SW:', err));
    });
}

// 3. Event listener per "beforeinstallprompt"
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('PWA pronto per installazione');
    // Qui puoi eventualmente mostrare un bottone custom per installare
    // esempio: document.getElementById('installBtn').style.display = 'block';
});

// 4. Funzione per triggerare l'installazione
function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
                console.log('Utente ha installato la PWA');
            } else {
                console.log('Utente ha rifiutato');
            }
            deferredPrompt = null;
        });
    }
}
