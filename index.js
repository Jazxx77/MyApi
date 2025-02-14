const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger.json');

const app = express();

// Middleware untuk dokumentasi API
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);


const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware CORS
app.use(cors());

// Import AI
require('./ai/blackbox')(app);
require('./ai/luminai')(app);
require('./ai/thinkai')(app);

// Import Berita
require('./berita/liputan6')(app);

// Import Search
require('./search/rumaysho')(app);
require('./search/surah')(app);
require('./search/jadwalsholat')(app);

// Import Routes
const aiRoutes = require('./routes/ai');
const downloaderRoutes = require('./routes/downloader');
const searchRoutes = require('./routes/search');

app.use('/api/ai', aiRoutes);
app.use('/api/downloader', downloaderRoutes);
app.use('/api/search', searchRoutes);

// Endpoint untuk halaman utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404 error
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
