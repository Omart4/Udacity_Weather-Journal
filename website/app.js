/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'ad6f724ae6adf65f34d542addbbba664';
const generate = document.getElementById('generate')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//This is where the magic happens , by calling this function we get the weather , post the data to server.js , update the UI
const performAction = ()=>{
    const ZIP = document.getElementById('zip').value;
    getWeather(baseURL,ZIP,apiKey)
       .then(function(user){
           postData('/add',{city:user.name, date:newDate,weather:user.main.temp,mood:mood})
       })
       .then(updateUI)
}
generate.addEventListener('click',performAction)

//Getting the weather
const getWeather = async (baseURL,code,apiKey)=>{
    const response = await fetch(`${baseURL}${code},us&appid=${apiKey}`);
    console.log(response)
    try{
        const user = await response.json()
        console.log(user)
        return user
    }catch(err){
        console.log(err)
    }
}

//Posting the collected weather to a directory
const postData = async (url='',data={})=>{
    const res = await fetch(url,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try{
        const newData = await res.json()
        return newData
    }catch(err){
        console.log(err)
    }
}

//Dynamically updating UI
const updateUI = async ()=>{
    const request = await fetch('/all')
    const date = document.getElementById('date');
    const weather = document.getElementById('weather');
    const feel = document.getElementById('feel');
    const city = document.getElementById('city')
    const mood = document.getElementById('mood').value
    try{
        const data = await request.json()
        //I discoverd that the weather is in kelvin so i wrote a function to convert it to celsius
        function toCelsius(){
            return (data.weather-273.15).toFixed(2)
        }
        city.innerHTML = `City: ${data.city}`
        date.innerHTML = `Date: ${newDate}`;
        weather.innerHTML = `Current Weather: ${toCelsius()}°C`;
        feel.innerHTML = `Current Mood: ${mood}`
    }catch(err){
        console.log(err)
    }

}
