

// /* Navbar dropdown */

// document.addEventListener('DOMContentLoaded', () => {

//   // Get all "navbar-burger" elements
//   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

//   // Add a click event on each of them
//   $navbarBurgers.forEach( el => {
//     el.addEventListener('click', () => {

//       // Get the target from the "data-target" attribute
//       const target = el.dataset.target;
//       const $target = document.getElementById(target);

//       // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//       el.classList.toggle('is-active');
//       $target.classList.toggle('is-active');

//     });
//   });

// });

// let dataDesdeTimestamp = new Date(1672531200000); //
// Milisegundos
// console.log(dataDesdeTimestamp); // Data correspondente



// API OpenWeatherMaps

const API_KEY = "e8b6b990d5b807959d6d49453a1dd0d1"

// Obter parámetros da URL
const params = new URLSearchParams(window.location.search);
const lat = params.get('lat');
const lon = params.get('lon');

if (lat && lon) {
  actualizarDatosActual(lat, lon);
} else {
  // Usar valores por defecto para Vilagarcía de Arousa
  actualizarDatosActual(42.61, -8.79);
}

//Obter datos do tempo

async function obterDatosTempo(lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=gl`
  try {
    const response = await fetch(apiURL);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos del clima:",
      error);
  }
}

console.log(obterDatosTempo(42.61, -8.79))

async function actualizarDatosActual(lat, lon) {

  const data = await obterDatosTempo(lat, lon);

  if (data) {
    document.getElementById("weatherTemperature").innerHTML = `${Math.round(data.main.temp)}ºC`;
    document.getElementById("weatherIcon").src = `./assets/iconos/${data.weather[0].icon}.png`;
    document.getElementById("feellike").innerHTML = `${Math.round(data.main.feels_like)}ºC`;
    document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
    document.getElementById("tempMax").innerHTML = `${Math.round(data.main.temp_max)}ºC`;
    document.getElementById("tempMin").innerHTML = `${Math.round(data.main.temp_min)}ºC`;
    document.getElementById("location").innerHTML = `${data.name}`;
    document.getElementById("description").innerHTML = `${(data.weather[0].description).toUpperCase()}`;
    document.getElementById("pressure").innerHTML = `${data.main.pressure} hPa`;
    document.getElementById("wind").innerHTML = `${data.wind.speed} m/s`;

    //Data actual

   const dataActualTimeStamp = data.dt * 1000;

    const dataActual = new Date(dataActualTimeStamp);

    console.log(dataActual)
/*  
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    document.getElementById("data").textContent = dataActual.toLocaleDateString("es-ES", options);
 */
  //Data semana en galego

    //Día da semana
    const diasSemana = ["Domingo","Luns","Martes","Mércores","Xoves","Venres","Sábado"]
    const dataDia = dataActual.getDay();
    console.log(dataDia)

    const diaSemanaActual = diasSemana[dataDia];
    console.log(diaSemanaActual);

    //Día del mes
    const diaMes = dataActual.getDate();
    console.log(diaMes);

    //Mes do ano
    const meses = ["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro"]
    const dataMes = dataActual.getMonth();
    console.log(dataMes);

    const mesActual = meses[dataMes]
    console.log(mesActual);

    //Ano
    const dataAno = dataActual.getFullYear()
    console.log(dataAno);

    //Data formateada completa
    document.getElementById("data").textContent = `${diaSemanaActual}, ${diaMes} de ${mesActual} de ${dataAno}`;



    //Amancer
    const timestampAmancer = data.sys.sunrise * 1000;

    const dataAmancer = new Date(timestampAmancer);

    const horaAmancer = dataAmancer.getHours().toString().padStart(2, "0");
    const minutosAmancer = dataAmancer.getMinutes().toString().padStart(2, "0");

    const horaAmancerFormateada = `${horaAmancer}:${minutosAmancer} AM`;

    document.getElementById("amancer").innerHTML = horaAmancerFormateada;

    //Solpor
    const timestampSolpor = data.sys.sunset * 1000;

    const dataSolpor = new Date(timestampSolpor);

    const horaSolpor = dataSolpor.getHours().toString().padStart(2, "0");
    const minutosSolpor = dataSolpor.getMinutes().toString().padStart(2, "0");

    const horaSolporFormateada = `${horaSolpor}:${minutosSolpor} PM`

    document.getElementById("solpor").innerHTML = horaSolporFormateada;

    //Cambiar fondo

    function cambiarColorDeFondo() {
      const agora = new Date();

      let claseFondo;
      if (agora >= dataAmancer && agora < dataSolpor) {
        claseFondo = 'fondo-dia';
      } else {
        claseFondo = 'fondo-noite';
      }

      document.body.className = '';
      document.body.classList.add(claseFondo);
    }

    cambiarColorDeFondo();
  }

}













async function obtenerDatos(lat, lon) {
    const APIKEY = "cb8c1c153c89d9e217d9da24808638c6";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=gl&units=metric&appid=${APIKEY}`;
    
    try{ 
    const response = await fetch(apiUrl);
    return await response.json();
   } catch (error) {
    console.error("Non hai datos metereolóxicos,error")
    } 
}


async function actualizarDatos(lat, lon) {
const data = await obtenerDatos(lat, lon);
console.log(data)
if (data) {
document.getElementById("WeaterToday").textContent = data.weather[0].description;
document.getElementById("iconWeather").src = `./assets/iconos/${data.weather[0].icon}.png`;
document.getElementById("temperatureToday").textContent = `${Math.round(data.main.temp)}ºC`;
document.getElementById("tempMax").textContent = `${Math.round(data.main.temp_max)}ºC`;
document.getElementById("tempMin").textContent = `${Math.round(data.main.temp_min)}ºC`;
document.getElementById("feelsLike").textContent = `${Math.round(data.main.feels_like)}ºC`;
document.getElementById("humidity").textContent = `${data.main.humidity}%`;

}

}


// actualizarDatos(42.61, -8.79);


async function obtenerPronostico(lat, lon) {
const URL_API_FORECAST =`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=gl`

try{ 
const response = await fetch(URL_API_FORECAST);
return await response.json();
} catch (error) {
    console.error("Error ao obter datos do pronostico do clima",error)
    } 
}

async function actualizarPronostico(lat, lon) {
  const dataPronostico = await obtenerPronostico(lat, lon);
  // if(dataPronostico)
    
    const template = document.getElementById("forecastTemplate");
    
    // const containerForecast = document.getElementById("forecastContainer");
    const containerForecast = document.querySelector("#forecastContainer");
    containerForecast.innerHTML = "";
      dataPronostico.list.forEach(element => {
  
    const clone = template.content.cloneNode(true);

     const fecha = new Date(element.dt * 1000);
    const hora = fecha.getHours().toString().padStart(2, "0");

    clone.querySelector('#date').textContent = `${hora}:00`;
    clone.querySelector('.weatherIcon').src = `./assets/iconos/${element.weather[0].icon}.png`;
    clone.querySelector('.weatherIcon').alt = element.weather[0].description;
    clone.querySelector('.temperatura').textContent = `${Math.round(element.main.temp)}ºC`;
   
    containerForecast.appendChild(clone);



});
  
}
document.addEventListener("DOMContentLoaded", () => {
  actualizarPronostico(42.61, -8.79);
});