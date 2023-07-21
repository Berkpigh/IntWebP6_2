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
let session = 5;

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

function removeModal() {
    //try {
        console.log("Début removeModal");
        let modwrap = modal.querySelector(".modal-wrapper");
        let figs = modal.querySelector(".modal-gallery");
        modwrap.removeChild(figs);
        figs = modal.querySelector(".modal-svg");
        modwrap.removeChild(figs);
        figs = modal.querySelector(".modal-btns");
        modwrap.removeChild(figs);
        return true;
/*    } catch (error) {
        console.log("Erreur removeModal " + error.message);
    } */
}
function generateSVGMove() {
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

    path.setAttribute("d", "M9.05089 3.20363C8.77938 2.93212 8.33845 2.93212 8.06694 3.20363L6.6768 4.59377C6.40529 4.86528 6.40529 5.30621 6.6768 5.57772C6.94831 5.84924 7.38925 5.84924 7.66076 5.57772L7.86493 5.37355V7.86493H5.37355L5.57772 7.66076C5.84924 7.38925 5.84924 6.94831 5.57772 6.6768C5.30621 6.40529 4.86528 6.40529 4.59377 6.6768L3.20363 8.06694C2.93212 8.33845 2.93212 8.77938 3.20363 9.05089L4.59377 10.441C4.86528 10.7125 5.30621 10.7125 5.57772 10.441C5.84924 10.1695 5.84924 9.72858 5.57772 9.45707L5.37355 9.2529H7.86493V11.7465L7.66076 11.5423C7.38925 11.2708 6.94831 11.2708 6.6768 11.5423C6.40529 11.8138 6.40529 12.2547 6.6768 12.5262L8.06694 13.9164C8.33845 14.1879 8.77938 14.1879 9.05089 13.9164L10.441 12.5262C10.7125 12.2547 10.7125 11.8138 10.441 11.5423C10.1695 11.2708 9.72858 11.2708 9.45707 11.5423L9.2529 11.7465V9.25507H11.7465L11.5423 9.45924C11.2708 9.73076 11.2708 10.1717 11.5423 10.4432C11.8138 10.7147 12.2547 10.7147 12.5262 10.4432L13.9164 9.05306C14.1879 8.78155 14.1879 8.34062 13.9164 8.06911L12.5262 6.67897C12.2547 6.40746 11.8138 6.40746 11.5423 6.67897C11.2708 6.95048 11.2708 7.39142 11.5423 7.66293L11.7465 7.8671H9.25507V5.37355L9.45924 5.57772C9.73076 5.84924 10.1717 5.84924 10.4432 5.57772C10.7147 5.30621 10.7147 4.86528 10.4432 4.59377L9.05306 3.20363H9.05089Z");
    path.setAttribute("fill", "white");

    svg.appendChild(rect);
    svg.appendChild(path);
    svg.classList.add("figsvg");
    return svg;
};
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
    svg.classList.add("figsvg");
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
function generateSVGAP() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "58");
    svg.setAttribute("height", "58");
    svg.setAttribute("viewBox", "0 0 58 58");
    svg.setAttribute("fill", "none");

    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M57 6H1C0.448 6 0 6.447 0 7V51C0 51.553 0.448 52 1 52H57C57.552 52 58 51.553 58 51V7C58 6.447 57.552 6 57 6ZM56 50H2V8H56V50Z");
    path.setAttribute("fill", "#B9C5CC");
    svg.appendChild(path);

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M16 28.138C19.071 28.138 21.569 25.64 21.569 22.57C21.569 19.498 19.071 17 16 17C12.929 17 10.431 19.498 10.431 22.569C10.431 25.64 12.929 28.138 16 28.138ZM16 19C17.968 19 19.569 20.602 19.569 22.569C19.569 24.536 17.968 26.138 16 26.138C14.032 26.138 12.431 24.537 12.431 22.57C12.431 20.603 14.032 19 16 19Z");
    path.setAttribute("fill", "#B9C5CC");
    svg.appendChild(path);

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M7.00004 46C7.23404 46 7.47004 45.918 7.66004 45.751L23.973 31.389L34.275 41.69C34.666 42.081 35.298 42.081 35.689 41.69C36.08 41.299 36.08 40.667 35.689 40.276L30.882 35.469L40.063 25.415L51.324 35.738C51.731 36.111 52.364 36.083 52.737 35.676C53.11 35.269 53.083 34.636 52.675 34.263L40.675 23.263C40.479 23.084 40.218 22.995 39.955 23.001C39.69 23.013 39.44 23.13 39.261 23.326L29.467 34.053L24.724 29.31C24.35 28.937 23.752 28.918 23.356 29.266L6.33904 44.249C5.92404 44.614 5.88404 45.246 6.24904 45.661C6.44704 45.886 6.72304 46 7.00004 46Z");
    path.setAttribute("fill", "#B9C5CC");
    svg.appendChild(path);

    return svg;
};
function removeAPModal() {
    //try {
        console.log("Début removeAPModal");
        let modwrap = modal.querySelector(".modal-wrapper");
        let cont = modal.querySelector(".APmodal-content");
        modwrap.removeChild(cont);
        cont = modal.querySelector(".APmodal-svg");
        modwrap.removeChild(cont);
        cont = modal.querySelector(".APmodal-btn");
        modwrap.removeChild(cont);
        return true;
/*    } catch (error) {
        console.log("Erreur removeModal " + error.message);
    } */
};
function apbtnaddListener() {
    const btn = modal.querySelector(".apbtnadd");
    const fpath = "D:\Documents\_OPENCLASSROOMS\_INTEGRATEUR_WEB\Projet_6\P6_Backend-Frontend\Portfolio-architecte-sophie-bluel\Backend\images"
    btn.addEventListener("click", (event) => {
        console.log(event.target);
        //event.preventDefault();
    })
}
function createAjoutPhotoModal(pwors, pcats)  {
    //try {
        console.log("Début createAjoutPhotoModal");
        const modtit = modal.querySelector(".modal-title");
        modtit.innerHTML = "Ajout photo";
// --- Form
        modgal = document.createElement("form");
        modgal.classList.add("APmodal-content");
// --- div ajout
        let div2 = document.createElement("div");
        div2.classList.add("apdiv");
        let svg = generateSVGAP();
        svg.classList.add("apsvg");
        div2.appendChild(svg);
//
        let btn = document.createElement("button");
        btn.type="button";
        btn.innerHTML = "+ Ajouter photo"
        btn.classList.add("apbtnadd");
//
        let inpfil = document.createElement("input");
        inpfil.classList.add("inpfil");
        inpfil.id = "upload";
        inpfil.name = "upload";
        inpfil.type = "file";
        inpfil.style = ("visibility", "hidden");
        btn.appendChild(inpfil);
        div2.appendChild(btn);
//
        let par = document.createElement("p");
        par.innerHTML = "jpg, png : 4mo max"
        par.classList.add("appar");
        div2.appendChild(par);
// 
        modgal.appendChild(div2);
// --- zones input
        let aptlab = document.createElement("label");
        aptlab.classList.add("aptlab");
        aptlab.for = "aptinp";
        aptlab.innerHTML = "Titre";
        modgal.appendChild(aptlab);
//
        let aptinp = document.createElement("input");
        aptinp.id = "aptinp";
        aptinp.type = "text";
        aptinp.name = "aptinp";
        aptinp.classList.add("aptinp");
        modgal.appendChild(aptinp);
// --- liste déroulante
        let apllab = document.createElement("label");
        apllab.classList.add("apllab");
        apllab.for = "aplist";
        apllab.innerHTML = "Catégorie";
        modgal.appendChild(apllab);
//
        let aplist = document.createElement("select");
        aplist.classList.add("aplinp");
        aplist.id = "aplist";
        aplist.name = "aplist";
        for (let c = 0; c < pcats.length; c++) {
            let aplopt = document.createElement("option");
            aplopt.value = pcats[c].id;
            aplopt.innerHTML = pcats[c].name;
            aplist.appendChild(aplopt);
        }
        modgal.appendChild(aplist);

/* --- Ligne --- */
        let div = document.createElement("div");
        div.classList.add("modal-svg");
        svg = generateSVGLine();
        div.appendChild(svg);
        modgal.appendChild(div);
/* --- Bouton valider --- */
        let apbval = document.createElement("button");
        apbval.classList.add("apbval", "apbval_unsel");
        apbval.type = "button";
        apbval.innerHTML = "Valider";
        modgal.appendChild(apbval); 
//               
        const modcontent = modal.querySelector(".modal-wrapper");
        modcontent.classList.remove("modal-modal");
        modcontent.classList.add("modal-APmodal");
//
        modcontent.appendChild(modgal);
        apbtnaddListener();
        //createModalBtns();
        //addListenerDelBtns();
        return true;
/*
    } catch (error) {
        console.log("Erreur createAjoutPhotoModal " + error.message);
    }
*/
};
function addModalBtnsListener() {
    const madd = modal.querySelector(".modal-add");
    madd.addEventListener("click", (event) => {
        ajoutPhotoModal();
    });
    const mdeé = modal.querySelector(".modal-del");
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
    let b = removeModal();
    if (b === true) {console.log("removeModal Ok");
                     b = createAjoutPhotoModal(wors, cats)};
    if (b === true) {console.log("createAjoutPhotoModal Ok")};
}

const openModal = async function (e) {
    e.preventDefault()
    const target = e.target.getAttribute('href')
    modal = document.querySelector(target);
    //console.log(modal);
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
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
main(wors);