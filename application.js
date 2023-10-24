/* Global Variables */
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

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

/* function */
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

/* function*/
document.querySelector('#sortBy').addEventListener('change', () => {
    const filter = document.getElementById('sortBy').value;

    switch (filter) {
        case 'sandals':
            const sandals = clothesList.filter((clothe) => clothe.category === 'sandals');
            displayClothes(sandals);
            break;

        case 'shirts':
            const shirts = clothesList.filter((clothe) => clothe.category === 'shirts');
            displayClothes(shirts);
            break;

        case 'bottom':
            const bottoms = clothesList.filter((clothe) => clothe.category === 'bottoms');
            displayClothes(bottoms);
            break;

        case 'all':
        default:
            displayClothes(clothesList);
            break;
    }
});

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
