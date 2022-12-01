function myFunction() {
    let info = prompt("Enter your name");
    let infoContent = "Witam ";

    if (info.charAt(info.length - 1) === 'a') {
        infoContent += "Panią: " + info;
    } else {
        infoContent += "Pana: " + info;
    }

    document.getElementById("yourName").innerHTML = infoContent;
}