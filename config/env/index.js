import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';

const {
  TEMPORAL_PROJECT_PORT: PORT,
  TEMPORAL_PROJECT_SECRET: SECRET,
  TEMPORAL_PROJECT_REFRESH_SECRET: REFRESH_SECRET,
  TEMPORAL_PROJECT_NODE_ENV: NODE_ENV
} = process.env;

const currentEnv = {
  development,
  test,
  production
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  SECRET,
  REFRESH_SECRET,
  NODE_ENV
};
