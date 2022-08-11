import 'dotenv/config';

export default {
  DATABASE_URL: process.env.TEMPORAL_PROJECT_POSTGRES_DEV_URL || process.env.DATABASE_URL
};
