let countdownItem = document.getElementById("countdown");
let countdownContainerItem = document.getElementById("countdown-container");

const isOpenClass = "is-open";
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1uaD3WagQYZu2Ho0GE9Sh0-gl5ZVFG0LabC4RZh1olQQ/edit?usp=sharing';

let endDate;

let interval = setInterval(updateTime, 1000);

function updateTime() {
    let now = moment();

    let date = endDate.clone();

    let days = date.diff(now, 'days');
    date = date.subtract(days, 'days');

    let hours = date.diff(now, 'hours');
    date = date.subtract(hours, 'hours');

    let minutes = date.diff(now, 'minutes');
    date = date.subtract(minutes, 'minutes');

    let seconds = date.diff(now, 'seconds');

    countdownItem.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (endDate.diff(now, 'seconds') < 0) {
        clearInterval(interval);
        countdownItem.innerHTML = "0d 0h 0m 0s";
    }
}

function initTableTop() {
    Tabletop.init({
        key: publicSpreadsheetUrl,
        callback: onGetDataFromSpreadsheet
    })
}

function onGetDataFromSpreadsheet(data) {
    let vacationData = data.vacation.all();

    if (vacationData && vacationData.length > 0) {
        let firstVacationData = vacationData[0];

        endDate = moment(firstVacationData.date);

        countdownContainerItem.classList.remove("hidden");

        updateTime();
    }
}

window.addEventListener('DOMContentLoaded', initTableTop)