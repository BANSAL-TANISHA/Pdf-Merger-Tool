const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePdfs } = require('./merge');  // Import the mergePdfs function

const app = express();
const upload = multer({ dest: 'uploads/' });  // Destination directory for uploaded PDFs

app.use('/static', express.static('public'));  // Serve static files from the 'public' directory

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
    console.log(req.files);

    // Generate the merged PDF and save it in the 'public' folder
    let timestamp = await mergePdfs(req.files[0].path, req.files[1].path);

    // Redirect to the merged PDF file
    res.redirect(`/static/${timestamp}.pdf`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
