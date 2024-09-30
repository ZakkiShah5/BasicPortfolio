const hamburger = document.querySelector(".hamburger");
const menus = document.querySelector(".menus");
const newsletter = document.querySelectorAll(".newsletter");
const modal = document.querySelector(".modal");
const xmark = document.querySelector(".modal .fa-solid");
const accTitle = document.querySelectorAll(".accordion .title");
const acccontent = document.querySelectorAll(".accordion .content");

hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('active')
    menus.classList.toggle('active')
});

newsletter.forEach(news=>{
    news.addEventListener('click', ()=> modal.classList.add('show'));
})

xmark.addEventListener('click',()=> modal.classList.remove('show'));

accTitle.forEach((title, index) =>{
    title.addEventListener('click',(e)=>{
        e.target.classList.toggle('active');
        acccontent[index].classList.toggle('active');
    })
})