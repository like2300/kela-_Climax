const cacheName = "app-resultats-cache-v2";  // Changé de version pour forcer la mise à jour
const offlineUrl = "/offline/";

const filesToCache = [
    offlineUrl,
    "/static/icons/android-icon-192x192.png",
    "/static/icons/android-icon-144x144.png",
    "/static/js/tailwindcss.js",
    "/static/css/main.css", // Ajout d'un fichier CSS principal
    "/static/js/app.js",    // Ajout d'un fichier JS principal
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log("Cache ouvert");
                // Utilisation de addAll() mais avec gestion des erreurs
                return cache.addAll(filesToCache.map(url => new Request(url, {cache: 'reload'})));
            })
            .catch(error => {
                console.error("Échec de l'installation du cache:", error);
            })
    );
    // Force le service worker à s'activer immédiatement après installation
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(name => {
                    if (name !== cacheName) {
                        console.log("Suppression de l'ancien cache:", name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    // Prend le contrôle immédiat de tous les clients
    event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
    // Traitement spécial pour les requêtes de navigation (pages HTML)
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .catch(async () => {
                    try {
                        // Tente d'abord de servir la page demandée depuis le cache
                        const cachedResponse = await caches.match(event.request);
                        if (cachedResponse) return cachedResponse;
                        
                        // Si non trouvée, sert la page offline
                        return caches.match(offlineUrl);
                    } catch (error) {
                        return caches.match(offlineUrl);
                    }
                })
        );
    } else {
        // Pour les autres ressources (CSS, JS, images)
        event.respondWith(
            caches.match(event.request)
                .then(cachedResponse => {
                    // Renvoie la ressource en cache si disponible
                    if (cachedResponse) return cachedResponse;
                    
                    // Sinon, tente de la récupérer sur le réseau
                    return fetch(event.request)
                        .catch(error => {
                            // Pour les images, retourne une image de remplacement
                            if (event.request.destination === "image") {
                                return caches.match('/static/icons/android-icon-192x192.png');
                            }
                        });
                })
        );
    }
});