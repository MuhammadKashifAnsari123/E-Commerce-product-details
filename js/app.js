// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signOut, } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { collection, getFirestore, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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


let products = []

let loginLink = document.getElementById("loginLink");
let uploadLink = document.getElementById("uploadLink");
let signupLink = document.getElementById("signupLink");
let logoutBtn = document.getElementById("logoutBtn");
let productParent = document.getElementById("productParent");

function init() {
  let userObj = localStorage.getItem("user");
  userObj = JSON.parse(userObj);
  if(userObj){
    loginLink.style.display = "none";
     signupLink.style.display = "none";
     if(userObj.userType === "user"){
      uploadLink.style.display = "none";
     }
     logoutBtn.className = "text-white mx-4 inline-block bg-blue-500 p-2 rounded"
  }
}
init();

window.logout = () => {
  signOut(auth)
  .then(() => {
    localStorage.removeItem("user");
    init();
  }) 
  .catch((err) => {
    alert(err.message);
  })
}


let renderProducts = () => {
  productParent.innerHTML = "";
  products.forEach((x) => {
    productParent.innerHTML += `
      <div class="bg-white rounded-lg overflow-hidden shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 flex flex-col">
        <img src="${x.image}" alt="${x.productName}" class="w-full h-48 object-cover">
        <div class="p-4 flex-grow">
          <h3 class="text-xl font-semibold mb-2">${x.productName}</h3>
          <p class="text-gray-500 mb-1">${x.category}</p>
          <p class="text-gray-600 mb-4">${x.description}</p>
          <p class="text-green-600 font-bold text-lg mb-4">${x.price}</p>
          <a href="#" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center mt-auto">Buy Now</a>
        </div>
      </div>
    `;
  })
}


let getProducts = async () => {
  const reference = collection(db, "products");
  const dt = await getDocs(reference);
  dt.forEach((dc) => {
    let obj = {
      id: dc.id,
      ...dc.data(),
    };
    products.push(obj);
  });
  renderProducts();
};
getProducts();