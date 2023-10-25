const url = 'https://shein-xi-yin-data-service.p.rapidapi.com/product/get_best_sellers_list?country=US&language=en&currency=USD&page=1&size=20';
const clothesElement = document.getElementById('clothes');
const clothesList = [];
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '21b97010d1msh813e1f0277b243ep120b26jsn616f4ee34816',
		'X-RapidAPI-Host': 'shein-Xi-Yin-data-service.p.rapidapi.com'
    }
};

async function fetchData() {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

/* function to display random product */
function displayRandomProduct() {
    if (clothesList.length > 0) {
        const randomIndex = Math.floor(Math.random() * clothesList.length);
        const randomCloth = clothesList[randomIndex];

        const articleElement = document.createElement('article');

        const h3Element = document.createElement('h3');
        h3Element.textContent = randomCloth.productName;

        const imgElement = document.createElement('img');
        imgElement.src = randomCloth.imageUrl;
        imgElement.alt = randomCloth.productName;
        imgElement.classList.add('product-image');
        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);

        reset();
        clothesElement.appendChild(articleElement);
    } else {
        console.log('No products to display.');
    }
}

/* Main */
async function main() {
    const fetchedData = await fetchData();
    if (fetchedData) {
        clothesList.push(...fetchedData.data);
        displayRandomProduct();
    } else {
        console.log('Failed to fetch data. Please check your API key and network connection.');
    }
}

main();