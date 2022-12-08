function deleteSection() {
    let parent = document.getElementById("placeholder");
    let index = Array.from(parent.children).indexOf(this.parentNode);
    parent.removeChild(parent.children[index]);
}

function addElement() {
    document.getElementById("placeholder");

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phoneNumber").value;

    let section = document.createElement("section");
    section.classList.add('sections');

    let sectionElement = document.createElement('div');
    sectionElement.classList.add('contactInfo');

    let nameInfo = document.createElement('h5');
    let phoneInfo = document.createElement('p');

    nameInfo.textContent = name;
    phoneInfo.textContent = phone;

    sectionElement.appendChild(nameInfo);
    sectionElement.appendChild(phoneInfo);

    section.appendChild(sectionElement);

    let deleteCard = document.createElement('div');

    let icon = document.createElement('i');
    icon.classList.add('gg-trash');

    deleteCard.appendChild(icon);

    deleteCard.classList.add("deleteButton");

    deleteCard.addEventListener('click', deleteSection);
    section.appendChild(deleteCard);

    document.getElementById("placeholder").appendChild(section);
}


function validateForm() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phoneNumber").value;

    phoneToValidate = phone.replace(/ /g, '');

    if (phoneToValidate[0] === '+') {
        const reg = new RegExp('^[+]+[0-9]{12}');
        if (!reg.test(phoneToValidate))
            return;
    } else {
        const reg = new RegExp('^[0-9]{9}');
        if (!reg.test(phoneToValidate))
            return;
    }

    const reg = new RegExp('[A-Z]{1}[a-z ]+[ ]{1}[A-Z]{1}[a-z ]')
    if (!reg.test(name))
        return;

    addElement();
};


document.getElementById("cardButton").addEventListener("click", () => {
    validateForm();
})