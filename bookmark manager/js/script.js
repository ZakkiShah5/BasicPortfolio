import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getFirestore, addDoc, doc, collection, serverTimestamp, getDocs, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBoPbob6Q0ioSseZC0PMWf1qq8AA2zOhbU",
    authDomain: "bookmark-62476.firebaseapp.com",
    projectId: "bookmark-62476",
    storageBucket: "bookmark-62476.appspot.com",
    messagingSenderId: "846461856985",
    appId: "1:846461856985:web:d420325f5c1a1896b3e2c8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "bookmarks");

const addMark = document.querySelector("form");
const parentCat = document.querySelector(".cats .container");

const genTemp = (response, id) => {

    return `
                <div class="cat">
                         <div class="cat-title">${response.title}</div>
                         <div class="cat-flex">
                             <div class="cat-category"><span class="${response.category.toLowerCase()}">${response.category.charAt(0).toUpperCase() + response.category.slice(1)}</span></div>
                             <div class="icons">
                                 <a href="${response.link}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square goTo"></i></a>
                                 <a href="https://www.google.com/search?q=${response.title}" target="_blank"><i class="fa-brands fa-google"></i></a>
                                 <i class="fa-solid fa-trash-can" data-id="${id}"></i>
                             </div>
                         </div>
                     </div>
         `

}


const showData = () => {
    parentCat.innerHTML = ``;
    getDocs(colRef).then(data => {
        data.docs.forEach(document => {
            parentCat.innerHTML += genTemp(document.data(), document.id);
        })
    })
}

addMark.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addMark.titled.value,
        link: addMark.link.value,
        category: addMark.cats.value,
        createdAt: serverTimestamp()
    }).then(() => {
        addMark.reset();
        showData();
    })
});

parentCat.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash-can")) {
        const id = e.target.dataset.id;
        const delRef = doc(db, "bookmarks", id);
        deleteDoc(delRef).then(() => { 
            e.target.parentElement.parentElement.parentElement.remove();
         })
    }
});

const filterCats = (clicked) => {
    if (clicked == "All") {
        return showData();
    }
    else {
        const qRef = query(colRef, where("category", "==", clicked.toLowerCase()));
        parentCat.innerHTML = "";
        getDocs(qRef).then(data => {
            data.docs.forEach((document) => {
                parentCat.innerHTML += genTemp(document.data(), document.id);
            })
        })
    }
}

const categories = document.querySelector(".category .container");
const spans = document.querySelectorAll(".category .container span");
categories.addEventListener("click", (e) => {
    if (e.target.tagName === 'SPAN') {
        filterCats(e.target.innerText);
        spans.forEach(span=> span.classList.remove('active'));
        e.target.classList.add("active");
    }
});
showData();
