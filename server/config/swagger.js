const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Time to document that Express API you built',
      version: '1.0.0',
      description:
          'A test project to understand how easy it is to document and Express API',
      license: {
        name: 'MIT',
        url: 'https://mit.com/licenses/mit/',
      },
      contact: {
        name: 'Swagger',
        url: 'https://swagger.io',
        email: 'vikashcool1991@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: ['./models/*.js', './controllers/*.js'],
};
function swaggerApiDoc(router) {
  const specs = swaggerJsdoc(options);
  router.use('/docs', swaggerUi.serve);
  router.get('/docs', swaggerUi.setup(specs, { explorer: true }));
}
module.exports = swaggerApiDoc;