const https = require('https');

/**
 * Function: fetchCountries
 * Description: Fetches the country information from the REST Countries API or returns an error in the event the there is an issue with fulfilling the request.
 * @returns A new Promise that takes the resolution and rejection as parameters and returns either based on the outcome of the API request
 */
function fetchCountries(){
    return new Promise(function(resolve, reject){
        const API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies,languages,region,subregion,population&fullText=True";

        let req = https.get(API_URL, function(res){
            let data = "";

            // A data chunk has been recieved
            res.on("data", function(chunk){
                data+=chunk;
            });

            // The entire response has been received
            res.on("end", function(){
                let countriesData = JSON.parse(data);
                resolve(countriesData);
            });
        });

        // Handles any errors in the request
        req.on("error", function(error){
            reject(error);
        });

        req.end();
    });
}

/**
 * Function: fetchCountriesByName
 * Description: Fetches country information by name from the REST Countries API or returns an error in the event the there is an issue with fulfilling the request.
 * @param {*} name 
 * @returns A new Promise that takes the resolution and rejection as parameters and returns either based on the outcome of the API request
 */
function fetchCountriesByName(name){
    return new Promise(function(resolve, reject){
        const API_URL = "https://restcountries.com/v3.1/name/" + name + "?fields=name,capital,flags,currencies,languages,region,subregion,population";

        let req = https.get(API_URL, function(res){
            let data = "";

            res.on("data", function(chunk){
                data+=chunk;
            });

            res.on("end", function(){
                let countriesData = JSON.parse(data);
                resolve(countriesData);
            });
        });

        req.on("error", function(error){
            reject(error);
        });

        req.end();
    });
}

/**
 * Function: fetchCountriesByRegion
 * Description: Fetches country information by region from the REST Countries API or returns an error in the event the there is an issue with fulfilling the request.
 * @param {*} region
 * @returns A new Promise that takes the resolution and rejection as parameters and returns either based on the outcome of the API request
 */
function fetchCountriesByRegion(region){
    return new Promise(function(resolve, reject){
        const API_URL = "https://restcountries.com/v3.1/region/" + region + "?fields=name,capital,flags,currencies,languages,region,subregion,population";

        let req = https.get(API_URL, function(res){
            let data = "";

            res.on("data", function(chunk){
                data+=chunk;
            });

            res.on("end", function(){
                let countriesData = JSON.parse(data);
                resolve(countriesData);
            });
        });

        req.on("error", function(error){
            reject(error);
        });

        req.end();
    });
}

module.exports = {fetchCountries, fetchCountriesByName, fetchCountriesByRegion};