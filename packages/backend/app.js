import bodyParser from 'body-parser';
import express from 'express';
import loadRoutes from './src/utils/routes.loader.js';
import morgan from 'morgan';
import path from 'path';
import swaggerDocs from './src/utils/swagger.js';
import swaggerUI from 'swagger-ui-express';

const app = express();

/**
 * @ express.json()
 * middleware qui parse automatiquement le corps des requêtes entrantes au format JSON.
 *  afin d'accéder à des objets JSON envoyés avec les requêtes via req.body dans vos gestionnaires de routes.
 */
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan('combined'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

await loadRoutes(path.resolve('./src/routes'), app);

app.use('*', (req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

export default app;
