// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
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

let email = document.getElementById('email');
let password = document.getElementById('password');

window.loginUser = () => {
  if (email.value === '' || password.value === '') {
    Swal.fire({
      title: 'Error!',
      text: 'All fields are required!',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  let obj = {
    email: email.value,
    password: password.value
  };

  email.value = '';
  password.value = '';

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(async (res) => {
      const id = res.user.uid;
      const reference = doc(db, "users", id);
      const snap = await getDoc(reference);
      if (snap.exists()) {
        localStorage.setItem("user", JSON.stringify(snap.data()));
        Swal.fire({
          title: "Welcome!",
          text: "Your account has been logged in successfully!",
          icon: "success",
          confirmButtonText: 'OK'
        });
        window.location.replace("../index.html");
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'User data not found!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
};
