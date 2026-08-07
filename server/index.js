const app = require('./src/app');
const config = require('./src/config');

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Avaasa production backend server running on port ${PORT}`);
  console.log(`Environment mode: ${config.NODE_ENV}`);
});
