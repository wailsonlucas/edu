const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL to scrape
const url = 'https://www.ency-education.com/2am-exams-french.html';

async function scrapeLinks() {
    const target = process.argv[2];
    try {
        // Fetch the HTML of the page
        const { data } = await axios.get(url);
        
        // Load the HTML into cheerio
        const $ = cheerio.load(data);

        // Set to store unique links
        const linksSet = new Set();

        // Find all <a> tags and filter the hrefs
        $('a[href^="/uploads"]').each((index, element) => {
            const href = $(element).attr('href');
            if (href && href.includes(target)) {
                linksSet.add("https://www.ency-education.com"+href); // Add to the Set to avoid duplicates
            }
        });

        // Convert Set to an array and join to a string
        const uniqueLinks = Array.from(linksSet).join('\n');

        // Write the unique links to a text file
        fs.writeFileSync(`${target}.txt`, uniqueLinks, 'utf-8');
        console.log('Unique links have been saved to uploads_links.txt');
        
    } catch (error) {
        console.error('Error fetching the page:', error);
    }
}

// Run the scraping function
scrapeLinks();