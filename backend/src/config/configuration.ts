export default () => ({
  database: {
    url: process.env.DATABASE_URL || '',
  },
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || '',
});
