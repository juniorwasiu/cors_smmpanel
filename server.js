const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const API_URL = 'https://justanotherpanel.com/api/v2';

// Enable CORS for all routes
app.use(cors());

// Root route to show "Welcome to Mars API"
app.get('/', (req, res) => {
  res.send('Welcome to Mars API');
});

// Proxy endpoint
app.use('/api', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${API_URL}${req.url}`,
      headers: {
        'Authorization': req.headers.authorization || '',
        'Content-Type': 'application/json'
      },
      data: req.body
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`CORS proxy server is running on http://localhost:${PORT}`);
});
