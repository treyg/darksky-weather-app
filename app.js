

window.addEventListener('load', () => {
    let long
    let lat
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')



    if(navigator.geolocation){
        //if user allows location access
        navigator.geolocation.getCurrentPosition(position => {
            //run function to get latitude and longitude of user
            long = position.coords.longitude
            //set longitude coordinates to a variable
            lat = position.coords.latitude
            //set latitude coordinates to a variable

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/edb3046b24065a7cbfda5603a675cbf9/${lat},${long}`;
            //set api key as a variable and input lat and long variables using template string

            fetch(api) //do a get request from the api url 
            .then(response => {
                return response.json()
            }) //retun the response to json
            .then(data => {
                console.log(data) //long the weather data returned from the api
                const {temperature, summary} = data.currently //pull temperature from data.currently

                //set DOM elements from the API
                temperatureDegree.textContent = temperature
                temperatureDescription.textContent = summary
            })
        })

        

    } else {
        h1.textContent = `Hey this isn't working because you didn't allow location access`
        //If user denies access to location, alert them that app won't work
    }
})