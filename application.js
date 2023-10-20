const apiUrl = 'https://shein-xi-yin-data-service.p.rapidapi.com/product/get_best_sellers_list?country=US&language=en&currency=USD&page=1&size=20';

// fetch
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

function displayTrends(trends) {
    const trendsContainer = document.getElementById('trends');
    trendsContainer.innerHTML = '';

    trends.forEach(trend => {
        const trendElement = document.createElement('div');
        trendElement.innerHTML = `
            <h2>${trend.name}</h2>
            <p>${trend.description}</p>
            <p>Price: ${trend.price}</p>
        `;
        trendsContainer.appendChild(trendElement);
    });
}

function filterTrends(trends, criteria) {
    return trends.filter(trend => {
        // filter
        return true; 
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const trendsData = await fetchData();
    const trends = trendsData.items;

    displayTrends(trends);

    const filterOptions = document.getElementById('filters');
    
});
