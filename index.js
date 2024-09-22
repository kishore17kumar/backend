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
// app.post('/bfhl', (req, res) => {
//   const { data, file_b64 } = req.body;

//   // Separate numbers and alphabets
//   const numbers = data.filter(item => !isNaN(item));
//   const alphabets = data.filter(item => isNaN(item));

//   // Get highest lowercase alphabet
//   const lowercaseAlphabets = alphabets.filter(a => a === a.toLowerCase());
//   const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || null;

//   // Handle file validation
//   let fileValid = false, fileMimeType = '', fileSizeKb = 0;
//   if (file_b64) {
//     const file = base64topdf.base64Decode(file_b64, 'decodedFile');
//     if (file) {
//       fileValid = true;
//       fileMimeType = "application/pdf"; // Example MIME type
//       fileSizeKb = Buffer.byteLength(file_b64, 'base64') / 1024;
//     }
//   }

//   // Respond with required fields
//   res.json({
//     is_success: true,
//     user_id: "john_doe_17091999",
//     email: "john@xyz.com",
//     roll_number: "ABCD123",
//     numbers,
//     alphabets,
//     highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
//     file_valid: fileValid,
//     file_mime_type: fileMimeType,
//     file_size_kb: fileSizeKb
//   });
// });
app.post('/bfhl', (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    // Validate 'data' field: it should be an array
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "'data' should be an array" });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Get highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(a => a === a.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || null;

    // Handle base64-encoded file validation
    let fileValid = false, fileMimeType = '', fileSizeKb = 0;
    if (file_b64) {
      try {
        const file = base64topdf.base64Decode(file_b64, 'decodedFile');
        if (file) {
          fileValid = true;
          fileMimeType = "application/pdf"; // Example MIME type
          fileSizeKb = Buffer.byteLength(file_b64, 'base64') / 1024; // Calculate file size in KB
        }
      } catch (err) {
        console.error('File decoding error:', err);
        return res.status(400).json({ is_success: false, message: "Invalid base64 file" });
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
  } catch (err) {
    console.error('Error processing /bfhl request:', err);
    res.status(500).json({ is_success: false, message: "Internal server error" });
  }
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
