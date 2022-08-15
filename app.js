// Weather App

// search btn div
const search = document.querySelector('.search');
const cityField = document.querySelector('.cityname');
const locationBtn = document.querySelector('.location');
let inputInfo = document.querySelector('.input-info');
let weatherBox = document.querySelector('.weather-box')
let api;
const apiKey = '53c03854e39054af6b3f5c23102588dd';

search.addEventListener('click', (e)=>{
    if(cityField.value != ''){
        requestApi(cityField.value);
    }
})
cityField.addEventListener('keyup', (e)=>{
    if(e.key == 'Enter' && cityField.value != ''){
        requestApi(cityField.value);
    }
})

// location
locationBtn.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)

    }else{
        alert('Your browser doesnot support getlocation api')
    }
})

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fetchData()
    
}
function onError(error){
    inputInfo.innerText = error.message
}

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fetchData()
}
function fetchData(){
    fetch(api)
    .then((response)=>response.json())
    .then((result)=>weatherDetails(result))
    cityField.value = '';
    
}

function weatherDetails(data){
    if(data.cod == "404"){
        inputInfo.innerText = `${cityField.value} is not a valid city name`;
        inputInfo.classList.add('error');
    }else{
        inputInfo.classList.remove('error')
        const city = data.name;
        const country = data.sys.country;
        const visibility = data.visibility;
        const {temp,feels_like, humidity} = data.main;
        const{description, id, icon} = data.weather[0];
        const windSpeed = data.wind.speed
        

        // adding to HTML
        document.querySelector('.city-name').innerText = `${city}, ${country}`;
        document.querySelector('.temp').innerText = Math.floor(temp)+'°C';
        document.querySelector('.desc').innerText = `${description}`;
        document.querySelector('.feels-like').innerText = 'feels like ' + Math.floor(feels_like)+'°C';
        document.querySelector('.humidity').innerText = `${humidity}%`;
        document.querySelector('.visibility').innerText = `${visibility}%`;
        document.querySelector('.wind').innerText = `${windSpeed} km/h`;
        document.querySelector('.weather-icon').src =  `http://openweathermap.org/img/wn/${icon}@2x.png`;

        weatherBox.classList.add('active');


    }
    
}

// http://openweathermap.org/img/wn/10d@2x.png
