const url = "https://restcountries.eu/rest/v2/all";
let tabCountries = null;
let tabFavorites = null;

let allCountries = [];
let favoriteCountries = [];

let countCountries = 0;
let countFavorites = 0;

let totalPopulationList = 0;
let totalPopulationFavorites = 0;

let numberFormat = null;

var start = () =>{
    tabCountries = document.querySelector("#tabCountries");
    
    tabFavorites = document.querySelector("#tabFavorites");
    
    countCountries = document.querySelector("#countCountries");
    
    countFavorites = document.querySelector("#countFavorites");

    totalPopulationList = document.querySelector("#totalPopulationList");
    
    totalPopulationFavorites = document.querySelector("#totalPopulationFavorites");

    numberFormat = Intl.NumberFormat('pt-BR');

    fetchCountries();
}

window.addEventListener('load', start);

async function fetchCountries(){

    const res = await fetch(url);
    
    allCountries = (await res.json()).map(country =>{
        const {numericCode, translations, population, flag} = country;
        
        return {
            id: numericCode,
            name: translations.pt,
            population,
            formattedPopulation: formatNumber(population),
            flag,
        }
    });
    
    sortAllCountries();

    render();
}

function sortAllCountries(){
    allCountries.sort((a,b) => {
        return a.name.localeCompare(b.name);
    });
}

function render(){
    renderCountryList();
    renderFavorites();
    renderSummary();
    handleCountryButtons();
}

function renderCountryList(){
    let countriesHTML = "<div>";

    allCountries.forEach(country=>{
        const {id, name, flag, population, formattedPopulation} = country;
        
        const countryHTML = 
        `
            <div class="country">
                <div>
                    <a id="${id}" class="waves-effect waves-ligth btn">+</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}" />
                </div>
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${formattedPopulation}</li>
                    </ul>
                </div>
            </div>
        `;

        countriesHTML += countryHTML;
    });    

    countriesHTML += "</div>";

    tabCountries.innerHTML = countriesHTML;
}

function renderFavorites(){
    let favoritesHTML = "<div>";

    favoriteCountries.forEach(country=>{
        const {id, name, flag, population, formattedPopulation} = country;

        const favoriteHTML = 
        `
            <div class="country">
                <div>
                    <a id="${id}" class="waves-effect waves-ligth btn red darken-4">-</a>
                </div>
                <div>
                    <img src="${flag}" alt="${name}" />
                </div>
                <div>
                    <ul>
                        <li>${name}</li>
                        <li>${formattedPopulation}</li>
                    </ul>
                </div>
            </div>
        `;

        favoritesHTML += favoriteHTML;
    });

    favoritesHTML += '</div>';

    tabFavorites.innerHTML = favoritesHTML;
}

function renderSummary(){
    countCountries.textContent = allCountries.length;

    countFavorites.textContent = favoriteCountries.length;

    const totalPopulation = allCountries.reduce((accumulator, current)=>{
        return accumulator + current.population;
    }, 0);

    totalPopulationList.innerHTML = formatNumber(totalPopulation);

    const totalFavorites = favoriteCountries.reduce((accumulator, current)=>{
        return accumulator + current.population;
    }, 0);

    totalPopulationFavorites.innerHTML = formatNumber(totalFavorites);
}

function handleCountryButtons(){
    const countryButtons = Array.from(tabCountries.querySelectorAll('.btn'));

    const favoriteButtons = Array.from(tabFavorites.querySelectorAll('.btn'));

    countryButtons.forEach(btn=>{
        btn.addEventListener('click', ()=> addToFavorites(btn.id));
    });

    function addToFavorites(id){
        const countryToAdd = allCountries.find(country => country.id === id);

        favoriteCountries = [...favoriteCountries, countryToAdd];  
        
        favoriteCountries.sort((a, b)=>{
            return a.name.localeCompare(b.name);
        });

        allCountries = allCountries.filter(country=> country.id !== id);

        render();
    }

    favoriteButtons.forEach(country=>{
        country.addEventListener('click', ()=> removeFromFavorites(country.id));
    });

    function removeFromFavorites(id){
        const countryFromRemove = favoriteCountries.find(country => country.id === id);

        allCountries = [...allCountries, countryFromRemove];

        sortAllCountries();

        favoriteCountries = favoriteCountries.filter(country=> country.id !== id);
        
        render();
    }    
}

function formatNumber(number){
    return numberFormat.format(number);
}