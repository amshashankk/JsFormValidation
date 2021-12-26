const NameEnter = document.querySelector('#fname');
const EmailEnter = document.querySelector('#email');
const PhoneEnter = document.querySelector("#phone");
const DateEnter = document.querySelector('#date');
const PasswordEnter = document.querySelector('#password');
const ConfirmPasswordEnter = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;



// Checking Valid Name  ----------------------------------------- //

const isNameValid = (fname) => {
    const re = /^[a-z A-Z]{3,25}$/;
    return re.test(fname);
};

const checkfname = () => {
    let valid = false;

    const fname = NameEnter.value.trim();
    if (!isRequired(fname)) {
        showError(NameEnter, 'Name cannot be blank.');
    } else if (!isNameValid(fname)) {
        showError(NameEnter, `Name must be between 3 and 25 characters.`);
    } else {
        showSuccess(NameEnter);
        valid = true;
    }
    return valid;
};


// Checking Valid Email  ----------------------------------------- //

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkEmail = () => {
    let valid = false;
    const email = EmailEnter.value.trim();
    if (!isRequired(email)) {
        showError(EmailEnter, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(EmailEnter, 'Email is not valid.')
    } else {
        showSuccess(EmailEnter);
        valid = true;
    }
    return valid;
};



// Checking Valid Phone  ----------------------------------------- //

const isPhoneValid = (phone) => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
};

const checkPhone = () => {
    let valid = false;
    const min = 10, max = 10;
    const phone = PhoneEnter.value.trim();
    if (!isRequired(phone)) {
        showError(PhoneEnter, 'Phone cannot be blank.');
    } else if (!isPhoneValid(phone, min, max)) {
        showError(PhoneEnter, 'Phone number must be 10 digits.');
    } else {
        showSuccess(PhoneEnter);
        valid = true;
    }
    return valid;
};


// Checking Valid Date  In Development ----------------------------------------- //

const checkDate = () => {
    let valid = false;
    const Today = new Date();

    const year = Today.getFullYear();
    const date = DateEnter.value.trim();
    age.innerHTML = year - parseInt(date.split("-")[0]);


    if (date == null || date == "") {
        showError(DateEnter, 'Please enter the date');
    } else {
        if (age.innerHTML >= 18) {
            showSuccess(DateEnter);
            valid = true;
        } else {
            showError(DateEnter, 'You must be 18 years old to register');
        }
    }
    return valid;
}


// Select Country ----------------------------------------- //

var CountryObject = {
    "India": {
        "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
        "Uttar Pradesh": ["Noida", "Gaziabaad", "Prayagraj", "Lucknow", "Varanasi"],
        "Maharashtra": ["Mumbai", "Nagpur", "Pune", "Nashik", "Amravati"],
        "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Ujjain"]
    },
    "Australia": {
        "Queensland": ["Brisbane", "Cairns", "Gold Cost", "Rockahampton"],
        "Victoria": ["Melbourne", "Bendigo", "Geelong"],
        "Western Australia": ["Perth", "Albany", "Geraldton"],
        "South Wales": ["Sydney", "Newcastle", "Orange"],
    },
    "USA": {
        "California": ["Los Angels", "San Diego", "San Francisco", "Mountain View"],
        "Texas": ["Hutson", "Autin", "Dallas", "San Antonio"],
        "Washington": ["Seatle", "Olympia", "Vancouver", "Tacoma"],
    },
};

function CountrySelection() {
    var CountrySelect = document.getElementById("CountrySelect"),
        StateSelect = document.getElementById("StateSelect"),
        CitySelect = document.getElementById("CitySelect");
    for (var country in CountryObject) {
        CountrySelect.options[CountrySelect.options.length] = new Option(country, country);
    }
    CountrySelect.onchange = function () {
        StateSelect.length = 1;
        CitySelect.length = 1;
        if (this.selectedIndex < 1) return;
        for (var state in CountryObject[this.value]) {
            StateSelect.options[StateSelect.options.length] = new Option(state, state);
        }
    }
    CountrySelect.onchange();
    StateSelect.onchange = function () {
        CitySelect.length = 1;
        if (this.selectedIndex < 1) return;
        var district = CountryObject[CountrySelect.value][this.value];
        for (var i = 0; i < district.length; i++) {
            CitySelect.options[CitySelect.options.length] = new Option(district[i], district[i]);
        }
    }
}

