import { anyFor, anyDiv, anyPar, anyBtn, anyLab, anyInp, anyImg, anySel, anyOpt, swapClass,
    generateSVGMove, generateSVGDel, generateSVGLine, generateSVGAP  } from "./utilitaires.js";
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
let token = "";
let wors = "";
let cats = "";
let cmax = 0;
let curcat = "0";
let precat = "";
let testlog = 0;
let session = 15;
let ModNum = 0;
let APUrl = "";


let urls = `http://localhost:5678/api/works`
let response = await fetch(urls);
wors = await response.json();
//console.log(wors);

urls = `http://localhost:5678/api/categories`
response = await fetch(urls);
cats = await response.json();
cmax = cats.length -1;
console.log(cats);

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
    if (minutes > session) {
        console.log("getinfo : > " + session);
        window.localStorage.removeItem("loginfo");
        swapModifier(-1);
        return true;
    }
    token = gijson.token;
    console.log(token);
    console.log("getinfo : < " + session);
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
amod.addEventListener("mouseover", (event) => {
    testlog = getLSInfo();
    console.log("testlog modifier: " + testlog);
    if (testlog === true) { window.location.href="login.html"; };
});
function main(pwors) {
    let b = removeFigures();
    if (b === true) {console.log("removeFigures Ok");
                     b = createFigures(pwors)};
    if (b === true) {console.log("createFigures Ok")};
}

