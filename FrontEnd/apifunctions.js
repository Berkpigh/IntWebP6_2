import { lo, displayFormData, displayObject, displayHeaders }  from "./utilitaires.js";
const resp = document.getElementById("presult");

function constructHeaders(pcont, ptoken){
    console.log("Début constructHeaders");
    let hea = new Headers();
    switch (pcont) {
        case null:
            hea = null;
            break;
        case "json":
            hea.append('Content-Type', 'application/json');
            break;
        case "jsonauth":
            hea.append('Content-Type', 'application/json');
            hea.append('Authorization', `Bearer ${ptoken}`);
            break;
        case "form":
            break;
        case "formauth":
            hea.append('Authorization', `Bearer ${ptoken}`);
    }
    displayHeaders(hea);
    return hea;
};
function constructRequestOptions(pfun, phea, pbod) {
    console.log("Début constructRequest");
    let settingObj = new Object();
    switch (pfun) {
        case ("login"):
            settingObj['method'] = "POST";
            settingObj['headers'] = phea;
            settingObj['body'] = pbod; 
            break;
        case ("delete"):
            settingObj['method'] = "DELETE";
            settingObj['headers'] = phea;
            break;
        case ("add"):
            settingObj['method'] = "POST";
            settingObj['headers'] = phea;
            settingObj['body'] = pbod; 
    };
    displayObject(settingObj);
    return settingObj;
};
export function storeResult(plogresult) {
    const locsto = {
        userid: plogresult.userId,
        token: plogresult.token,
        timenow: Date.now()
    }
    const loginfo = JSON.stringify(locsto);
    window.localStorage.setItem("loginfo", loginfo);
};
/* ---  Récupération des données provenant du back-end --- */
export async function getFetch(purl) {
    const response = await fetch(purl);
    const respjson = await response.json();
    return respjson;
};

export async function loginFetch(purl, pcont, pbod, ptoken) {
    console.log("Début loginFetch");
    console.log("url", purl);
    const headersObj = constructHeaders(pcont, ptoken);
    const settingObj = constructRequestOptions("login", headersObj, pbod);
    try {
        const res = await fetch(purl, settingObj);
        console.log("loginFetch res", res.status);
        if (res.ok === false) {
            resp.innerHTML = "Erreur : Email ou mot de passe non valables";
        } else {
            let logresult = await res.json();
            console.log("loginFetch res.json()", logresult);
            storeResult(logresult);
            window.location.href="index.html";
        }
    } catch (error) {
        console.log(error.message);
    }
};


export async function deleteWork(pworkid, pcont, ptoken) {
    const urls = "http://localhost:5678/api/works/" + pworkid;
    const headersObj = constructHeaders(pcont, ptoken);
    const res = await fetch(urls, {
        method: "DELETE",       
        headers: headersObj, 
    });
    return;
};
export async function addWork(purl, pcont, pbod, ptoken) {
    console.log("Début addWork");
    const headersObj = constructHeaders(pcont, ptoken);
    let res = await fetch(purl, {
        method: "POST",
        headers: headersObj,
        body: pbod,
    });
    let res2 = await res.json();
    console.log("Fin addWork: ");
};
/*
function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
*/
/*
    if (Object.keys(settingObj).length > 0) {
        res = await fetch(purl, settingObj);
    } else {
        res = await fetch(purl);
    };

function constructRequest(purl, pmet, phea, pbod) {
    console.log("Début constructRequest");
    console.log("u",purl);
    console.log("m",pmet);
    console.log("h",phea);
    console.log("b",pbod);
    let settingObj = new Object();
    switch (true) {
        case (!(pmet === null)):
            settingObj['method'] = pmet;
        case (!(phea === null)):
            settingObj['header'] = phea;
        case (!(pbod === null)):
            settingObj['body'] = pbod; 
    };
    console.log("options", settingObj);
    console.log("options nb", Object.keys(settingObj).length);
    if (Object.keys(settingObj).length > 0) { return new Request(purl, settingObj); }
    return new Request(purl);
};
export function buildFetch(purl, pmet, pcont, ptoken, pbod) {
    console.log("Début buildFetch");
    const headersObj = constructHeaders(pcont, ptoken);
    const requestObj = constructRequest(purl, pmet, headersObj, pbod)
    console.log("requestObj", requestObj);
    anyFetch(requestObj);
};
/*
export async function anyFetch(preq) {
    const res = await fetch(preq);
    console.log(res);
    if (res.ok === false) {
        resp.innerHTML = "Erreur : Email ou mot de passe non valables";
    } else {
        let logresult = await res.json();
        console.log(logresult);
        storeResult(logresult);
//        window.location.href="index.html";
    }
};
/*
export async function postLogin(pbodjson,presp) {
    presp.innerHTML = "";
    const res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: pbodjson
    });
    console.log(res);
    if (res.ok === false) {
        presp.innerHTML = "Erreur : Email ou mot de passe non valables";
    } else {
        let logresult = await res.json();
        console.log(logresult);
        storeResult(logresult);
        window.location.href="index.html";
    }
};
*/
/*
export function addWork(pfd, ptoken) {
    const urls = "http://localhost:5678/api/works";
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');
    myHeaders.append('Authorization', `Bearer ${ptoken}`);
    console.log("pfd : " + pfd);
    fetch(urls, {
        method: "POST", 
        headers: myHeaders,
        body: pfd,
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
};
*/
/*
export async function fetchWorks(purl) {
    console.log("Début fetchWorks");
    let res = await fetch(purl);
    fetchResponse = await res.json();
    console.log("fetchResponse",fetchResponse);
    console.log("loginFetch res", res);
    if (res.ok === false) {
        return res.ok;
    } else {
        res = await res.json();
        console.log("res",res);
        return res;
    }
     console.log("Fin fetchWorks");
};
export async function fetchCategories(purl) {
    console.log("Début fetchCategories");
    let res = await fetch(purl);
    fetchResponse = await res.json();
    console.log("fetchResponse",fetchResponse);
    console.log("Fin fetchCategories");
};
export function getFetchResponse() {
    return fetchResponse;
};
*/
/*
export function loginFetch(purl, pcont, pbod, ptoken) {
    console.log("Début loginFetch");
    console.log("url", purl);
    const headersObj = constructHeaders(pcont, ptoken);
    fetch(purl,
        {
            method: "POST",
            headers: headersObj,
            body: pbod,
        }
    )
        .then(res => res.json())
        .then(res2 => storeResult(res2))
        .then(window.location.href="index.html")
};
*/
