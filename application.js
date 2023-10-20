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

/* Function to Display Temples */
function displayTemples(templeList) {
    reset();
    templeList.forEach((temple) => {
        const articleElement = document.createElement('article');

        const h3Element = document.createElement('h3');
        h3Element.textContent = temple.templeName;

        const imgElement = document.createElement('img');
        imgElement.src = temple.imageUrl;
        imgElement.alt = temple.location;

        articleElement.appendChild(h3Element);
        articleElement.appendChild(imgElement);
        templesElement.appendChild(articleElement);
    });
}

/* Function to Reset Temples Element */
function reset() {
    while (templesElement.firstChild) {
        templesElement.removeChild(templesElement.firstChild);
    }
}

/* Event Listener */
document.querySelector('#sortBy').addEventListener('change', () => {
    const filter = document.getElementById('sortBy').value;

    switch (filter) {
        case 'utah':
            const utahTemples = templeList.filter((temp) => temp.location.includes('Utah'));
            displayTemples(utahTemples);
            break;

        case 'nonutah':
            const nonUtahTemples = templeList.filter((temp) => !temp.location.includes('Utah'));
            displayTemples(nonUtahTemples);
            break;

        case 'older':
            const olderTemples = templeList.filter((temp) => new Date(temp.dedicated) < new Date(1950, 0, 1));
            displayTemples(olderTemples);
            break;

        case 'all':
        default:
            displayTemples(templeList);
            break;
    }
});

/* Main Function */
async function main() {
    const fetchedData = await fetchData();
    templeList.push(...fetchedData.items);
    displayTemples(templeList);
}

main();
