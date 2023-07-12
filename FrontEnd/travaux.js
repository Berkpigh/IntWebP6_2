const por = document.getElementById("portfolio");
let gal = document.querySelector(".gallery");
let wors = "";
let cats = "";
let docs = "";
let wmax = 0;
let cmax = 0;

let urls = `http://localhost:5678/api/works`
let response = await fetch(urls);
wors = await response.json();
wmax = wors.length -1;
//console.log(wors);

urls = `http://localhost:5678/api/categories`
response = await fetch(urls);
cats = await response.json();
cmax = cats.length -1;
console.log(cats);

function removeFigures() {
    try {
        console.log("Début removeFigures");
        let figs = document.querySelector(".gallery");
        figs.parentNode.removeChild(figs);
        return true;
    } catch (error) {
        console.log("Erreur removeFigures " + error.message);
    }
}
function createFigures()  {
    try {
        console.log("Début createFigures");
        gal = document.createElement("div");
        gal.classList.add("gallery");
        for (let w = 0; w <= wmax; w++) {
            let fig = document.createElement("figure");
            let ima = document.createElement("img");
            let fic = document.createElement("figcaption");
            ima.src = wors[w].imageUrl;
            ima.alt = wors[w].title;
            fic.innerHTML  = wors[w].title;
            fig.appendChild(ima);
            fig.appendChild(fic);
            gal.appendChild(fig);
            //console.log(gal);
        }
        por.appendChild(gal);
        console.log(por);
        return true;
    } catch (error) {
        console.log("Erreur createFigures " + error.message);
    }
}
function createCatBtns() {
    console.log("Début createCatBtns");
    let div = document.createElement("div");
    div.classList.add("porcatbtn");
    por.appendChild(div);
    let btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = "Tous";
    btn.classList.add("porcatbtn__btnsel", "c0");
    div.appendChild(btn);
    let cx = "";
    for (let c = 0; c <= cmax; c++) {
        btn = document.createElement("button");
        btn.type = "button";
        btn.innerHTML = cats[c].name;
        cx = "c" + (c + 1).toString();
        btn.classList.add("porcatbtn__btn", cx);
        div.appendChild(btn);
    }
    console.log("createCatBtns Ok");
}
function main() {
    let b = removeFigures();
    if (b === true) {console.log("removeFigures Ok");
                     b = createFigures()};
    if (b === true) {console.log("createFigures Ok")};
}
createCatBtns();
main();