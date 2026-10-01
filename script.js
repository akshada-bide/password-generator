// ===============================
// PASSWORD GENERATOR
// ===============================

const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const generatedPassword = document.getElementById("generated-password");

const lengthInput = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const special = document.getElementById("special");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";


// ===============================
// HELPER FUNCTIONS
// ===============================

function getRandomCharacter(characters) {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);

    const randomIndex = randomArray[0] % characters.length;

    return characters[randomIndex];
}
function shufflePassword(password) {
    const passwordArray = password.split("");

    for (let i = passwordArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [passwordArray[i], passwordArray[randomIndex]] =
            [passwordArray[randomIndex], passwordArray[i]];
    }

    return passwordArray.join("");
}


// ===============================
// PASSWORD GENERATION
// ===============================

generateBtn.addEventListener("click", function () {

    const length = Number(lengthInput.value);

    if (length < 6 || length > 30) {
        alert("Password length must be between 6 and 30.");
        return;
    }

    let characters = "";
    let requiredCharacters = "";

    if (uppercase.checked) {
        characters += uppercaseChars;
        requiredCharacters += getRandomCharacter(uppercaseChars);
    }

    if (lowercase.checked) {
        characters += lowercaseChars;
        requiredCharacters += getRandomCharacter(lowercaseChars);
    }

    if (numbers.checked) {
        characters += numberChars;
        requiredCharacters += getRandomCharacter(numberChars);
    }

    if (special.checked) {
        characters += specialChars;
        requiredCharacters += getRandomCharacter(specialChars);
    }

    if (characters.length === 0) {
        alert("Please select at least one character type.");
        return;
    }

    if (requiredCharacters.length > length) {
        alert("Password length is too short for the selected character types.");
        return;
    }

    let password = requiredCharacters;

    for (let i = requiredCharacters.length; i < length; i++) {
        password += getRandomCharacter(characters);
    }

    password = shufflePassword(password);

    generatedPassword.value = password;

    // Add generated password to history
    addToHistory(password);
});


// ===============================
// COPY PASSWORD
// ===============================

copyBtn.addEventListener("click", function () {

    if (generatedPassword.value === "") {
        copyBtn.textContent = "Generate First";
        return;
    }

    navigator.clipboard.writeText(generatedPassword.value);

    copyBtn.textContent = "Copied!";

    setTimeout(function () {
        copyBtn.textContent = "Copy";
    }, 1500);
});


// ===============================
// PASSWORD STRENGTH CHECKER
// ===============================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

const strengthMeter = document.getElementById("strength-meter");
const strengthText = document.getElementById("strength-text");

const lengthCheck = document.getElementById("length-check");
const uppercaseCheck = document.getElementById("uppercase-check");
const lowercaseCheck = document.getElementById("lowercase-check");
const numberCheck = document.getElementById("number-check");
const specialCheck = document.getElementById("special-check");


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
        togglePassword.setAttribute("aria-label", "Hide password");
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁️";
        togglePassword.setAttribute("aria-label", "Show password");
    }
});
const copyManualPassword = document.getElementById("copy-manual-password");

copyManualPassword.addEventListener("click", function () {

    if (passwordInput.value === "") {
        copyManualPassword.textContent = "Enter Password";
        return;
    }

    navigator.clipboard.writeText(passwordInput.value);

    copyManualPassword.textContent = "Copied!";

    setTimeout(function () {
        copyManualPassword.textContent = "Copy";
    }, 1500);
});

// ===============================
// CHECK PASSWORD WHILE TYPING
// ===============================

passwordInput.addEventListener("input", function () {

    const password = passwordInput.value;

    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    updateRequirement(lengthCheck, hasLength);
    updateRequirement(uppercaseCheck, hasUppercase);
    updateRequirement(lowercaseCheck, hasLowercase);
    updateRequirement(numberCheck, hasNumber);
    updateRequirement(specialCheck, hasSpecial);

    let score = 0;

    if (hasLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    updateStrength(score, password);
});


// ===============================
// UPDATE REQUIREMENTS
// ===============================

function updateRequirement(element, condition) {

    const text = element.textContent;

    if (condition) {
        element.textContent =
            "✓ " + text.replace("✓ ", "").replace("✗ ", "");

        element.style.color = "green";

    } else {
        element.textContent =
            "✗ " + text.replace("✓ ", "").replace("✗ ", "");

        element.style.color = "red";
    }
}


// ===============================
// UPDATE STRENGTH METER
// ===============================

function updateStrength(score, password) {

    if (password.length === 0) {

        strengthMeter.style.width = "0%";
        strengthMeter.style.backgroundColor = "#e5e7eb";

        strengthText.textContent =
            "Enter a password to check its strength.";

        strengthText.style.color = "#1f2937";

        return;
    }

    if (score <= 2) {

        strengthMeter.style.width = "33%";
        strengthMeter.style.backgroundColor = "#dc2626";

        strengthText.textContent = "Weak Password";
        strengthText.style.color = "#dc2626";

    } else if (score <= 4) {

        strengthMeter.style.width = "66%";
        strengthMeter.style.backgroundColor = "#f59e0b";

        strengthText.textContent = "Medium Password";
        strengthText.style.color = "#f59e0b";

    } else {

        strengthMeter.style.width = "100%";
        strengthMeter.style.backgroundColor = "#16a34a";

        strengthText.textContent = "Strong Password";
        strengthText.style.color = "#16a34a";
    }
}


// ===============================
// PASSWORD HISTORY
// ===============================

const passwordHistory = document.getElementById("password-history");
const clearHistoryBtn = document.getElementById("clear-history");

let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];


// ===============================
// DISPLAY PASSWORD HISTORY
// ===============================

function displayHistory() {

    passwordHistory.innerHTML = "";

    history.forEach(function (password) {

        const listItem = document.createElement("li");

        listItem.textContent = password;

        passwordHistory.appendChild(listItem);
    });
}


// ===============================
// ADD PASSWORD TO HISTORY
// ===============================

function addToHistory(password) {

    history.unshift(password);

    // Keep only the latest 10 passwords
    if (history.length > 10) {
        history.pop();
    }

    localStorage.setItem(
        "passwordHistory",
        JSON.stringify(history)
    );

    displayHistory();
}


// ===============================
// CLEAR PASSWORD HISTORY
// ===============================

clearHistoryBtn.addEventListener("click", function () {

    history = [];

    localStorage.removeItem("passwordHistory");

    displayHistory();
});


// ===============================
// LOAD SAVED HISTORY
// ===============================

displayHistory();