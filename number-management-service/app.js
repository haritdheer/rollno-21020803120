const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8008;


app.use(express.json());


app.get('/numbers', async (req, res) => {
  try {
    const urls = req.query.url;
    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const responses = await Promise.all(
      urls.map((url) => axios.get(url).catch(() => null))
    );

    const numbers = responses
      .filter((response) => response && response.data && Array.isArray(response.data.numbers))
      .map((response) => response.data.numbers)
      .flat();

    const uniqueNumbers = [...new Set(numbers)].sort((a, b) => a - b);

    return res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
