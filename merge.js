const PDFMerger = require('pdf-merger-js');
const path = require('path');

const mergePdfs = async (p1, p2) => {
  const merger = new PDFMerger.default();

  await merger.add(p1);
  await merger.add(p2);

  // Save to absolute path
  const outputPath = path.join(__dirname, 'public', 'merged.pdf');
  await merger.save(outputPath);

  console.log(" Merged PDF saved at:", outputPath);
};

module.exports = { mergePdfs }; 
