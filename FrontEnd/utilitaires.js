export function anyPar(pid,pclass,phtml) {
    let x = document.createElement("p");
    if (!(pid === null)) {x.id = pid;}
    if (!(pclass === null)) {x.classList.add(pclass);}
    if (!(phtml === null)) {x.innerHTML = phtml;}
    return x;
}