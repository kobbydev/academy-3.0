/* istanbul ignore file */
import express from 'express';
import mongoose from 'mongoose';
import { appConfig } from './config';
import config from './config/env';
import Logger from './config/logger';
import { constants } from './app/utils';

const app = express();
global.logger = Logger.createLogger({ label: 'TEMPORAL_PROJECT' });

appConfig(app);
const port = config.PORT || 3249;

mongoose.connect(config.DATABASE_URL)
  .then(() => {
    app.listen(port, () => {
      logger.info(`${constants.TEMPORAL_PROJECT_RUNNING} ${port}`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
    process.exit(1);
  });
export default app;
