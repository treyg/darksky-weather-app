

window.addEventListener('load', () => {
    let long
    let lat
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const locationTimezone = document.querySelector('.location-timezone')
    const temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')
    const dailyDescription = document.querySelector('.daily-description')
    const mon = document.querySelector('.mon')
    const tues = document.querySelector('.tues')
    const wed = document.querySelector('.wed')
    const thurs = document.querySelector('.thurs')
    const fri = document.querySelector('.fri')
    const sat = document.querySelector('.sat')
    const sun = document.querySelector('.sun')


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
                const {temperature, summary, icon} = data.currently //pull temperature from data.currently

                //set DOM elements from the API
                temperatureDegree.textContent = Math.floor(temperature)
                temperatureDescription.textContent = summary
                locationTimezone.textContent = data.timezone
                dailyDescription.textContent = data.hourly.summary

                // Set weekly elements fromt the DOM
                mon.textContent = data.daily.data[0].icon
                tues.textContent = data.daily.data[1].icon
                wed.textContent = data.daily.data[2].icon
                thurs.textContent = data.daily.data[3].icon
                fri.textContent = data.daily.data[4].icon
                sat.textContent = data.daily.data[5].icon
                sun.textContent = data.daily.data[6].icon


                //Set Icon
                 setIcons(icon, document.querySelector('.icon'))
                
                //Formula for Celsius
                let celsius = (temperature - 32) * (5 / 9)
                   

                //Change temperature to celsius/fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C'
                        temperatureDegree.textContent = Math.floor(celsius)
                    } else {
                        temperatureSpan.textContent = 'F'
                        temperatureDegree.textContent = Math.floor(temperature)
                    }
                })

                //Set background dependent on weather
                if (summary == "Overcast" || "Mostly Cloudy") {
                    document.body.style.background = "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=689&q=80')"
                } else if (summary == "Partly Cloudy") {
                    document.body.style.background = "url('https://turntable.kagiso.io/images/partly-cloudy-1173077-639x447.width-800.jpg')"
                } else if (summary == "Drizzle" || "Light Rain") {
                    document.body.style.background = "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=689&q=80')"
                } else if (summary == "Sunny" || "Clear"){
                    document.body.style.background = "url('https://images.unsplash.com/photo-1531147646552-1eec68116469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')"
                } else {
                    document.body.style.background = "url('https://images.unsplash.com/photo-1531147646552-1eec68116469?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')"
                }


            })
        })

        function setIcons(icon, iconID) { //run function to take the icons from currently object and match them with skycons
            const skycons = new Skycons({color: "white"}); //Set var and properties for skycons
            const currentIcon = icon.replace(/-/g, "_").toUpperCase() // look for every line in the currently object and replace with _ to match skycons icon
            skycons.play() //make skycons animation play
            skycons.set(iconID, Skycons[currentIcon]) //set the icon to current icon to run in function
        }

    } 

   
})