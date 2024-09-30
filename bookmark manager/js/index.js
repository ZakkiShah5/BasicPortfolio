import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, query, where,addDoc, doc,deleteDoc,serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


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



// Add document
const form = document.querySelector("form");

form.addEventListener("submit", e=>{
    e.preventDefault()
    addDoc(colRef, {
        title: form.titled.value,
        link: form.link.value,
        category: form.cats.value,
        createdAt: serverTimestamp()
    }).then(() => {
        console.log("added!");
        cards.innerHTML = ''; 
        showData();
        form.reset();
    }).catch((err) => {
        console.log(err)
    });
});

// get Documents
const cards = document.querySelector(".cats .container")

const genTemp = (response, id)=>{
    return `<div class="cat">
                    <div class="cat-title">${response.title}</div>
                    <div class="cat-flex">
                        <div class="cat-category"><span class="${response.category.toLowerCase()}">${response.category[0].toUpperCase()+response.category.slice(1)}</span></div>
                        <div class="icons">
                            <a href="${response.link}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square goTo"></i></a>
                            <a href="https://www.google.com/search?q=${response.link}" target="_blank"><i class="fa-brands fa-google"></i></a>
                            <i class="fa-solid fa-trash-can" data-id="${id}"></i>
                        </div>
                    </div>
                </div>`
}

const showData = ()=>{
    getDocs(colRef).then(data=>{
        data.docs.forEach(element => {
            return cards.innerHTML += genTemp(element.data(), element.id)
        });
    });
}

// Delete document

cards.addEventListener('click', e=>{
    if(e.target.classList.contains('fa-trash-can')){
        const id = e.target.dataset.id;
        const delRef = doc(colRef, id);
        deleteDoc(delRef).then(()=>{
            e.target.parentElement.parentElement.parentElement.remove();
        });
    }
});

// filter 

const categories = document.querySelector(".category .container");

const filtered = (lets)=>{
    if(lets === "All"){
        cards.innerHTML = '';
        showData();
    }
    else{
        const filRef = query(colRef, where("category", "==", lets.toLowerCase()));
        cards.innerHTML = '';
        getDocs(filRef).then((data)=>{
            data.docs.forEach(element=>{
               return cards.innerHTML += genTemp(element.data(), element.id);
            })
        })
    }
}

categories.addEventListener("click", e=>{
    if(e.target.tagName === "SPAN"){
        filtered(e.target.innerText);
    }
})











showData();