CountrySelection();




// Checking Valid Password  ----------------------------------------- //

const checkPassword = () => {

    document.getElementById("password-text");
    let valid = false;

    const password = PasswordEnter.value.trim();
    if (password.length == 0) {
        password_strength.innerHTML = "";
        return;
    }

    if (!isRequired(password)) {
        showError(PasswordEnter, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(PasswordEnter, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(PasswordEnter);
        valid = true;
    }

    return valid;
};


// Checking Valid Confirm Password  ----------------------------------------- //

const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = ConfirmPasswordEnter.value.trim();
    const password = PasswordEnter.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(ConfirmPasswordEnter, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(ConfirmPasswordEnter, 'The password does not match');
    } else {
        showSuccess(ConfirmPasswordEnter);
        valid = true;
    }

    return valid;
};

// Password Progress Bar ----------------------------------------- //

var password = document.getElementById("password");
password.addEventListener('keyup', function () {

    var pass = password.value;

    if (pass.length === 0) {
        document.getElementById("progresslable").innerHTML = "";
        document.getElementById("progress").value = "0";
        return;
    }


    var p = [/[a-z]/, /[A-Z]/, /[0-9]/, /[!_@#$%^&*]/].reduce((m, t) => m + t.test(pass), 0);

    if (p  > 2 && pass.length > 7) {
        p++;
    }

    var progress = "";
    var strength = "";

    switch (p) {
        case 0:  
        progress = "0";
        strength = "weak"; 
        break;
    case 1:
        progress = "10";
        strength = "weak";
        break;
    case 2:
        strength = "weak";
        progress = "25";
        break;
    case 3:
        strength = "medium";
        progress = "50"; 
        break;
    case 4:
        strength = "medium";
        progress = "75";
        break;
    case 5:
        strength = "Good";
        progress = "100";
        break;
}

    document.getElementById("progresslable").innerHTML = strength;
    document.getElementById("progress").value = progress;
});




// Show Error Message ----------------------------------------- //

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};


// Show Success Message ----------------------------------------- //

const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}


// Event Listeners ----------------------------------------- //

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isNameValid = checkfname(),
        isEmailValid = checkEmail(),
        isPhoneValid = checkPhone(),
        isDateValid = checkDate(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isDateValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fname':
            checkfname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
            break;
        case 'date':
            checkDate();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));



// Show Submitted details ----------------------------------------- //


function PreviewDetails() {
    checkfname();
    checkEmail();
    checkPhone();
    checkDate();
    CountrySelection();
    checkPassword();
    checkConfirmPassword();


    if (checkfname() == true && checkEmail() == true && checkPhone() == true && datevalidate() == true && CountrySelection() == true && checkPassword() == true && checkConfirmPassword() == true) {

        var name = document.getElementById("fname").value;
        document.getElementById("showName").innerHTML = NameEnter;

        var email = document.getElementById("email").value;
        document.getElementById("ShowEmail").innerHTML = EmailEnter;

        var phoneno = document.getElementById("phone").value;
        document.getElementById("ShowMyphoneno").innerHTML = PhoneEnter;

        var age = document.getElementById("age").value;
        document.getElementById("showage").innerHTML = age;

        var country = document.getElementById("CountrySelect").value;
        document.getElementById("showcountry").innerHTML = country;

        document.getElementById("submitmessage").innerHTML = "";

    } else {
        document.getElementById("showName").innerHTML = "";
        document.getElementById("ShowEmail").innerHTML = "";
        document.getElementById("ShowMyphoneno").innerHTML = "";
        document.getElementById("showage").innerHTML = "";
        document.getElementById("showCountry").innerHTML = "";
        document.getElementById("submitmessage").innerHTML = "all field is required"
        document.getElementById("submitmessage").style.color = "#FF0000";

    }

}
