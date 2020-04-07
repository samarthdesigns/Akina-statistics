let user_count = null;
let req_count = null;

let emailValidity = false;
let emailValue = null;

getLandingData()

function getLandingData() {

    fetch('https://stats.ayushpriya.tech/user_count ', {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Accept": "application/json"
        },
    })
        .then((response) => response.json())
        .then((result) => {
            user_count = result;
            updateUserNumber();
        })

    fetch('https://stats.ayushpriya.tech/req_count ', {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Accept": "application/json"
        },
    })
        .then((response) => response.json())
        .then((result) => {
            req_count = result;
            updateRequestNumber();
        })

}

function updateUserNumber() {
    document.getElementById('user-number').innerHTML = user_count;
}

function updateRequestNumber() {
    document.getElementById('request-number').innerHTML = req_count;
}

function checkEmail(data) {

    if (emailValidity == true) {
        fetch('https://stats.ayushpriya.tech/user/' + data, {
            method: 'GET',
            crossDomain: true,
            headers: {
                "Accept": "application/json"
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result === 'User does not exist') {
                    document.getElementById('popup').classList.add('error');
                    document.getElementById('popup').innerHTML = "User Does Not Exist";
                    setTimeout(function () {
                        document.getElementById('popup').classList.remove('error');
                    }, 3000);
                }
                else if (result === 'Verified') {
                    document.getElementById('popup').classList.add('success');
                    document.getElementById('popup').innerHTML = "User Is Verified";
                    setTimeout(function () {
                        document.getElementById('popup').classList.remove('success');
                    }, 3000);
                }
                else if (result === 'Unverified') {
                    document.getElementById('popup').classList.add('error');
                    document.getElementById('popup').innerHTML = "User Is Unverified";
                    setTimeout(function () {
                        document.getElementById('popup').classList.remove('error');
                    }, 3000);
                }
                else {
                    document.getElementById('popup').classList.add('error');
                    document.getElementById('popup').innerHTML = "Some Issue On Our End";
                    setTimeout(function () {
                        document.getElementById('popup').classList.remove('error');
                    }, 3000);
                }
            })
            .catch(() => {
                document.getElementById('popup').classList.add('error');
                document.getElementById('popup').innerHTML = "Check Email Field";
                setTimeout(function () {
                    document.getElementById('popup').classList.remove('error');
                }, 3000);
            })
    }
    else {
        document.getElementById('popup').classList.add('error');
        document.getElementById('popup').innerHTML = "Check Email Field";
        setTimeout(function () {
            document.getElementById('popup').classList.remove('error');
        }, 3000);
    }

}


document.getElementById('userCheckForm').addEventListener('submit', (e) => {

    e.preventDefault();

    let user_email = document.getElementById('user-email').value;

    checkEmail(user_email);

});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

document.getElementById('user-email').addEventListener("input", function () {

    emailValue = document.getElementById('user-email').value;

    if (validateEmail(emailValue)) {
        document.getElementById('user-email').classList.remove('text-field-false');
        emailValidity = true;
    }
    else {
        document.getElementById('user-email').classList.add('text-field-false')
        emailValidity = false;
    }

});