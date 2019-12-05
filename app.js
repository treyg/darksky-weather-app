

window.addEventListener('load', () => {
    let long
    let lat
    const temperatureDescription = document.querySelector('.temperature-description')
    const temperatureDegree = document.querySelector('.temperature-degree')
    const locationTimezone = document.querySelector('.location-timezone')
    const temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')
    const dailyDescription = document.querySelector('.daily-description')
    const dayOneTemp = document.querySelector('#dayOneTemp')
    const dayTwoTemp = document.querySelector('#dayTwoTemp')
    const dayThreeTemp = document.querySelector('#dayThreeTemp')
    const dayFourTemp = document.querySelector('#dayFourTemp')
    const dayFiveTemp = document.querySelector('#dayFiveTemp')
    const daySixTemp = document.querySelector('#daySixTemp')
    const daySevenTemp = document.querySelector('#daySevenTemp')
    const currentDate = document.querySelector('.current-date')


    if(navigator.geolocation){
        //if user allows location access 
        navigator.geolocation.getCurrentPosition (position => {
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
                dayOneTemp.textContent = `${Math.floor(data.daily.data[0].temperatureHigh)}° / ${Math.floor(data.daily.data[0].temperatureLow)}°`
                dayTwoTemp.textContent = `${Math.floor(data.daily.data[1].temperatureHigh)}° / ${Math.floor(data.daily.data[1].temperatureLow)}°`
                dayThreeTemp.textContent = `${Math.floor(data.daily.data[2].temperatureHigh)}° / ${Math.floor(data.daily.data[2].temperatureLow)}°`
                dayFourTemp.textContent = `${Math.floor(data.daily.data[3].temperatureHigh)}° / ${Math.floor(data.daily.data[3].temperatureLow)}°`
                dayFiveTemp.textContent = `${Math.floor(data.daily.data[4].temperatureHigh)}° / ${Math.floor(data.daily.data[4].temperatureLow)}°`
                daySixTemp.textContent = `${Math.floor(data.daily.data[5].temperatureHigh)}° / ${Math.floor(data.daily.data[5].temperatureLow)}°`
                daySevenTemp.textContent = `${Math.floor(data.daily.data[6].temperatureHigh)}° / ${Math.floor(data.daily.data[6].temperatureLow)}°`

                // Set daily Icon, high and low for coming week
                // Day 1 - Today
                const dayOneDay = document.getElementById('dayOneDay'); //Create a div to append date to the DOM
                dayOneDay.innerHTML = dayjs(data.daily.data[0].time * 1000).format('dddd')//Set the HTML to show date from unix code taken from daily object
            
                let dayOneIcon = new Skycons({"color": "white"});
                dayOneIcon.add(document.getElementById("dayOneIcon"), data.daily.data[0].icon);
                dayOneIcon.play();

                // Day 2
                const dayTwoDay = document.getElementById('dayTwoDay'); 
                dayTwoDay.innerHTML = dayjs(data.daily.data[1].time * 1000).format('dddd')

                let dayTwoIcon = new Skycons({"color": "white"});
                dayTwoIcon.add(document.getElementById("dayTwoIcon"), data.daily.data[1].icon);
                dayTwoIcon.play();

                // Day 3
                const dayThreeDay = document.getElementById('dayThreeDay'); 
                dayThreeDay.innerHTML = dayjs(data.daily.data[2].time * 1000).format('dddd')

                let dayThreeIcon = new Skycons({"color": "white"});
                dayThreeIcon.add(document.getElementById("dayThreeIcon"), data.daily.data[2].icon);
                dayThreeIcon.play();
                // Day 4
                const dayFourDay = document.getElementById('dayFourDay'); 
                dayFourDay.innerHTML = dayjs(data.daily.data[3].time * 1000).format('dddd')

                let dayFourIcon = new Skycons({"color": "white"});
                dayFourIcon.add(document.getElementById("dayFourIcon"), data.daily.data[3].icon);
                dayFourIcon.play();

                // Day 5
                const dayFiveDay = document.getElementById('dayFiveDay'); 
                dayFiveDay.innerHTML = dayjs(data.daily.data[4].time * 1000).format('dddd')

                let dayFiveIcon = new Skycons({"color": "white"});
                dayFiveIcon.add(document.getElementById("dayFiveIcon"), data.daily.data[4].icon);
                dayFiveIcon.play();

                // Day 6
                const daySixDay = document.getElementById('daySixDay'); 
                daySixDay.innerHTML = dayjs(data.daily.data[5].time * 1000).format('dddd')

                let daySixIcon = new Skycons({"color": "white"});
                daySixIcon.add(document.getElementById("daySixIcon"), data.daily.data[5].icon);
                daySixIcon.play();

                // Day 7
                const daySevenDay = document.getElementById('daySevenDay'); 
                daySevenDay.innerHTML = dayjs(data.daily.data[6].time * 1000).format('dddd')

                let daySevenIcon = new Skycons({"color": "white"});
                daySevenIcon.add(document.getElementById("daySevenIcon"), data.daily.data[6].icon);
                daySevenIcon.play();
               
                
                //Set Main Icon
                 setIcons(icon, document.querySelector('.mainIcon'))
                
                //Set current Date
                
                currentDate.textContent = dayjs().format('dddd, MMMM D')
                
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