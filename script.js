//selectionne un element dans main dans html
let main = document.querySelector("main");
//selectionne le bouton dans html
let button = document.querySelector('.press1');
//rend le bouton cliquable
button.addEventListener("click", () => fetchQuote());


//crée une fonction
async function fetchQuote() {
    try {
        let response = await fetch("https://thatsthespir.it/api");
        let quote = await response.json();
        let article = document.createElement("article");
        let addDiv = document.createElement('div');
        addDiv.className = "addDiv";
        article.appendChild(addDiv);
        main.prepend(article);

        let presumedAge = await fetchName(quote.author.split(" ")[0]);
        displayQuote(article, quote, presumedAge);
        addDiv.style.display = "none";

    } catch (error) {
        window.alert(error);
    }

}
function displayQuote(article, quote, presumedAge) {
    let figure = document.createElement("figure");
    let blockquote = document.createElement("blockquote");
    blockquote.setAttribute("cite", "https://thatsthespir.it/")
    let h2 = document.createElement("h2");
    let h4 = document.createElement("h4");

    h2.innerText = quote.quote;
    h4.innerText = quote.author + "\n" + "Presumed age:" + presumedAge + "years old";

    blockquote.appendChild(h2);
    figure.appendChild(blockquote);
    blockquote.appendChild(h4);
    article.appendChild(figure);
}

async function fetchName(name) {
    let response = await fetch("https://api.agify.io/?name=" + name);
    let data = await response.json();
    return data.age;
}

fetchQuote();
