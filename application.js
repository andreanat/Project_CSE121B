const clothesElement = document.getElementById("clothes");
let clothesList = [];

const fetchData = async () => {
    const url = "https://shein-xi-yin-data-service.p.rapidapi.com/product/get_best_sellers_list?country=US&language=en&currency=USD&page=1&size=20";
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '21b97010d1msh813e1f0277b243ep120b26jsn616f4ee34816',
            'X-RapidAPI-Host': 'shein-Xi-Yin-data-service.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.data; // Assuming your data is an array
    } catch (error) {
        console.error(error);
        return null;
    }
};

function reset() {
    while (clothesElement.firstChild) {
        clothesElement.removeChild(clothesElement.firstChild);
    }
}

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
        imgElement.setAttribute('role', 'img');
        imgElement.setAttribute('aria-label', randomCloth.productName);
        imgElement.classList.add('product-image');

        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);
        reset();
        clothesElement.appendChild(articleElement);
   } else {
        console.log('No products to display.');
    }
}

async function main() {
    const fetchedData = await fetchData();
    if (fetchedData) {
        clothesList = [...fetchedData];
        displayRandomProduct();
    } else {
        console.log('Failed to fetch data. Please check your API key and network connection.');
    }
}

main();