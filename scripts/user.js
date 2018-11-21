window.onload = function () {
    var createUserBtn = document.getElementById('button-createUser-index');
    var signUpBtn = document.getElementById('label-index-create');
    var signInBtn = document.getElementById('button-index-signin');

    createUserBtn.addEventListener('click', () => {
        let inputs = document.getElementById('div-create-index').getElementsByTagName('input');

        var firstName = inputs[0].value.toLowerCase();
        var lastName = inputs[1].value.toLowerCase();
        var userEmail = inputs[2].value.toLowerCase();
        var userName = inputs[3].value;
        var userPassword = inputs[4].value;

        if (firstName == '' || lastName == '') {
            this.alert('Please provide your full name.');
        }
        else if (userEmail == '' || validateEmail(userEmail) == false) {
            this.alert('Email address empty or invalid.');
        }
        else if (userPassword.length < 6) {
            this.alert('password must be 6 or more characters in length.');
        }
        else {
            let user = {
                "firstName": firstName,
                "lastName": lastName,
                "email": userEmail,
                "password": userPassword
            }
            createUser(user).then(data => {
                user.uid = data.name;
                updateUser(data.name, 2,user);
                console.log(data.name);
            }).catch(function (e) {
                console.log(e);
            });
            
            // let uURL = formatURLforItemByField('users', '', userName);
            // let uURL = formatURLforItemById('users', userName);

            // readCRUD(uURL).then(data => {
            //     if (!Array.isArray(data) || !data.length) {
            //         console.log(data);
            //         createUser(user);
            //     }
            //     else {
            //         alert("A user with that user name already exists")
            //         console.log(data);
            //     }
            // }).catch(function (e) {
            //     console.log(e);
            // });
        }
    });

    signUpBtn.addEventListener('click', () => {
        document.getElementById('div-create-index').setAttribute('style', 'visibility : visible');
    });

    signInBtn.addEventListener('click', () => {
        let inputs = document.getElementById('div-index').getElementsByTagName('input');

        var userEmail = inputs[0].value.toLowerCase();
        var userPassword = inputs[1].value.toLocaleLowerCase();
        
        if (userEmail == '' || validateEmail(userEmail) == false) {
            this.alert('Email address empty or invalid.');
        }
        else if (userPassword.length < 6) {
            this.alert('password must be 6 or more characters in length.');
        }
        else {
            let uURL = formatURLforItemByField('users', 'email', userEmail);

            readCRUD(uURL).then(data => {
                if (typeof(data) != 'object' || data == {}) {
                    // console.log(data);
                    alert('no user account for this email exists');
                }
                else {
                    let k;
                    for (var key in data) {
                        k = key;
                    };
                    if(userPassword == data[k].password){
                        alert('welcome back ' + data[k].firstName);
                        window.location = '/collection.html';
                    }
                    else {
                        alert('password or email does not match');
                    }
                    // console.log(data);
                }
            }).catch(function (e) {
                console.log(e);
            });
        }
    });
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
