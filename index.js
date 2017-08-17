var TIMEOUT_IN_SECS = 3 * 60

var TEMPLATE = '\
<style> .timer {\
    line-height: 1.5; \
    position: absolute; \
    font-family: \'Open Sans\', sans-serif;  \
    font-size: 35px; \
    text-align: center; \
    width: 150px; \
    border: 3px solid black; \
    border-radius: 6px; \
    letter-spacing: 5px; \
    margin: 25px auto auto 25px; \
    color: black; \
    background-color: rgba(255,255,255,0.5); }\
</style>\
<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">\
<h1 class="timer" id="timer" style="z-index: 300;">\
    <span id="timer-minutes">00</span>\
    <span id="timer-divider">:</span>\
    <span id="timer-seconds">00</span>\
</h1>'

var messages = ['Делу время- потехе час.', 
                'Иди назад работай!',
                'А теперь пора вернуться к делам!', 
                'Ты сейчас занят чем-то действительно важным?',
                'Выполни работу раньше дедлайна, а не как тогда.',
                'Прекрати прокрастинировать. Это не отдых, а бегство от работы.', 
                'Займись делами, время пришло.', 
                'Хватит тратить свое время на эту ерунду.', 
                'Ушедшее время это одна из немногих вещей, которую невозможно вернуть.', 
                'Ты доволен своей работой сегодя?', 
                'Ты бы мог сказать, что сегодня ты отлично поработал?', 
                'Почитал? А теперь- работать!', 
                'Прекрати заниматься чепухой.', 
                'Возвращайся к делам.', 
                'Кончай залипать.', 
                'Вперед и с песней!', 
                'А теперь за работу!']


var timerContainer = document.createElement('div')
timerContainer.setAttribute("style", "height: 110px; position:fixed; top:0px; z-index:500; ")
var bodyTag = document.body
bodyTag.insertBefore(timerContainer, bodyTag.firstChild)
timerContainer.innerHTML = TEMPLATE

function getTimestampInSecs() {
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds / 1000)
}

function getHalfSecs() {
    var timestampInMilliseconds = new Date().getTime()
    return Math.round(timestampInMilliseconds / 500) % 2
}

function padZero(number) {
    return ("00" + String(number)).slice(-2);
}

function getDivider() {
    if (getHalfSecs() == '1') {
        return ':'
    } else {
        return ' '
    }
}

var timestampOnStart = getTimestampInSecs()



function displayTimer() {
    var currentTimestamp = getTimestampInSecs()
    var secsGone = currentTimestamp - timestampOnStart
    var secsLeft = Math.max(TIMEOUT_IN_SECS - secsGone, 0)

    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;
    var divider = getDivider(getHalfSecs);

    document.getElementById('timer-minutes').innerHTML = padZero(minutes)
    document.getElementById('timer-divider').innerHTML = getDivider(getHalfSecs)
    document.getElementById('timer-seconds').innerHTML = padZero(seconds)

    highLightTimer(secsLeft, 15)
}

function highLightTimer(timeLeft, timeToActivate) {

    var element = document.getElementById("timer");

    if (timeLeft < timeToActivate) {
        element.style.backgroundColor = "rgba(255,0,0,0.8)";
        element.style.color = "white";
        element.style.borderColor = "rgba(255,0,0,0.8)";

    } else {
        element.style.backgroundColor = "rgba(255,255,255,0.6)";
        element.style.color = "black";
        element.style.borderColor = "black";
    }
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]
}

function getTimedPopup() {
    var currentTimestamp = getTimestampInSecs()
    var secsGone = currentTimestamp - timestampOnStart
    var secsLeft = Math.max(TIMEOUT_IN_SECS - secsGone, 0)
    if (secsLeft === 0) {
        window.alert(getRandomMessage())
    }
}


function main() {
    setInterval(displayTimer, 500)
    setInterval(getTimedPopup, 30 * 1000)
}