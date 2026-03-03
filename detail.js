document.addEventListener("DOMContentLoaded", populateDetails);

var backButton = document.getElementById("back-btn"); // Holds the back button element
backButton.addEventListener("click", backButtonHandler); // adds the event listener for the back button element

/**
 * Function: backButtonHandler
 * Description: Returns the user back to the main (index.html) page when called
 */
function backButtonHandler(){
    window.location.href = "index.html";
}

/**
 * Function: populateDetails
 * Description: populates the details page elements by decoding the query string sent from the main page (index.html)
 */
function populateDetails(){
    const params = new URLSearchParams(window.location.search);
    let encodedName = params.get("name");
    let decodedName = decodeURIComponent(encodedName);
    let encodedFlag = params.get("flag");
    let decodedFlag = decodeURIComponent(encodedFlag);
    let encodedPopulation = params.get("population");
    let decodedPopulation = decodeURIComponent(encodedPopulation);
    let encodedRegion = params.get("region");
    let decodedRegion = decodeURIComponent(encodedRegion);
    let encodedSubRegion = params.get("subRegion");
    let decodedSubRegion = decodeURIComponent(encodedSubRegion);
    let encodedCapital = params.get("capital");
    let decodedCapital = decodeURIComponent(encodedCapital);
    let encodedCurrencies = params.get("currencies");
    let decodedCurrencies = decodeURIComponent(encodedCurrencies);
    let encodedLanguages = params.get("languages");
    let decodedLanguages = decodeURIComponent(encodedLanguages);

    let name = document.getElementById("detail-country-name");
    name.innerHTML = decodedName;
    let flag = document.getElementById("detail-flag");
    flag.src = decodedFlag;
    let pops= document.getElementById("detail-pop");
    pops.innerHTML += decodedPopulation;
    let region = document.getElementById("detail-region");
    region.innerHTML += decodedRegion;
    let subRegion = document.getElementById("detail-sub-region");
    subRegion.innerHTML += decodedSubRegion;
    let capital = document.getElementById("detail-capital");
    capital.innerHTML += decodedCapital;
    let currencies = document.getElementById("detail-currencies");
    currencies.innerHTML += decodedCurrencies;
    let languages = document.getElementById("detail-languages");
    languages.innerHTML += decodedLanguages;
}