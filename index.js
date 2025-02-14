const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger.json');

const app = express();

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

app.use(cors());

require('./ai/blackbox')(app);
require('./ai/luminai')(app);
require('./ai/thinkai')(app);

require('./berita/liputan6')(app);

require('./search/rumaysho')(app);
require('./search/surah')(app);
require('./search/jadwalsholat')(app);

const aiRoutes = require('./routes/ai');
const downloaderRoutes = require('./routes/downloader');
const searchRoutes = require('./routes/search');

app.use('/api/ai', aiRoutes);
app.use('/api/downloader', downloaderRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
