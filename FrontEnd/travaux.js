const por = document.getElementById("portofolio");
let gal = document.querySelector(".gallery");
let alog = document.getElementById("alog");
let amod = document.getElementById("amod");
let modifier = document.querySelector(".modifier");
let modgal = document.querySelector(".modal-gallery");
/*
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal);
})
*/

let wors = "";
let cats = "";
let cmax = 0;
let curcat = "0";
let precat = "";
let testlog = 0;

let urls = `http://localhost:5678/api/works`
let response = await fetch(urls);
wors = await response.json();
//console.log(wors);

urls = `http://localhost:5678/api/categories`
response = await fetch(urls);
cats = await response.json();
cmax = cats.length -1;
//console.log(cats);

function swapModifier(pswap) {
    if (pswap > 0) {
        alog.classList.remove("navenabled");
        alog.classList.add("navdisabled");
        modifier.classList.remove("modinvisible");
        modifier.classList.add("modvisible");
    } else {
        alog.classList.remove("navdisabled");
        alog.classList.add("navenabled");
        modifier.classList.remove("modvisible");
        modifier.classList.add("modinvisible");        
    }
}
function getLSInfo() {
    const getinfo = window.localStorage.getItem("loginfo");
    if (getinfo === null) {
        console.log("getinfo : null")
        swapModifier(-1);
        return true;
    }
    const gijson = JSON.parse(getinfo);
    let dt = Date.now();
    let dtlog = gijson.timenow;
    let minutes = (dt - dtlog) / 60000;
    if (minutes > 10) {
        console.log("getinfo : > 10")
        window.localStorage.removeItem("loginfo");
        swapModifier(-1);
        return true;
    }
    console.log("getinfo : < 10")
    swapModifier(1);
    return false;
}

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
function createFigures(pwors)  {
    try {
        console.log("Début createFigures");
        gal = document.createElement("div");
        gal.classList.add("gallery");
        for (let w = 0; w < pwors.length; w++) {
            let fig = document.createElement("figure");
            let ima = document.createElement("img");
            let fic = document.createElement("figcaption");
            ima.src = pwors[w].imageUrl;
            ima.alt = pwors[w].title;
            fic.innerHTML  = pwors[w].title;
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
    btn.classList.add("porcatbtn__btnsel");
    btn.id = "0";
    div.appendChild(btn);
    for (let c = 0; c <= cmax; c++) {
        btn = document.createElement("button");
        btn.type = "button";
        btn.innerHTML = cats[c].name;
        btn.classList.add("porcatbtn__btn");
        btn.id = (c + 1).toString();
        div.appendChild(btn);
    }
    console.log("createCatBtns Ok");
}
function showSelCatBtn() {
    let btn = document.getElementById(precat);
    btn.classList.remove("porcatbtn__btnsel");
    btn.classList.add("porcatbtn__btn");

    btn = document.getElementById(curcat);
    btn.classList.remove("porcatbtn__btn");
    btn.classList.add("porcatbtn__btnsel");    
}
function answerCatBtn(pid) {
    precat = curcat;
    curcat = pid;
    showSelCatBtn();
    if (pid === "0") {
        main(wors);
    } else {
         const worsfiltered = wors.filter(function(work) {
            return work.categoryId === Number(pid);
        });
        main(worsfiltered);
        console.log(worsfiltered); 
    }
}
function addListenerCatBtns() {
    let allcatbtns = document.querySelectorAll(".porcatbtn button");
    for (let c = 0; c < allcatbtns.length; c++) {
        allcatbtns[c].addEventListener("click", (event) => {
            let btnid = event.target.id;
            if (!(curcat === btnid)) {
                answerCatBtn(btnid);
            }
        })
    }
}

function removeModal() {
    try {
        console.log("Début removeModal");
        let figs = document.querySelector(".modal-gallery");
        figs.parentNode.removeChild(figs);
        figs = document.querySelector(".modal-svg");
        figs.parentNode.removeChild(figs);
        figs = document.getElementById("modal-btns");
        figs.parentNode.removeChild(figs);
        return true;
    } catch (error) {
        console.log("Erreur removeModal " + error.message);
    }
}
function generateSVGDel() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute("width", "17");
    svg.setAttribute("height", "17");
    svg.setAttribute("viewBox", "0 0 17 17");
    svg.setAttribute("fill", "none");

    rect.setAttribute("width", "17");
    rect.setAttribute("height", "17");
    rect.setAttribute("rx", "2");
    rect.setAttribute("fill", "black");

    path.setAttribute("d", "M6.71607 3.35558C6.82455 3.13661 7.04754 3 7.29063 3H9.70938C9.95246 3 10.1754 3.13661 10.2839 3.35558L10.4286 3.64286H12.3571C12.7127 3.64286 13 3.93013 13 4.28571C13 4.64129 12.7127 4.92857 12.3571 4.92857H4.64286C4.28728 4.92857 4 4.64129 4 4.28571C4 3.93013 4.28728 3.64286 4.64286 3.64286H6.57143L6.71607 3.35558ZM4.64286 5.57143H12.3571V12C12.3571 12.7092 11.7806 13.2857 11.0714 13.2857H5.92857C5.21942 13.2857 4.64286 12.7092 4.64286 12V5.57143ZM6.57143 6.85714C6.39464 6.85714 6.25 7.00179 6.25 7.17857V11.6786C6.25 11.8554 6.39464 12 6.57143 12C6.74821 12 6.89286 11.8554 6.89286 11.6786V7.17857C6.89286 7.00179 6.74821 6.85714 6.57143 6.85714ZM8.5 6.85714C8.32321 6.85714 8.17857 7.00179 8.17857 7.17857V11.6786C8.17857 11.8554 8.32321 12 8.5 12C8.67679 12 8.82143 11.8554 8.82143 11.6786V7.17857C8.82143 7.00179 8.67679 6.85714 8.5 6.85714ZM10.4286 6.85714C10.2518 6.85714 10.1071 7.00179 10.1071 7.17857V11.6786C10.1071 11.8554 10.2518 12 10.4286 12C10.6054 12 10.75 11.8554 10.75 11.6786V7.17857C10.75 7.00179 10.6054 6.85714 10.4286 6.85714Z");
    path.setAttribute("fill", "white");

    svg.appendChild(rect);
    svg.appendChild(path);
    return svg;
};
function generateSVGLine() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    svg.setAttribute("width", "420");
    svg.setAttribute("height", "1");
    svg.setAttribute("viewBox", "0 0 420 1");
    svg.setAttribute("fill", "none");

    line.setAttribute("x1", "-4.37114e-08");
    line.setAttribute("y1", "0.5");
    line.setAttribute("x2", "420");
    line.setAttribute("y2", "0.499963");
    line.setAttribute("stroke", "#B3B3B3");

    svg.appendChild(line);
    return svg;
};
function createModalBtns() {
    console.log("Début createModalBtns");
    const modcontent = document.querySelector(".modal-wrapper");
/* --- Ligne --- */
    let div = document.createElement("div");
    div.classList.add("modal-svg");
    const svg = generateSVGLine();
    div.appendChild(svg);
    modcontent.appendChild(div);
/* --- Boutons --- */
    div = document.createElement("div");
    div.id = "modal-btns";
    let btn = document.createElement("button");
    btn.id = "modal-add";
    btn.classList.add("porcatbtn__btnsel");
    btn.type = "button";
    btn.innerHTML = "Ajouter une photo";
    div.appendChild(btn);
    btn = document.createElement("button");
    btn.id = "modal-del";
    btn.type = "button";
    btn.innerHTML = "Supprimer la galerie";
    div.appendChild(btn);
    modcontent.appendChild(div);
    console.log("createModalBtns Ok");
}
function createModal(pwors)  {
    try {
        console.log("Début createModal");
        modgal = document.createElement("div");
        modgal.classList.add("modal-gallery");
        for (let w = 0; w < pwors.length; w++) {
            let fig = document.createElement("figure");
            fig.classList.add("figs");
            let ima = document.createElement("img");
            ima.src = pwors[w].imageUrl;
            ima.alt = pwors[w].title;
            let afic = document.createElement("a");
            afic.href = "#figbtn" + w.toString();
            let fic = document.createElement("figcaption");
            fic.innerHTML  = "éditer";
            let div = document.createElement("div");
            div.id = "figbtn" + w.toString();
            let svg = generateSVGDel();
            div.appendChild(svg);
            afic.appendChild(fic);
            fig.appendChild(ima);
            fig.appendChild(afic);
            fig.appendChild(div);
            modgal.appendChild(fig);
            //console.log(gal);
        }
        const modcontent = document.querySelector(".modal-wrapper");
        //console.log("modcontent avant : " + modcontent);
        modcontent.appendChild(modgal);
        //console.log(modcontent);
        createModalBtns();
        return true;
    } catch (error) {
        console.log("Erreur createModal " + error.message);
    }
}


