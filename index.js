const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// // Function to create a directory if it doesn't exist
// const createDirectoryIfNotExists = (dir) => {
//   fs.mkdirSync(dir, { recursive: true });
//   console.log(`Directory created: ${dir}`);
// };

// Function to scrape and filter links with keyword
async function scrapeFilteredLinks(url, keyword, directory) {
  try {
   

    // Change directory to the specified directory
    process.chdir(directory);

    // Require the separate scrape logic file within the new directory
    const scrapeLogic = require('./logic.js'); // Assuming scrape_logic.js is in the same directory

    // Execute the scraping logic
    await scrapeLogic(url, keyword, directory);
    return console.log(directory)

    console.log('Scraping completed successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example URL (you can replace this with your actual URL)
const url = 'https://www.ency-education.com/1as-exams-arabic_sci.html';

// Function to determine directory and call scrape function
function main() {
  const keyword = process.argv[2]; // Assuming keyword is the second argument

  if (url.includes('_sci')) {
    scrapeFilteredLinks(url, keyword , 'sci');
  } else if (url.includes('_lit')) {
    scrapeFilteredLinks(url, keyword, 'lit');
  } else {
    console.error('URL substring not found (expected "_sci" or "_lit").');
  }
}

// Call the main function
main();

// Separate scrape logic in scrape_logic.js
// ... (your scraping logic from the previous responses)
