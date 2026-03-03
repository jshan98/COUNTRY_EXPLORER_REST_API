var countryCount = 12; // limits how many country cards are displayed at a given time
var filteredCountries = data; // Contains the array of countries
// Listens for the DOMContentLoaded event to trigger the populateCards function.
document.addEventListener("DOMContentLoaded", populateCountryCards(filteredCountries, countryCount)); // Listens for the loading of the DOM content and calls populateCountryCards

var searchInput = document.getElementById("search-input"); // Holds the name search bar element
var regionInput = document.getElementById("region-select"); // Holds the region select drop down element
var populationInput = document.getElementById("population-input"); // Holds the population search bar element
var showMorePressed = document.getElementById("show-more-btn"); // Holds the show more button element
var countryCards = document.getElementById("country-cards-container");

searchInput.addEventListener("input", filterData); // Listens for the input in the name search bar and calls filterData
regionInput.addEventListener("change", filterData); // Listens for the changing of the selected region and calls filterData
populationInput.addEventListener("input", filterData); // Listens for the input in the population search bar and calls filterData
showMorePressed.addEventListener("click", showMoreHandler); // Listens for the clicking of the show more button and calls showMoreHandler

// listens for the selction of any country cards
document.addEventListener('click', function(event) {
    console.clear();
    if(event.target.matches(".country-card")){
        console.log("I detected: " + event);
        countryCardHandler(filteredCountries[event.target.id]);
    }
});

/**
 * Function: countryCardHandler
 * @param {*} country 
 * Description: Takes an object of country an creates a query string and sends the query to the details page to be displayed
 */
function countryCardHandler(country) {
    let queryString = "?name=" + encodeURIComponent(country.name.official) + "&flag=" + encodeURIComponent(country.flags.svg) + "&population=" + country.population + "&region=" + country.region + "&subRegion=" + encodeURIComponent(country.subregion) + "&capital=" + encodeURIComponent(country.capital) + "&currencies=" + encodeURIComponent(getFormattedNames(country.currencies)) + "&languages=" + encodeURIComponent(getFormattedNames(country.languages));
    window.location.href = ("detail.html" + queryString);
}

/**
 * Function: showMoreHandler
 * Description: Increments the total number of country cards to be displayed at a given time and calls the populateCountryCards function
 * to update the user display.
 */
function showMoreHandler(){
    countryCount+=12;
    populateCountryCards(filteredCountries, countryCount);
}

/**
 * Function: filterData
 * @param none
 * Description: This function filters the data (By calling applyFiltersSearch & applyFiltersNoSearch) 
 * before calling and passing the filtered data to populateCards. If the inputs are invalid then filterData
 * will use helper methods (showErrorMessage & hideErrorMessage) to display the associated error message to notify the
 * user. Resets the countryCount back to 12 when filters are applied to keep the show more button relevent.
 * @returns none (void)
 */
function filterData(){
    let regex = new RegExp (/^[a-zA-Z -]*$/);
    if (!regex.test (searchInput.value) && !stringIsBlank(searchInput.value)){
        console.log("Invalid country name entered");
        showErrorMessage("name-error");
        return false;
    } else if (!stringIsBlank(searchInput.value) && populationIsValid(populationInput.valueAsNumber)){
        console.clear();
        console.log("1- I found the input: " + searchInput.value);
        filteredCountries = applyFiltersSearch(searchInput.value.toLowerCase(), isAllRegions(regionInput.value), regionInput.value, populationInput.valueAsNumber);
        hideErrorMessage("name-error");
        hideErrorMessage("pop-error");
        countryCount = 12;
    } else if (stringIsBlank(searchInput.value) && populationIsValid(populationInput.valueAsNumber)){
        console.clear();
        console.log("2- I found the input: " + populationInput.valueAsNumber);
        filteredCountries = applyFiltersNoSearch(isAllRegions(regionInput.value), regionInput.value, populationInput.valueAsNumber);
        hideErrorMessage("name-error");
        hideErrorMessage("pop-error");
        countryCount = 12;
    } else {
        console.log("Invalid population number entered");
        showErrorMessage("pop-error");
        return false;
    }
    populateCountryCards(filteredCountries, countryCount);
}

/**
 * Function: getFormattedNames
 * @param {*} item 
 * Decription: receives a list passed from an object of country and creates a formatted sub-string to be returned
 * @returns output.substring(0, output.length-2)
 */
function getFormattedNames(item){
    let output = "";
    for(let index = 0; index < item.length; index++){
        output += (item[index].name + ", ");
    }
    return output.substring(0, output.length-2);
}

/**
 * Function: showErrorMessage
 * @param {*} errorElement 
 * Description: Shows the error message by changing the hidden boolean value to false.
 */
function showErrorMessage(errorElement){
    document.getElementById(errorElement).hidden = false;
}

/**
 * Function: hideErrorMessage
 * @param {*} errorElement
 * Description: Hides the error message by changing the hidden boolean value to true.
 */
function hideErrorMessage(errorElement){
    document.getElementById(errorElement).hidden = true;
}

/**
 * Function: applayFiltersNoSearch
 * @param {*} allRegions 
 * @param {*} regionIn 
 * @param {*} populationIn 
 * Description: Filters for results that do not have a search parameter based on allRegions(boolean),
 * regionIn(selection), populationIn(integer value).
 * @returns filtered array
 */
