// pwa-init.js aggiornato

// 1. Aggiunge dinamicamente il manifest
(function() {
    if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = './manifest.json';
        document.head.appendChild(link);
        console.log('Manifest aggiunto');
    }
})();

// 2. Registra il service worker corretto
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registrato', reg.scope))
            .catch(err => console.error('Errore SW:', err));
    });
}

// 3. Preparazione installazione PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('PWA pronta per installazione');
});

// 4. Funzione per triggerare installazione
function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            console.log('Utente:', choice.outcome);
            deferredPrompt = null;
        });
    }
}

// 5. Trigger automatico per test mobile (opzionale)
setTimeout(() => {
    if (typeof installPWA === 'function') installPWA();
}, 1500);
