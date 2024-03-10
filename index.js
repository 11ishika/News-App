const apiKey = "f75feacb3fc44aff82ffd5bae4e38d19";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}
function bindData(articles) {
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardContainer.innerHTML = "";
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article) {
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;

    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })
    newsSource.innerHTML=`${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click" , ()=>{
        window.open(article.url,"_blank");
    })
}
function clickNavItem(id){
    fetchNews(id);
}
 const searchBtn = document.getElementById("search-btn");
 const searchText = document.getElementById("news-input");

 searchBtn.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
 })