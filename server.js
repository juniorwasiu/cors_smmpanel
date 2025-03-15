const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/proxy', async (req, res) => {
  const apiResponse = await fetch('https://justanotherpanel.com/api/v2');
  const data = await apiResponse.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
