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
const db = getFirestore(app);
const storage = getStorage();

let productName = document.getElementById("productName");
let description = document.getElementById("description");
let price = document.getElementById("price");
let image = document.getElementById("image");
let category = document.getElementById("category");


let upload = () => {
  return new Promise((resolve, reject) => {
    let files = image.files[0];
    console.log(files);
    const randomNum = Math.random().toString().slice(2);
    const storageRef = ref(storage, `images/${randomNum}`);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error.message);
        reject(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}

window.UploadProduct = () => {
  let productNameValue = productName.value.trim();
  let descriptionValue = description.value.trim();
  let priceValue = price.value.trim();
  let categoryValue = category.value.trim();

  if (!productNameValue || !descriptionValue || !priceValue || !categoryValue) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Please fill in all required fields.',
    });
    return;
  }

  let obj = {
    productName: productNameValue,
    description: descriptionValue,
    price: priceValue,
    image: '',
    category: categoryValue
  };

  upload()
    .then(async (res) => {
      obj.image = res;
      productName.value = '';
      description.value = '';
      price.value = '';
      category.value = '';
      image.value = '';

      try {
        let reference = collection(db, "products");
        let result = await addDoc(reference, obj);
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
      window.location.assign("../index.html");
    })
    .catch(err => {
      console.log(err);
    });
}



