

window.addEventListener('load', () => {
    let long
    let lat
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const locationTimezone = document.querySelector('.location-timezone')
    const temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')
    const dailyDescription = document.querySelector('.daily-description')
    const oneDayFromNow = document.querySelector('.oneDayFromNow')
    const twoDaysFromNow = document.querySelector('.twoDaysFromNow')
    const threeDaysFromNow = document.querySelector('.threeDaysFromNow')
    const fourDaysFromNow = document.querySelector('.fourDaysFromNow')
    const fiveDaysFromNow = document.querySelector('.fiveDaysFromNow')
    const sixDaysFromNow = document.querySelector('.sixDaysFromNow')
    const sevenDaysFromNow = document.querySelector('.sevenDaysFromNow')


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
                //locationTimezone.textContent = data.timezone
                dailyDescription.textContent = data.hourly.summary

                // Set weekly elements fromt the DOM
                oneDayFromNow.textContent = `${Math.floor(data.daily.data[0].apparentTemperatureMax)}°F / ${Math.floor(data.daily.data[0].apparentTemperatureMin)}°F`
                twoDaysFromNow.textContent = `${Math.floor(data.daily.data[1].apparentTemperatureMax)}°F / ${Math.floor(data.daily.data[1].apparentTemperatureMin)}°F`
                threeDaysFromNow.textContent = `${Math.floor(data.daily.data[2].apparentTemperatureMax)}°F / ${Math.floor(data.daily.data[2].apparentTemperatureMin)}°F`
                fourDaysFromNow.textContent = `${Math.floor(data.daily.data[3].apparentTemperatureMax)}°F / ${Math.floor(data.daily.data[3].apparentTemperatureMin)}°F`
                fiveDaysFromNow.textContent = `${Math.floor(data.daily.data[4].apparentTemperatureMax)}°F / ${Math.floor(data.daily.data[4].apparentTemperatureMin)}°F`
                sixDaysFromNow.textContent = `${Math.floor(data.daily.data[5].apparentTemperatureMax)}°F / ${Math.floor(data.daily.data[5].apparentTemperatureMin)}°F`
                sevenDaysFromNow.textContent = `${Math.floor(data.daily.data[6].apparentTemperatureMax)}°F / ${Math.floor(data.daily.data[6].apparentTemperatureMin)}°F`

                // Set daily summaries for coming week
             
                // Day 1 - Today
                const dayOneDiv = document.createElement('span') //Create a div to append date to the DOM
                dayOneDiv.innerHTML = new Date(data.daily.data[0].time * 1000).toString().slice(0, 3) //Set the HTML to show date from unix code taken from daily object
                oneDayFromNow.appendChild(dayOneDiv)//Append the date to the oneDayFromNow div
                // Day 2
                const dayTwoDiv = document.createElement('span')
                dayTwoDiv.innerHTML = new Date(data.daily.data[1].time * 1000).toString().slice(0, 3)
                twoDaysFromNow.appendChild(dayTwoDiv)
                // Day 3
                const dayThreeDiv = document.createElement('span')
                dayThreeDiv.innerHTML = new Date(data.daily.data[2].time * 1000).toString().slice(0, 3)
                threeDaysFromNow.appendChild(dayThreeDiv)
                // Day 4
                const dayFourDiv = document.createElement('span')
                dayFourDiv.innerHTML = new Date(data.daily.data[3].time * 1000).toString().slice(0, 3)
                fourDaysFromNow.appendChild(dayFourDiv)
                // Day 5
                const dayFiveDiv = document.createElement('span')
                dayFiveDiv.innerHTML = new Date(data.daily.data[4].time * 1000).toString().slice(0, 3)
                fiveDaysFromNow.appendChild(dayFiveDiv)
                // Day 6
                const daySixDiv = document.createElement('span')
                daySixDiv.innerHTML = new Date(data.daily.data[5].time * 1000).toString().slice(0, 3)
                sixDaysFromNow.appendChild(daySixDiv)
                // Day 7
                const daySevenDiv = document.createElement('span')
                daySevenDiv.innerHTML = new Date(data.daily.data[6].time * 1000).toString().slice(0, 3)
                sevenDaysFromNow.appendChild(daySevenDiv)

                //or
                // const { daily: { data: daysOfWeekWeather } } = data;
                // const forecastHTML = daysOfWeekWeather.reduce((html, { summary, time }, i) => {
                // const dateText = new Date(time * 1000).toString().slice(0, 10);
                // return html += `<div class="day-${i + 1}">${summary}<span>${dateText}</span></div>`;
                // }, '');
                // document.querySelector('.weekly').innerHTML = forecastHTML;
               
                
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

                //Set background dependent on weather by taking in current icon
                function setBackground(icon) {
                    const backgrounds = {
                      "cloudy": "bg-cloudy",
                      "partly-cloudy-day": "bg-partly-cloudy-day",
                      "partly-cloudy-night": "bg-partly-cloudy-night",
                      "rain": "bg-rain",
                      "sunny": "bg-sunny",
                      "clear-day": "bg-sunny",
                      "partly-cloudy-night" : "bg-pc-night",
                      "clear-night" : "bg-clear-night",
                      "snow" : "bg-snow",
                      "sleet" : "bg-sleet",
                      "wind" : "bg-wind",
                      "fog" : "bg-fog",
                      "thunderstorm" : "bg-thunderstorm"
                    };
                    document.body.className = backgrounds[icon] || "bg-default";
                  }

                  setBackground(icon)

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