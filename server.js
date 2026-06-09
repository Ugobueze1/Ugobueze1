const express = require('express');
const cors = require('cors');
const path = require('path');
const cardRoutes = require('./backend/routes/cards');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/api/cards', cardRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`ID Card Generator portal running at http://localhost:${port}`);
});
