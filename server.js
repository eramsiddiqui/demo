const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const { mergePdfs } = require('./merge'); // import correctly

const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'));

const port = 3000;

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

// Handle file uploads
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  console.log(req.files); // log uploaded files info
  const file1 = path.join(__dirname, req.files[0].path);
  const file2 = path.join(__dirname, req.files[1].path);

  await mergePdfs(file1, file2);

  res.redirect("http://localhost:3000/static/merged.pdf");
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});

