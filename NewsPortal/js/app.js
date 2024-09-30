
const cards = document.querySelector(".cards");
const baseUrl = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=23ce795278bd4f0bae372890bd338028";
const category = document.querySelector(".category");
const backupImg = "https://images.unsplash.com/photo-1726461974101-d98a3c616dcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const totalArticles = document.querySelector(".total");
// Fetch Api
const fetchApi = async (url) => {
    try {
        const response = await fetch(url);
        const data = response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

fetchApi(baseUrl).then((data) => {
    data.articles.forEach(item => {
        // console.log(item)
        genTemplate(item.title, item.description, item.urlToImage, item.publishedAt, item.source.name, item.url)
    });
});

// lengthFunc



// Categories

category.addEventListener("click", (e)=>{
    if(e.target.tagName === "SPAN"){
        const url = e.target.dataset.id;
        fetchApi(url).then((data) => {
            cards.innerHTML = "";
            data.articles.forEach(item => {
                // console.log(item);
                genTemplate(item.title, item.description, item.urlToImage, item.publishedAt, item.source.name, item.url)
            });
        });
        const spans = document.querySelectorAll(".category span")
        spans.forEach(cat=>{
            cat.classList.remove("active");
        });
        e.target.classList.add("active");
    }
})

// Cards template

const genTemplate = (title, desc, img, time, source, url) => {
    if(title !== "[Removed]"){
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
    const card = Array.from(cards.children).length;
    totalArticles.innerText = `Total Articles: ${card}`
}

