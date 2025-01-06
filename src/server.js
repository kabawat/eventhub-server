require('module-alias/register');
require('dotenv').config();
const app = require('./app');
const SECRET = require('#src/config/env.config');
const connectDB = require('./config/db.config');
const PORT = SECRET?.PORT || 3000;

app.listen(PORT, () => {
  connectDB().then(() => {
    console.log('Database connected');
  });
  console.log(`Server is running on http://localhost:${PORT}`);
});
