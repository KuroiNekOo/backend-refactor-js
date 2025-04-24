import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wallet API',
      version: '1.0.0',
    },
  },
  apis: ['src/features/**/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
