const express = require('express');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// Import API Routes
require('./ai/blackbox')(app);
require('./ai/luminAI')(app);
require('./ai/thinkai')(app);
require('./berita/liputan6')(app);
require('./search/goodread')(app);
require('./search/ypia')(app);
require('./search/rumaysho')(app);
require('./search/surah')(app);
require('./search/jadwalsholat')(app);

// Route untuk Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle request favicon jika tidak terdeteksi
app.get('/favicon.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favicon.png'));
});

// Handle 404
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Handle Server Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
