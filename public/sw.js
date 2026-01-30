self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
});

self.addEventListener('fetch', (event) => {
    // Required to be a PWA, but we don't need fancy caching for now unless requested
});
