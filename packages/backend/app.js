import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import loadRoutes from './src/utils/routes.loader.js';
import morgan from 'morgan';
import path from 'path';
import swaggerDocs from './src/utils/swagger.js';
import swaggerUI from 'swagger-ui-express';

const app = express();

var corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

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
