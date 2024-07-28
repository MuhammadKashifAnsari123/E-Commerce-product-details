// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";
  

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
// const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();

// let productName = document.getElementById("productName");
// let description = document.getElementById("description");
// let price = document.getElementById("price");
// let image = document.getElementById("image");
// let category = document.getElementById("category");



window.UploadProduct = async () => {
  // Assuming these are your input elements
  let productName = document.getElementById('productName');
  let description = document.getElementById('description');
  let price = document.getElementById('price');
  let image = document.getElementById('image');
  let category = document.getElementById('category');

  // Simple validation
  if (!productName.value.trim() || !description.value.trim() || !price.value.trim() || !image.value.trim() || !category.value.trim()) {
      Swal.fire({
          icon: 'error',
          title: 'All fields are required!',
          text: 'Please fill in all fields before submitting.',
      });
      return;
  }

  let obj = {
      productName: productName.value,
      description: description.value,
      price: price.value,
      image: image.value,
      category: category.value,
  };

  productName.value = ''
  description.value = ''
  price.value = ''
  image.value = ''
  category.value = ''

  try {
      let reference = collection(db, "products");
      let res = await addDoc(reference, obj);
      Swal.fire({
          icon: 'success',
          title: 'Product Uploaded',
          text: 'Your product has been successfully uploaded.',
      });
  } catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: `Error: ${error.message}`,
      });
  }
};









