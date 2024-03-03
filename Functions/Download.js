const fs = require("fs");
const path = require("path");

async function downloadFile(url, folderPath, fileName) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const fileBuffer = await response.arrayBuffer(); 
    const buffer = Buffer.from(fileBuffer); 

    fs.writeFileSync(path.join(folderPath, fileName), buffer); 

    console.log("File downloaded successfully");
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error; 
  }
}

module.exports = downloadFile;
