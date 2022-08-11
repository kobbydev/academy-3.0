import 'dotenv/config';

export default {
  DATABASE_URL: process.env.TEMPORAL_PROJECT_ADMIN_DATABASE_URL || process.env.DATABASE_URL
};
