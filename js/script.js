const lengthSlider = document.querySelector(".pass_lenght input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input_box span"),
passwordInput = document.querySelector(".input_box input"),
passwordIndicator = document.querySelector(".pass_indicator"),
generateBtn = document.querySelector(".generator_btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => { // looping through option's checkbox
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false;
    passLength = lengthSlider.value;
    options.forEach(option => {
        if(option.checked) { // if checkbox id checked
            // if checkbox id isn't exc-duplicate && spaces
            if(option.id !== "exc-duplicate" && option.id !== "space") {
                // adding particular key value from character object to staticPassword
                staticPassword += characters[option.id];
            }else if(option.id === "space") { // if checkbox id is spaces
                staticPassword += ` ${staticPassword}`; // adding space at the beginning & end of staticPassword
            }else { // else pass true value to exccludeDuplicate
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) { // if excludeDuplicate is true
            //if randomPassword dosn't contains the currect random character or randomChar is equal
            // to space " " then add random character to randomPassword else decrement i by -1
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }else {
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword; // passing randomPasswored to passwordInput 
}
const updatePassIndicator = () => { // if lengthSlider value is less than 8 then pass "weak" as passwordIndicator id else if lengthSlider
    // value is less than 16 then pass "medium" as  id else pass "strong" as id
    passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong"
}
const updateSlider = () => {
    // passing slider value as counter text
    document.querySelector(".pass_lenght span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); //coping random password
    copyIcon.innerText = "check";  // changing copy icon to tick
    setTimeout(() => { // after 1500 ms, chaging tick  icon to copy
        copyIcon.innerText = "copy_all";
    },1300);
}


copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);