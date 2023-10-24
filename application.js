/* Global Variables */
/* Global Variables */
const apiUrl = 'https://shein-xi-yin-data-service.p.rapidapi.com/product/get_best_sellers_list?country=US&language=en&currency=USD&page=1&size=20';
const clothesElement = document.getElementById('clothes');
const clothesList = [];

/* Function to Fetch Data from Shein API */
async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '21b97010d1msh813e1f0277b243ep120b26jsn616f4ee34816',
                'X-RapidAPI-Host': 'shein-xi-yin-data-service.p.rapidapi.com'
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch data from the API');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

/* Function to Display a Random Product */
function displayRandomProduct() {
    reset();
    if (clothesList.length > 0) {
        const randomIndex = Math.floor(Math.random() * clothesList.length);
        const randomCloth = clothesList[randomIndex];
        
        const articleElement = document.createElement('article');
        
        const h3Element = document.createElement('h3');
        h3Element.textContent = randomCloth.productName;

        const imgElement = document.createElement('img');
        imgElement.src = randomCloth.imageUrl;
        imgElement.alt = randomCloth.productName;
        
        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);
        clothesElement.appendChild(articleElement);
    } else {
        console.log('No products to display.');
    }
}

document.getElementById('showRandomProductButton').addEventListener('click', displayRandomProduct);

/* Function to Reset Clothes Element */
function reset() {
    while (clothesElement.firstChild) {
        clothesElement.removeChild(clothesElement.firstChild);
    }
}

/* Main Function */
async function main() {
    const fetchedData = await fetchData();
    clothesList.push(...fetchedData.data); // Make sure the API response structure is correct
    displayRandomProduct(); // Display a random product when the page loads
}

main();
