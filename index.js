const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const base64topdf = require('base64topdf');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://frontend2-65lf.onrender.com'
}));
// POST route for /bfhl
app.post('/bfhl', (req, res) => {
  const { data, file_b64 } = req.body;

  // Separate numbers and alphabets
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  // Get highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(a => a === a.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || null;

  // Handle file validation
  let fileValid = false, fileMimeType = '', fileSizeKb = 0;
  if (file_b64) {
    const file = base64topdf.base64Decode(file_b64, 'decodedFile');
    if (file) {
      fileValid = true;
      fileMimeType = "application/pdf"; // Example MIME type
      fileSizeKb = Buffer.byteLength(file_b64, 'base64') / 1024;
    }
  }

  // Respond with required fields
  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb
  });
});

// GET route for /bfhl
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