/* --- gestion fenêtre modale ---*/
const focusableSelector = 'button, a, input, textarea'
let modal = null
let focusables = []
let previouslyFocusedElement = null
document.querySelector(".js-modal-back").addEventListener("click", (event) => {
    mainModal(wors);
});
function removeModal() {
    console.log("Début removeModal - " + ModNum);
    let b = false;
    if (ModNum === 1) {
        b = removeMainModal();
    } else {
        b = removeAPModal();
    }
    return b;
}
function removeMainModal() {
    //try {
        console.log("Début removeMainModal");
        let modwrap = modal.querySelector(".modal-wrapper");
        let figs = modal.querySelector(".modal-gallery");
        modwrap.removeChild(figs);
        figs = modal.querySelector(".modal-svg");
        modwrap.removeChild(figs);
        figs = modal.querySelector(".modal-btns");
        modwrap.removeChild(figs);
        return true;
/*    } catch (error) {
        console.log("Erreur removeMainModal " + error.message);
    } */
}
function removeAPModal() {
    //try {
        console.log("Début removeAPModal");
        let modwrap = modal.querySelector(".modal-wrapper");
        let cont = modal.querySelector(".APmodal-content");
        modwrap.removeChild(cont);
        return true;
/*    } catch (error) {
        console.log("Erreur removeModal " + error.message);
    } */
};
function addListenerAPBtn() {
    const apimg = modal.querySelector(".apimg");
    const apifi = modal.querySelector(".apifi");
    const apilab = modal.querySelector(".apilab");
    apifi.onchange = function() {
        APUrl = apifi.files[0].name;
        apimg.src = URL.createObjectURL(apifi.files[0]);
        swapClass(apilab, "apilab", "apilab-nodis");
        swapClass(apimg, "apzer", "appho");
        console.log("file = " + apifi.files[0].type);
        console.log("file = " + APUrl);
        console.log("file = " + apifi.files[0].size);
        let ff = apifi.files[0];
        console.log("file = " + ff);
        console.log("file = " + ff.value);
    }
}
function createAjoutPhotoModal(pwors, pcats)  {
    console.log("Début createAjoutPhotoModal");
    ModNum = 2;
    APUrl = "";
    const bback = modal.querySelector(".js-modal-back");
    swapClass(bback, "js-modal-back-nodis", "js-modal-back-dis");
    const modtit = modal.querySelector(".modal-title");
    modtit.innerHTML = "Ajout photo";
// --- Form
    modgal = anyFor(null, "APmodal-content");
// --- div ajout
    let div2 = anyDiv(null, "apdiv");
//
    let img = anyImg(null, null, "/Backend/images/kyswqmsva7nlkdxhpgl.svg");
    img.classList.add("apimg","apzer");
    div2.appendChild(img);
//
    div2.appendChild(anyLab(null, "apilab", "apinp", "+ Ajouter photo"));
//
    div2.appendChild(anyInp("apinp", "apifi", "file", null, null));
//
    div2.appendChild(anyPar(null, "appar", "jpg, png : 4mo max"));
// 
    modgal.appendChild(div2);
// --- zones input
    modgal.appendChild(anyLab(null, "aptlab", "aptinp", "Titre"));
    modgal.appendChild(anyInp("aptinp", "aptinp", "aptinp", "text", true));
// --- liste déroulante
    modgal.appendChild(anyLab(null, "apllab", "aplist", "Catégorie"));
//
    let aplist = anySel("aplist","aplinp", "aplist", true);
    for (let c = 0; c < pcats.length; c++) {
        aplist.appendChild(anyOpt(pcats[c].id, pcats[c].name));
    }
    modgal.appendChild(aplist);
/* --- Ligne --- */
    modgal.appendChild(generateSVGLine("modal-svg"));
/* --- Bouton valider --- */
    let apbval = anyBtn(null, "apbval", "button", "Valider");
    apbval.classList.add("apbval_unsel");
    modgal.appendChild(apbval); 
//               
    const modcontent = modal.querySelector(".modal-wrapper");
    swapClass(modcontent, "modal-modal", "modal-APmodal");
//
    modcontent.appendChild(modgal);
    addListenerAPBtn();
    return true;
};
function addModalBtnsListener() {
    const madd = modal.querySelector(".modal-add");
    madd.addEventListener("click", (event) => {
        ajoutPhotoModal();
    });
    const mdel = modal.querySelector(".modal-del");
    mdel.addEventListener("click", (event) => {
        //ajoutPhotoModal();
    });
};
function createModalBtns() {
    console.log("Début createModalBtns");
    const modcontent = modal.querySelector(".modal-wrapper");
/* --- Ligne --- */
    let div = document.createElement("div");
    div.classList.add("modal-svg");
    const svg = generateSVGLine();
    div.appendChild(svg);
    modcontent.appendChild(div);
/* --- Boutons --- */
    div = document.createElement("div");
    div.classList.add("modal-btns");
    let btn = document.createElement("button");
    btn.classList.add("modal-add", "porcatbtn__btnsel");
    btn.type = "button";
    btn.innerHTML = "Ajouter une photo";
    div.appendChild(btn);
    btn = document.createElement("button");
    btn.classList.add("modal-del");
    btn.type = "button";
    btn.innerHTML = "Supprimer la galerie";
    div.appendChild(btn);
    modcontent.appendChild(div);
    addModalBtnsListener();
    console.log("createModalBtns Ok");
};
async function deleteWork(pworkid) {
    const urls = "http://localhost:5678/api/works/" + pworkid;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);
    const res = await fetch(urls, {
        method: "DELETE", 
        headers: myHeaders 
    });
    return;
};
function addListenerDelBtns() {
    let alldelbtns = modal.querySelectorAll(".figdelbtn");
    for (let i = 0; i < alldelbtns.length; i++) {
        
        alldelbtns[i].addEventListener("click", (event) => {
            let b = event.target.parentNode.id;
            //let b2 = b.parentNode;
            //let b3 = b2.parentNode;
            //console.log(b);
            let figid = parseInt(b.substring(6));
            let figs = modal.querySelectorAll(".figs");
            let fig = figs[figid];
            let cn = fig.childNodes;
            let imgx = cn[1];
            let workid = parseInt(imgx.id);
            console.log(workid);
            console.log(token);
            deleteWork(workid);
            //mainModal(wors);
        });
    }
};
function createMainModal(pwors)  {
    try {
        console.log("Début createMainModal");
        ModNum = 1;
        const bback = modal.querySelector(".js-modal-back");
        bback.classList.remove("js-modal-back-dis");
        bback.classList.add("js-modal-back-nodis");
        const modtit = modal.querySelector(".modal-title");
        modtit.innerHTML = "Galerie photo";
        modgal = document.createElement("div");
        modgal.classList.add("modal-gallery");
        for (let w = 0; w < pwors.length; w++) {
            let fig = document.createElement("figure");
            fig.classList.add("figs");
// --- div avec les boutons
            let div = document.createElement("div");
            div.classList.add("figbtns");
            let svg = "";
            if (w === 0) {
                svg = generateSVGMove();
                div.appendChild(svg);
            }
            let bdel = document.createElement("button");
            bdel.type = "button";
            bdel.classList.add("figdelbtn");
            svg = generateSVGDel();
            svg.id = "figbtn" + w.toString();
            bdel.appendChild(svg);
            div.appendChild(bdel);
// --- image et caption
            let ima = document.createElement("img");
            ima.classList.add("figimg");
            ima.id = pwors[w].id;
            ima.src = pwors[w].imageUrl;
            ima.alt = pwors[w].title;
            let afic = document.createElement("a");
            afic.href = "#figbtn" + w.toString();
            afic.classList.add("figcap");
            let fic = document.createElement("figcaption");
            fic.innerHTML  = "éditer";
// --- rattachement au parent
            fig.appendChild(div);
            afic.appendChild(fic);
            fig.appendChild(ima);
            fig.appendChild(afic);
            modgal.appendChild(fig);
            //console.log(gal);
        }
        const modcontent = modal.querySelector(".modal-wrapper");
        modcontent.classList.remove("modal-APmodal");
        modcontent.classList.add("modal-modal");
        //console.log("modcontent avant : " + modcontent);
        modcontent.appendChild(modgal);
        //console.log(modcontent);
        createModalBtns();
        addListenerDelBtns();
        return true;
    } catch (error) {
        console.log("Erreur createMainModal " + error.message);
    }
};

function mainModal(pwors) {
    let b = removeModal();
    if (b === true) {console.log("removeModal Ok");
                     b = createMainModal(pwors)};
    if (b === true) {console.log("createMainModal Ok")};
}
function ajoutPhotoModal() {
    let b = removeMainModal();
    if (b === true) {console.log("removeMainModal Ok");
                     b = createAjoutPhotoModal(wors, cats)};
    if (b === true) {console.log("createAjoutPhotoModal Ok")};
}

const openModal = async function (e) {
    e.preventDefault()
    const target = e.target.getAttribute('href')
    modal = document.querySelector(target);
    //console.log(modal);
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = "flex";
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)

    mainModal(wors);
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    console.log(focusables);
    focusables[0].focus()
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
ModNum = 1;
main(wors);