/* function addListenerModifier() {
    amod.addEventListener("click", (event) =>{
        event.preventDefault();
        testlog = getLSInfo();
        console.log("testlog modifier: " + testlog);
        if (testlog < 1) {
            window.location.href="login.html";
            return;
        }
        let modal = document.querySelector(".modal-wrapper");
        modal.parentNode.removeChild(modal);
        window.location.href="#modal-modifier";
    });
} */
function main(pwors) {
    let b = removeFigures();
    if (b === true) {console.log("removeFigures Ok");
                     b = createFigures(pwors)};
    if (b === true) {console.log("createFigures Ok")};
}
function mainModal(pwors) {
    let b = removeModal();
    if (b === true) {console.log("removeModal Ok");
                     b = createModal(pwors)};
    if (b === true) {console.log("createModal Ok")};
}
/* --- gestion fenêtre modale ---*/
const focusableSelector = 'button, a, input, textarea'
let modal = null
let focusables = []
let previouslyFocusedElement = null



const openModal = async function (e) {
    e.preventDefault()
    const target = e.target.getAttribute('href')
    modal = document.querySelector(target);
    //console.log(modal);
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
    focusables[0].focus()
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    mainModal(wors);
}

const closeModal = function (e) {
    console.log(modal);
    if (modal === null) return 
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    /* Animation-direction reversed
    modal.style.display = "none"
    modal.offsetWidth
    modal.style.display = null
     */
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    const hideModal = function () {
        modal.style.display = "none"
        modal.removeEventListener('animationend', hideModal)
        modal = null
    }
    modal.addEventListener('animationend', hideModal)
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

const loadModal = async function (url) {
    // TODO : Afficher un loader
    const target = '#' + url.split('#')[1]
    const exitingModal = document.querySelector(target)
    if (exitingModal !== null) return exitingModal
    const html = await fetch(url).then(response => response.text())
    const element = document.createRange().createContextualFragment(html).querySelector(target)
    if (element === null) throw `L'élément ${target} n'a pas été trouvé dans la page ${url}`
    document.body.append(element)
    return element
}
/* 
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener('click', openModal)});
 */    
document.querySelector(".js-modal").addEventListener('click', openModal);

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
})
/* --- Fin de la gestion de la fenêtre modale --- */
testlog = getLSInfo();
console.log("testlog : " + testlog);
createCatBtns();
addListenerCatBtns();
main(wors);