function applyFiltersNoSearch(allRegions, regionIn, populationIn){
    let filtered = [];
    if(allRegions){
        for(let index = 0; index < data.length; index++){
            if(data[index].population >= populationIn) {
                filtered.push(data[index]);
            }
        }
    } else {
        for(let index = 0; index < data.length; index++){
            if(data[index].region == regionIn && data[index].population >= populationIn) {
                filtered.push(data[index]);
            }
        }
    }
    return filtered;
}

/**
 * Function: applyFiltersSearch
 * @param {*} searchIn 
 * @param {*} allRegions 
 * @param {*} regionIn 
 * @param {*} populationIn
 * Description: Filters for results that have a search parameter based on the searchIn(string value), allRegions(boolean),
 * regionIn (selection), and populationIn(integer value). 
 * @returns filtered array
 */
function applyFiltersSearch(searchIn, allRegions, regionIn, populationIn){
    let filtered = [];
    if(allRegions){
        for(let index = 0; index < data.length; index++){
            if(data[index].name.official.toLowerCase().includes(searchIn) && data[index].population >= populationIn) {
                filtered.push(data[index]);
            }
        }
    } else {
        for(let index = 0; index < data.length; index++){
            if(data[index].name.official.toLowerCase().includes(searchIn)) {
                if(data[index].region == regionIn && data[index].population >= populationIn){
                    filtered.push(data[index]);
                }
            }
        }
    }
    return filtered;
}

/**
 * Function: stringIsBlank
 * @param {*} string 
 * Description: Checks whether the passes string value is blank or not then returns true or false.
 * @returns boolean value (true or false)
 */
function stringIsBlank(string){
    if(string.length == 0){
        return true;
    }
    else {
        return false;
    }
}

/**
 * Function: isAllRegions
 * @param {*} regionSelection
 * Description: Checks if region selection is set to all regions or not then returns true or false. 
 * @returns boolean value (true or false)
 */
function isAllRegions(regionSelection) {
    if(regionSelection == "All Regions"){
        return true;
    }
    else {
        return false;
    }
}

/**
 * Function: populationIsValid
 * @param {*} population 
 * Description: Checks if the population value entered is valid or not then returns true or false.
 * @returns boolean value (true or false)
 */
function populationIsValid(population){
    if (population <= 1500000000){
        return true;
    } else {
        return false;
    }
}

/**
 * Function: populateCards
 * Params: countriesArray, total
 * Description: Checks whether the countries array has a length of 0.
 * If the length is not 0, then the function creates the country cards and their elements.
 * Which then populates the page .
 * @returns none (void)
 */
function populateCountryCards(countriesArray, total) {
    document.getElementById("country-cards-container") .innerHTML= "";
    let countryCardsContainer = document.getElementById("country-cards-container");
    let displayCount = total;
    let countries = countriesArray;
    let showMoreBtn = document.getElementById("show-more-btn");

    /* 
    First checks if the length of the containers array is 0.
    If the length is not 0, then creates the country cards to populate the page
    */
    if(countries.length == 0){
        console.log("No countries found");
        let nothingFound = document.createElement("h4");
        nothingFound.innerHTML = "No countries found";
        countryCardsContainer.appendChild(nothingFound);
    } else {
        let loopCounter = displayCount;
        for (let loop = 0; loop < loopCounter; loop++){

            // Creates div element for each new country card
            let newCard = document.createElement("div");
            newCard.name = 'card';
            newCard.className = 'country-card';
            newCard.id = loop;

            // Creates each image element for each new flag
            let flag = document.createElement("img");
            flag.src = countries[loop].flags.svg;

            // Creates each heading element for each country name
            let countryName = document.createElement("h2");
            countryName.innerHTML = countries[loop].name.official;

            /*
            Creates a span and paragrah for each country's population.
            Then prepends the span to the population paragraph
            */
            let popSpan = document.createElement("span");
            popSpan.textContent = "Population: ";
            let population = document.createElement("p");
            population.textContent = countries[loop].population;
            population.prepend(popSpan);

            /*
            Creates a span and paragrah for each country's capital.
            Then prepends the span to the capital paragraph
            */
            let capitalSpan = document.createElement("span");
            capitalSpan.textContent = "Capital: ";
            let capital = document.createElement("p");
            capital.textContent = countries[loop].capital;
            capital.prepend(capitalSpan);

            /*
            Creates a span and paragrah for each country's region.
            Then prepends the span to the region paragraph
            */
            let regionSpan = document.createElement("span");
            regionSpan.textContent = "Region: ";
            let region = document.createElement("p");
            region.textContent = countries[loop].region;
            region.prepend(regionSpan);

            // Appends each element to the new country card div
            newCard.appendChild(flag);
            newCard.appendChild(countryName);
            newCard.appendChild(population);
            newCard.appendChild(capital);
            newCard.appendChild(region);

            // Append each new country card to the countryCardContainer
            countryCardsContainer.appendChild(newCard);

            if(countriesArray.length - displayCount > 0){
                showMoreBtn.hidden = false;
            } else {
                showMoreBtn.hidden = true;
            }
        }
    }
}