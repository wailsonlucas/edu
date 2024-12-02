const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Function to scrape and filter links with keyword
async function run(url, keyword) {
  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const uploadLinks = $('a[href^="/upload"]');

    const filteredLinks = [];

    uploadLinks.each((index, element) => {
      const href = $(element).attr('href');
      // const text = $(element).text();
      if (href.toLowerCase().includes(keyword.toLowerCase())) {
        filteredLinks.push("https://www.ency-education.com"+href);
      }
    });
        // console.log(filteredLinks) //OK


    // Save filteredLinks to a text file
    const filePath = `${keyword}.txt`;
    fs.writeFile(filePath, filteredLinks.join('\n'), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Filtered links saved to', filePath);
      }
    });

    console.log(`Filtered links saved to ${keyword}`);
  } catch (error) {
    console.error('Error:', error);
  }

}
module.exports = run;
