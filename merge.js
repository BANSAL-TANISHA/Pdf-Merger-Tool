const PDFMerger = require('pdf-merger-js');
const path = require('path');
const fs = require('fs');

const merger = new PDFMerger();

const mergePdfs = async (pdf1Path, pdf2Path) => {
    console.log("Merging PDFs:", pdf1Path, pdf2Path);

    // Generate a unique timestamp-based filename
    let timestamp = new Date().getTime();

    // Check if the public directory exists
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
        console.log("Public directory does not exist. Creating now...");
        fs.mkdirSync(publicDir);  // Create the public directory if it doesn't exist
    } else {
        console.log("Public directory exists.");
    }

    try {
        await merger.add(pdf1Path);
        await merger.add(pdf2Path);

        // Save the merged PDF to the 'public' folder with the timestamp-based filename
        const outputPath = path.join(publicDir, `${timestamp}.pdf`);
        console.log("Saving merged PDF to:", outputPath);
        await merger.save(outputPath);

        console.log("Merged PDF created successfully!");

        // Return the timestamp so the server can redirect to the correct file
        return timestamp;
    } catch (error) {
        console.error("Error during PDF merging:", error);
        throw error;
    }
}

module.exports = { mergePdfs };
