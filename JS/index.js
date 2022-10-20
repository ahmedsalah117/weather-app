const findInput = document.querySelector("#find-input");
const leftSec = document.getElementById("left-sec");
const midSec = document.getElementById("mid-sec");
const rightSec = document.getElementById("right-sec");
const findBtn = document.querySelector("#find-btn");
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

let dateNow = new Date();
let actualData;

/**
 I need to hold the following:

 1- The day.
 2- The date.
 3- The city name.
 4- the temp in deg .
 5- the icon .
 6- the weather description.
 
 */

(async function () {
  await getData("Cairo");
  showLeftSec();
  showMidSec();
  showRightSec();
})();

function showLeftSec() {
  let leftData = `<div class="position-absolute top-0 date-div py-2 w-100 px-3">

  <span>
                ${daysOfWeek[dateNow.getDay()]}
                <span class="position-absolute">${actualData.location.localtime.slice(
                  0,
                  10
                )}</span>
              </span>







</div>
<div class="ps-4">
  <p class="mt-3">${actualData.location.name}</p>
  <div class="text-center">
    <span class="deg-font">${actualData.current.temp_c}&#176;C</span>
    <img src="https:${actualData.current.condition.icon}" class="w-25" />
  </div>
  <p class="text-primary">${actualData.current.condition.text}</p>
  <span class="me-3 pt-4"
                ><img src="images/icon-umberella.png" /> ${
                  actualData.current.humidity
                }%</span
              >
              <span class="me-3"
                ><img src="images/icon-wind.png" /> ${
                  actualData.current.wind_kph
                } km/h</span
              >
              <span><img src="images/icon-compass.png" /> ${
                actualData.current.wind_dir
              }</span>
</div>`;

  leftSec.innerHTML = leftData;
}

function showMidSec() {
  let midData = `<div
class="position-absolute top-0 py-2 date-div w-100 px-3 text-center"
>
<span>${daysOfWeek[dateNow.getDay() + 1]}</span>
</div>
<div class="text-center">
<img src="https:${
    actualData.forecast.forecastday[1].day.condition.icon
  }" class="mt-4"/>
<p class="fs-4 fw-bold mt-2 mb-0">${
    actualData.forecast.forecastday[1].day.maxtemp_c
  }&#176;C</p>
<p>${actualData.forecast.forecastday[1].day.mintemp_c}&#176;C</p>
<p class="text-primary">${
    actualData.forecast.forecastday[1].day.condition.text
  }</p>
</div>`;

  midSec.innerHTML = midData;
}

function showRightSec() {
  let rightData = `<div
class="position-absolute top-0 py-2 date-div w-100 px-3 text-center"
>
<span>${daysOfWeek[dateNow.getDay() + 2]}</span>
</div>
<div class="text-center">
<img src="https:${
    actualData.forecast.forecastday[2].day.condition.icon
  }" class="mt-4"/>
<p class="fs-4 fw-bold mt-2 mb-0">${
    actualData.forecast.forecastday[2].day.maxtemp_c
  }&#176;C</p>
<p>${actualData.forecast.forecastday[2].day.mintemp_c}&#176;C</p>
<p class="text-primary">${
    actualData.forecast.forecastday[2].day.condition.text
  }</p>
</div>`;

  rightSec.innerHTML = rightData;
}

async function getData(city) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=81c69e8bc0c94bfab1d151740221610&q=${city}&days=3&aqi=yes&alerts=no`
  );

  actualData = await response.json();

  console.log(actualData);
  // console.log(actualData.location.name); //city name
  // console.log(actualData.location.localtime.slice(0, 9)); //date and time
  // console.log(actualData.current.temp_c); //deg
  // console.log(actualData.current.condition.icon); //icon
  // console.log(actualData.current.condition.text); //desc
}

findInput.addEventListener("keydown", async () => {
  await getData(findInput.value);
  showLeftSec();
  showMidSec();
  showRightSec();
});

findBtn.addEventListener("click", async () => {
  await getData(findInput.value);
  showLeftSec();
  showMidSec();
  showRightSec();
});
