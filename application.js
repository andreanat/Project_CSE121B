/* Global Variables */
const apiUrl = 'https://shein-xi-yin-data-service.p.rapidapi.com/product/get_best_sellers_list?country=US&language=en&currency=USD&page=1&size=20';
const templesElement = document.getElementById('temples');
const templeList = [];



/* Function to Fetch Data from Shein API */
async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '21b97010d1msh813e1f0277b243ep120b26jsn616f4ee34816',
                'X-RapidAPI-Host': 'shein-Xi-Yin-data-service.p.rapidapi.com'
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
/* ... (previous code) */

/* Function to Display a Random Product */
function displayRandomProduct() {
    reset();
    if (clothesList.length > 0) {
        const randomIndex = Math.floor(Math.random() * clothesList.length);
        const randomProduct = clothesList[randomIndex];
        
        const articleElement = document.createElement('article');
        
        const h3Element = document.createElement('h3');
        h3Element.textContent = randomProduct.productName;

        const imgElement = document.createElement('img');
        imgElement.src = randomProduct.imageUrl;
        imgElement.alt = randomProduct.productName;
        
        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);
        clothesElement.appendChild(articleElement);
    } else {
        console.log('No products to display.');
    }
}

/* Event Listener for the "Show Random Product" button */
document.getElementById('showRandomProductButton').addEventListener('click', displayRandomProduct);



/* Function to Display Clothes */
function displayClothes(clothesList) {
    reset();
    clothesList.forEach((clothe) => {
        const articleElement = document.createElement('article');

        const h3Element = document.createElement('h3');
        h3Element.textContent = clothe.productName; // Make sure the API response key is correct

        const imgElement = document.createElement('img');
        imgElement.src = clothe.imageUrl; // Make sure the API response key is correct
        imgElement.alt = clothe.productName; // Make sure the API response key is correct

        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);
        clothesElement.appendChild(articleElement);
    });
}

/* Function to Reset Clothes Element */
function reset() {
    while (clothesElement.firstChild) {
        clothesElement.removeChild(clothesElement.firstChild);
    }
}

/* Event Listener */
document.querySelector('#sortBy').addEventListener('change', () => {
    const filter = document.getElementById('sortBy').value;

    switch (filter) {
        case 'sandals':
            const sandals = clothesList.filter((clothe) => clothe.category === 'sandals'); // Make sure the API response key is correct
            displayClothes(sandals);
            break;

        case 'shirts':
            const shirts = clothesList.filter((clothe) => clothe.category === 'shirts'); // Make sure the API response key is correct
            displayClothes(shirts);
            break;

        case 'bottom':
            const bottoms = clothesList.filter((clothe) => clothe.category === 'bottoms'); // Make sure the API response key is correct
            displayClothes(bottoms);
            break;

        case 'all':
        default:
            displayClothes(clothesList);
            break;
    }
});

/* Main Function */
async function main() {
    const fetchedData = await fetchData();
    clothesList.push(...fetchedData.data); // Make sure the API response structure is correct
    displayClothes(clothesList);
}

