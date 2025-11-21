
let labels = document.querySelectorAll("label");
let inputs = document.querySelectorAll("input");
let buttons = document.querySelectorAll("button");
let myHeading = document.querySelector("h1");
let myObj = {};
let myObjects = [];

buttons[0].style.visibility = "hidden";

// Initialize localStorage if it doesn't exist
function initializeStorage() {
    if (!localStorage.getItem("2025Registered")) {
        localStorage.setItem("2025Registered", JSON.stringify([]));
    }
}

initializeStorage();

function register() {
    setItems();

    // Validation checks
    if (String(myObj.first).length < 3 || String(myObj.first).length > 15) {
        window.alert("First Name must be between 3 - 15 characters");
        return;
    }
    else if (String(myObj.last).length < 3 || String(myObj.last).length > 15) {
        window.alert("Last Name must be between 3 - 15 characters");
        return;
    }
    else if (String(myObj.phone).length != 12 || !(String(myObj.phone).startsWith("254"))) {
        window.alert("Phone must start with 254 and must be 12 numbers");
        return;
    }
    else if (!(String(myObj.email).includes("@")) || !(String(myObj.email).includes("."))) {
        window.alert("You must enter valid Email");
        return;
    }
    else if (String(myObj.password).length < 5 || String(myObj.password).length > 15) {
        window.alert("Password must be between 5 - 15 characters");
        return;
    }
    else if (String(myObj.repeat) !== String(myObj.password)) {
        window.alert("The two passwords must be matching");
        return;
    }

    // Check if user already exists
    let oldUsers = JSON.parse(localStorage.getItem("2025Registered"));
    let userExists = false;

    for (let i = 0; i < oldUsers.length; i++) {
        if (oldUsers[i].phone == myObj.phone || oldUsers[i].email == myObj.email) {
            userExists = true;
            break;
        }
    }

    if (userExists) {
        myHeading.textContent = "You are already registered in the system";
        hideElements();
    } else {
        endRegistrationLogic();
    }
}

function endRegistrationLogic() {
    let email = String(myObj.email);
    let midPoint = email.indexOf("@");
    let message = `${email.slice(0, 3)}**********${email.slice(midPoint)}`;
    myHeading.textContent = `${message} Registration is successful`;

    let myUsers = JSON.parse(localStorage.getItem("2025Registered"));
    myUsers.push(myObj);

    localStorage.setItem("2025Registered", JSON.stringify(myUsers));

    hideElements();
}

function setItems() {
    myObj = {
        first: inputs[0].value.trim(),
        last: inputs[1].value.trim(),
        phone: inputs[2].value.trim(),
        email: inputs[3].value.trim(),
        password: inputs[4].value,
        repeat: inputs[5].value
    }
}

// Function to display unique Users
function checkUsers() {
    let myUsers = JSON.parse(localStorage.getItem("2025Registered"));
    
    // If no users exist, return empty array
    if (!myUsers || myUsers.length === 0) {
        return;
    }
    
    const seenEmails = new Set();
    const seenPhones = new Set();
    const uniqueUsers = [];

    myUsers.forEach(user => {
        if (user && user.email && user.phone) {
            const email = user.email.toLowerCase().trim();
            const phone = user.phone.trim();

            if (!seenEmails.has(email) && !seenPhones.has(phone)) {
                seenEmails.add(email);
                seenPhones.add(phone);
                uniqueUsers.push(user);
            }
        }
    });

    localStorage.setItem("2025Registered", JSON.stringify(uniqueUsers));
    console.log(uniqueUsers);
}

function hideElements() {
    buttons[0].style.visibility = "visible";
    buttons[1].style.visibility = "hidden";

    inputs.forEach((element, index) => {
        element.style.visibility = "hidden";
        if (labels[index]) {
            labels[index].style.visibility = "hidden";
        }
    });
}

// Call checkUsers on page load
checkUsers();
