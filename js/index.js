let user_count = 'NA';
let req_count = 'NA';
let rep_count = 'NA';

let emailValidity = false;
let emailValue = null;

pageRefresher();

function getUserNumber() {

    fetch('https://stats.ayushpriya.tech/user_count ', {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Accept": "application/json"
        },
    })
        .then((response) => response.json())
        .then((data) => {
            user_count = data;
            updateUserNumber();
            getRequestNumber();
        })

}

function getRequestNumber(){
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
            getReportNumber();
            updateRequestNumber();
        })
}

function getReportNumber(){
    fetch('https://stats.ayushpriya.tech/rep_count ', {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Accept": "application/json"
        },
    })
        .then((response) => response.json())
        .then((result) => {
            rep_count = result;
            updateReportNumber();
        })
}

function updateUserNumber() {
    document.getElementById('user-number').innerHTML = user_count;
}

function updateRequestNumber() {
    document.getElementById('request-number').innerHTML = req_count;
}

function updateReportNumber() {
    document.getElementById('report-number').innerHTML = rep_count;
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
                    getAllRequestsForUser(data);
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

document.getElementById('reports').addEventListener('click', ()=>{
    getAllReports();
})

function getAllReports(){


    fetch('https://stats.ayushpriya.tech/user/reported', {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Accept": "application/json"
        },
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })

}

function closeModal(){
    document.getElementById('requests-modal').style.display = 'none';
    document.getElementById('tint').style.display = 'none';
    document.getElementById('requests-modal').innerHTML = '';
}

function getAllRequestsForUser(email){
    fetch('https://stats.ayushpriya.tech/reqs/' + email , {
        method: 'GET',
        crossDomain: true,
        headers: {
            "Accept": "application/json"
        },
    })
        .then((response) => response.json())
        .then((result) => {
            result = result.results;
            document.getElementById('requests-modal').style.display = 'block';
            document.getElementById('tint').style.display = 'block';
            for(var i=0;i<result.length;i++){
                let information = document.getElementById('requests-modal').innerHTML;
                document.getElementById('requests-modal').innerHTML = information + '<div class="request-card"><p class="item">' + result[i][2] + ' | <b>' + result[i][3] + '</b></p><p class="item-description">' + result[i][7] + '</p><p class="posting-date">' + result[i][4] + '</p></div>';
            }
            let information = document.getElementById('requests-modal').innerHTML;
            document.getElementById('requests-modal').innerHTML = information + '<button id="close" onClick="closeModal();">Close</button>'
        })
}


function pageRefresher(){

    getUserNumber();
    
    setTimeout(()=>{
        pageRefresher()
    }, 5000);
}