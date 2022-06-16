const API_KEY = "vE4t4eb5a8hA0yoqmpmfulv7rDfChbO1"; 
const searchElement = document.getElementById("search-input");
const searchFormElement = document.getElementById("search-form");
const gifContainerElement = document.getElementById("gif-container");
const showMoreButtonElement = document.querySelector(".hidden");
let LIMIT = 9;
let pages = 0;
let offset = pages*LIMIT;

searchFormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchGifs();
});

async function fetchGifs() {
    const URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchElement.value}&limit=${LIMIT}&offset=${offset}&rating=g&lang=en`;
    const response = await fetch(URL);
    const result = await response.json();
    displayGifs(result.data);
}

function displayGifs(gifArray) {
    gifArray.forEach((gif) => {
        gifContainerElement.innerHTML += `
        <img src="${gif.images.downsized.url}"/>
        `;
    });
    pages += 1;
    offset = pages*LIMIT;
    if (pages > 0) {
        showMoreButtonElement.classList.remove("hidden");
    }
}

async function showMore() {
    fetchGifs();
}
