// Get the required page elements based on their CSS classes
let generateBtn = document.querySelector(".generate"); // Button to generate a new quote when clicked
let autoBtn = document.querySelector(".auto-quote"); // Button to enable automatic quote generation (not used here)
let stopBtn = document.querySelector(".stop-auto"); // Button to stop automatic quote generation (not used here)
let quoteDiv = document.querySelector(".quote-display"); // Element to display the quote text
let authorName = document.querySelector(".author-name"); // Element to display the author name
let quoteId = document.querySelector(".quote-id"); // Element to display the quote ID
let autoStatus = document.querySelector(".auto-status"); // Element to display the status of automatic quote generation
let intervalId ; // Variable to store the interval ID for automatic quote generation
let copyBtn = document.querySelector(".copy-button"); // Button to copy the quote text to the clipboard

// Assign the generateQuote function as the click event handler for the generateBtn
generateBtn.onclick = generateQuote; // Generate a new quote when the button is clicked
autoBtn.onclick = startAutoQuote; // Start automatic quote generation when the button is clicked
stopBtn.onclick = stopAutoQuote; // Stop automatic quote generation when the button is clicked
copyBtn.onclick = copyQuote; // Copy the quote text to the clipboard when the button is clicked

// Asynchronous function to fetch quotes from a JSON file
async function getQuotes() {
    // The original comment shows an alternative to fetch random quotes from an external API
    // let response = await fetch("https://api.quotable.io/random");
    
    // Send a request to fetch quotes from a local JSON file
    let response = await fetch("quotes.json");
    
    // Convert the response to JSON
    let data = await response.json();
    
    // Return the fetched data
    return data;
}

// Asynchronous function to generate and display a random quote
async function generateQuote() {
    // Wait to get the quotes from the getQuotes function
    const quotes = await getQuotes();
    
    // Select a random quote from the list
    let quote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Update the quoteDiv element with the quote text
    quoteDiv.innerHTML = quote.text;
    authorName.innerHTML = quote.author; // Update the authorName element with the author name

    
    // Update the quoteId element with the quote ID
    quoteId.innerHTML = quote.id;

}

function startAutoQuote() {
    // Function to start automatic quote generation
    autoBtn.style.backgroundColor = " #07b507d9"; // Change the background color of the quote text
    intervalId = setInterval(generateQuote, 4000); // Generate a new quote every 5 seconds
    autoStatus.innerHTML = "Automatic Quote Generation Started"; // Update the status message

}

function stopAutoQuote() {
    // Function to stop automatic quote generation
    autoBtn.style.backgroundColor = " rgba(0, 117, 255, 1)"; // Change the background color of the quote text
    clearInterval(intervalId); // Clear the interval to stop automatic quote generation
}



function copyQuote() {
    // Function to copy the quote text to the clipboard
    let text = document.querySelector('.quote-display').innerHTML; // Get the quote text
    navigator.clipboard.writeText(text).then(() => {
        // Show the message
        let copyMessage = document.getElementById('copyMessage');
        copyMessage.classList.add('show');
        
        // Hide the message after 2 seconds
        setTimeout(() => {
            copyMessage.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}