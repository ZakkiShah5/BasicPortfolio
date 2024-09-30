const cards = document.querySelector('.cards');
const totalArticles = document.querySelector('.total');
const category = document.querySelector('.category');
const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=23ce795278bd4f0bae372890bd338028';
const urlB = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=23ce795278bd4f0bae372890bd338028';
const urlT = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=23ce795278bd4f0bae372890bd338028';
const urlC = 'https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=23ce795278bd4f0bae372890bd338028';
// const news = document.querySelector('.news');
const loader = document.querySelector('.loader');
const backupImg = "./assets/luke-chesser-rCOWMC8qf8A-unsplash.jpg"

cards.style.display = 'none';
loader.style.display = 'block';

const fetchRequest = async (url) => {
    try {
        const response = await fetch(url);
        const json = response.json();
        return json;
    }
    catch (error) {
        console.log(error)
    }
}
fetchRequest(url).then(data => {
    loader.style.display = 'none';
    cards.style.display = 'flex';

    data.articles.forEach(item => {

        htmlTemplate(item.title, item.description, item.source.name, item.urlToImage, item.publishedAt, item.url)
    })
});

category.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
        cards.style.display = 'none';
        loader.style.display = 'block';
        cards.innerHTML = ""
        fetchRequest(e.target.dataset.id).then(data => {
            loader.style.display = 'none';
            cards.style.display = 'flex';
            const totalLength = data.articles.length;
            total(totalLength);
            data.articles.forEach(item => {

                htmlTemplate(item.title, item.description, item.source.name, item.urlToImage, item.publishedAt, item.url)
            })
        });
        const span = document.querySelectorAll(".category span");
        span.forEach(item=>{
            item.classList.remove("active");
        })
        e.target.classList.add("active");
    }
})

fetchRequest(url).then(data => {
    const totalLength = data.articles.length;
    total(totalLength);
})

const total = (len) => {
    totalArticles.innerHTML = `Total articles: ${len}`;
}

const htmlTemplate = (title, desc, source, img, time, url) => {
    if (title != '[Removed]') {

        cards.innerHTML += `
        <div class="card">
                            <div class="image"><img src="${img ? img : backupImg}" alt=""></div>
                            <div class="info">
                                <div>
                                    <p class="news-title">${title}</p>
                                    <p class="desc">${desc}</p>
                                    <p class="time">
                                        <span>${time.replace("Z", "").split("T")[1]}</span>
                                        <span>${time.replace("Z", "").split("T")[0]}</span>
                                    </p>
                                </div>
                                <div class="other">
                                    <span class="source">${source}</span>
                                    <a href="${url}" target="_blank">Read More!</a>
                                </div>
                            </div>
                        </div>
        `
    }
}