/* START OF FIREBASE */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

// import {initializeApp} from  './node_modules/firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
// import { getDatabase, ref, onValue, set, update, child, push, get } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDC4kZ-Ec-jP7dnlFEmvD5rW9bOIXRyT3Q",
    authDomain: "wad2-project-d8ba0.firebaseapp.com",
    projectId: "wad2-project-d8ba0",
    storageBucket: "wad2-project-d8ba0.appspot.com",
    messagingSenderId: "168248515824",
    appId: "1:168248515824:web:bfcb3221af409131e07635",
    databaseURL: "https://wad2-project-d8ba0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* CODE ADDED: START */
// Import the functions needed to read from realtime database

// import { getDatabase, ref, onValue} from "firebase/database";
// connect to the realtime database
const db = getDatabase();

/* CODE ADDED: END  */
/* END OF FIREBASE */

// create variable of user input
var fullname = ''
var username = document.getElementById('usernameLogin');
var password = document.getElementById('passwordLogin');
var usernameInvalidError = document.getElementById('usernameLoginInvalid');
var passwordInvalidError = document.getElementById('passwordLoginInvalid');

import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const database = getDatabase(app);
const auth = getAuth();
var login = document.getElementById('loginBtn')
login?.addEventListener('click', (e) => {
var email = document.getElementById('emailLogin').value
var password = document.getElementById('passwordLogin').value

// get errors here https://firebase.google.com/docs/auth/admin/errors

    // const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.href = "./main.html";
        
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
    });
    
});

  //Check user stat whwether signed in
    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("User is logged in.")
        console.log(uid);
        // console.log(user);
        // ...
    } else {
        // User is signed out
        // ...
        console.log('user signed out');
    }
    });


// Retrieve data from firebase and verify
function findData() {
    // console.log('hi');
    const dbref = ref(db);

    get(child(dbref, "accounts"))
    .then((snapshot) => {
    var info = snapshot.val();
    var keys = Object.keys(info);

    if (username.value.length == 0){
      username.classList = 'form-control is-invalid';
      usernameInvalidError.innerHTML = 'Please enter your username.';
      
    }

    if (password.value.length == 0) {
      password.classList = 'form-control is-invalid';
      passwordInvalidError.innerHTML = 'Please enter your password.';
      return

    } else {
      password.classList = 'form-control';
      passwordInvalidError.innerHTML = '';
      
    }

    for (var i=0; i < keys.length; i++) {
        var k = keys[i];
        var nameDB = info[k].username;
        var passwordDB = info[k].password;
        
        if (username.value === nameDB) {
          username.classList = 'form-control';
          usernameInvalidError.innerHTML = '';
            if (password.value === passwordDB) {
                //k is the unique id to identify users
                document.cookie = `${k}`
                // console.log(k);
                fullname = info[k].firstname + info[k].lastname
                gotomain()
                break;

            } else {
              if (password.value.length > 0) {
                password.classList = 'form-control is-invalid';
                passwordInvalidError.innerHTML = 'The password is incorrect. Please try again.';
                break;
              }
            }
        } else {
            if (username.value.length > 0) {
              username.classList = 'form-control is-invalid';
              usernameInvalidError.innerHTML = 'The username does not exist. Please try again.';
              password.classList = 'form-control';
              passwordInvalidError.innerHTML = '';
            }
        }
    }

    }, function (error) {
        console.log("Error:" + error.code)
    });
}

// Onclick eventlistener for log in bottom

// var loginBtn = document.getElementById('loginBtn');
// if(loginBtn){
//   loginBtn.addEventListener('click', findData);
// }

function gotomain(){
  window.location.href = "main.html?personname=" + fullname ;
}