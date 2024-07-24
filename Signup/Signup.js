// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClHcLsmsf7vy_kmXZdWHoZhgCk3GyFRPE",
  authDomain: "sastabazar-49f9a.firebaseapp.com",
  projectId: "sastabazar-49f9a",
  storageBucket: "sastabazar-49f9a.appspot.com",
  messagingSenderId: "322279536136",
  appId: "1:322279536136:web:fd541d58ffc915542803bd",
  measurementId: "G-YJ74CKSGYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');

window.SignupUser = () => {
  if (username.value === '' || email.value === '' || password.value === '') {
    Swal.fire({
      title: 'Error!',
      text: 'All fields are required!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  let obj = {
    username: username.value,
    email: email.value,
    password: password.value
  };

  username.value = '';
  email.value = '';
  password.value = '';

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then((res) => {
      obj.id = res.user.uid;
      obj.userType = "user";
      delete obj.password;

      const reference = doc(db, "users", obj.id);
      setDoc(reference, obj)
        .then(() => {
          const userObj = JSON.stringify(obj);
          localStorage.setItem("user", userObj);
          window.location.replace("../index.html");
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });

      Swal.fire({
        title: 'Account Created!',
        text: 'Your account has been successfully created.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    })
    .catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: err.message === 'Firebase: Error (auth/email-already-in-use).' ? 'You are already registered, please log in!' : err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
};
