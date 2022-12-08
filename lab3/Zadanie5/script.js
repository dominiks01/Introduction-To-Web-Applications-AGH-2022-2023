var points = 0;
var propagation = false;
var reversedOrder = false;

var logContainer = document.getElementById("log");

var firstElement = document.getElementById("firstCircle");
var secondElement = document.getElementById("secondCircle");
var thirdElement = document.getElementById("thirdCircle");

function resetAll() {
    changePoints(0);
    propagation = false;
    document.getElementById("start/StopPropagation").innerText = "Start Propagation";
    document.getElementById("thirdCircle").classList.remove("disabled")
    document.getElementById("secondCircle").classList.remove("disabled");
    logContainer.innerHTML = "";

    firstElement.removeEventListener("click", kwa1, reversedOrder);
    secondElement.removeEventListener("click", kwa2, reversedOrder);
    thirdElement.removeEventListener("click", kwa3, reversedOrder);

    reversedOrder = false;

    firstElement.addEventListener("click", kwa1 = () => {
        handleClick("firstCircle");
    }, reversedOrder);

    secondElement.addEventListener("click", kwa2 = () => {
        handleClick("secondCircle");
    }, reversedOrder);

    thirdElement.addEventListener("click", kwa3 = () => {
        handleClick("thirdCircle");
    }, reversedOrder);

}

function printLog(logInfo) {
    var newElement = document.createElement("p");
    var nodeText = document.createTextNode(logInfo)
    newElement.appendChild(nodeText);
    logContainer.appendChild(newElement);
}

function redClick() {
    if (points >= 30)
        return;
    changePoints(points + 2);
    printLog("nacisnąłeś czerwony o wartości 2")
}

function yellowClick() {
    if (points >= 50)
        return;
    changePoints(points + 5);
    printLog("nacisnąłeś żółty o wartości 5")
}

function whiteClick() {
    changePoints(points + 1);
    printLog("nacisnąłeś niebieski o wartości 1")
}

function handleClick(id) {

    if (!propagation)
        this.event.stopPropagation();

    switch (id) {
        case "secondCircle":
            redClick();
            break;

        case "firstCircle":
            whiteClick();
            break;

        case "thirdCircle":
            yellowClick();
            break;
    }

    if (points >= 30)
        document.getElementById("secondCircle").classList.add("disabled");

    if (points >= 50)
        document.getElementById("thirdCircle").classList.add("disabled")

}

firstElement.addEventListener("click", kwa1 = () => {
    handleClick("firstCircle");
}, reversedOrder);

secondElement.addEventListener("click", kwa2 = () => {
    handleClick("secondCircle");
}, reversedOrder);

thirdElement.addEventListener("click", kwa3 = () => {
    handleClick("thirdCircle");
}, reversedOrder);


function changePropagationStatus() {
    var element = document.getElementById("start/StopPropagation");
    element.innerText == "Stop Propagation" ?
        element.innerText = "Start Propagation" :
        element.innerText = "Stop Propagation";
}

function changePropagation() {
    this.propagation = !propagation;
    changePropagationStatus();
}


function changeBubbleOrder() {
    firstElement.removeEventListener("click", kwa1, reversedOrder);
    secondElement.removeEventListener("click", kwa2, reversedOrder);
    thirdElement.removeEventListener("click", kwa3, reversedOrder);

    reversedOrder = (reversedOrder == true) ? false : true;

    firstElement.addEventListener("click", kwa1 = () => {
        handleClick("firstCircle");
    }, reversedOrder);

    secondElement.addEventListener("click", kwa2 = () => {
        handleClick("secondCircle");
    }, reversedOrder);

    thirdElement.addEventListener("click", kwa3 = () => {
        handleClick("thirdCircle");
    }, reversedOrder);
}

document.getElementById("start/StopPropagation").addEventListener("click", () => {
    changePropagation();
});

document.getElementById("changeOrder").addEventListener("click", () => {
    changeBubbleOrder();
})

document.getElementById("resetAll").addEventListener("click", () => {
    resetAll();
});

function changePoints(newPoints) {
    document.querySelector(".gameScore p").innerHTML = newPoints;
    this.points = newPoints;
}