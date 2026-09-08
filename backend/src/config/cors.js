const cors = require('cors');

// Equivalente a CorsConfig.java: libera apenas as rotas /api/** para o
// frontend definido em FRONTEND_URL (app.frontend-url no Spring Boot)
function buildCorsMiddleware() {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  return cors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
  });
}

module.exports = buildCorsMiddleware;
