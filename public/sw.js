// Dynamic Route Handler
const routes = [
  {
    path: '/api/generate',
    method: 'POST',
    handler: async (request) => {
      // Generate dynamic 4-digit PIN (1000 - 9999)
      const pin = Math.floor(1000 + Math.random() * 9000).toString();
      
      const responseData = {
        status: 'success',
        pin: pin,
        generatedAt: new Date().toISOString()
      };

      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
];

// Intercept network requests matching route and method
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  const matchedRoute = routes.find(r => 
    r.path === url.pathname && r.method.toUpperCase() === event.request.method.toUpperCase()
  );

  if (matchedRoute) {
    event.respondWith(matchedRoute.handler(event.request));
  }
});

// Immediately claim active status across open tabs
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
