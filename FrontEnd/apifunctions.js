import { lo }  from "./utilitaires.js";
const resp = document.getElementById("presult");
let fetchResponse = "";

function constructHeaders(pcont, ptoken){
    lo("Début constructHeaders");
    lo("cont", pcont);
    lo("token", ptoken);
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
    lo("headers", hea);
    return hea;
};
function constructRequestOptions(pmet, phea, pbod) {
    lo("Début constructRequest");
    lo("m",pmet);
    lo("h",phea);
    lo("b",pbod);
    let settingObj = new Object();
    switch (true) {
        case (!(pmet === null)):
            settingObj['method'] = pmet;
        case (!(phea === null)):
            settingObj['header'] = phea;
        case (!(pbod === null)):
            settingObj['body'] = pbod; 
    };
    lo("options", settingObj);
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
export async function loginFetch(purl, pcont, pbod, ptoken) {
    lo("Début loginFetch");
    lo("url", purl);
    const headersObj = constructHeaders(pcont, ptoken);
    const res = await fetch(purl,
        {
            method: "POST",
            headers: headersObj,
            body: pbod,
        }
    );
    lo("loginFetch res", res);
    if (res.ok === false) {
        resp.innerHTML = "Erreur : Email ou mot de passe non valables";
    } else {
        let logresult = await res.json();
        lo("loginFetch res.json()", logresult);
        storeResult(logresult);
        window.location.href="index.html";
    }
};
export async function fetchWorks(purl) {
    lo("Début fetchWorks");
    let res = await fetch(purl);
    fetchResponse = await res.json();
    lo("fetchResponse",fetchResponse);
/*
    lo("loginFetch res", res);
    if (res.ok === false) {
        return res.ok;
    } else {
        res = await res.json();
        lo("res",res);
        return res;
    }
 */    
    lo("Fin fetchWorks");
};
export async function fetchCategories(purl) {
    lo("Début fetchCategories");
    let res = await fetch(purl);
    fetchResponse = await res.json();
    lo("fetchResponse",fetchResponse);
    lo("Fin fetchCategories");
};
export function getFetchResponse() {
    return fetchResponse;
};
/*
    if (Object.keys(settingObj).length > 0) {
        res = await fetch(purl, settingObj);
    } else {
        res = await fetch(purl);
    };

function constructRequest(purl, pmet, phea, pbod) {
    lo("Début constructRequest");
    lo("u",purl);
    lo("m",pmet);
    lo("h",phea);
    lo("b",pbod);
    let settingObj = new Object();
    switch (true) {
        case (!(pmet === null)):
            settingObj['method'] = pmet;
        case (!(phea === null)):
            settingObj['header'] = phea;
        case (!(pbod === null)):
            settingObj['body'] = pbod; 
    };
    lo("options", settingObj);
    lo("options nb", Object.keys(settingObj).length);
    if (Object.keys(settingObj).length > 0) { return new Request(purl, settingObj); }
    return new Request(purl);
};
export function buildFetch(purl, pmet, pcont, ptoken, pbod) {
    lo("Début buildFetch");
    const headersObj = constructHeaders(pcont, ptoken);
    const requestObj = constructRequest(purl, pmet, headersObj, pbod)
    lo("requestObj", requestObj);
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

export async function deleteWork(pworkid, ptoken) {
    const urls = "http://localhost:5678/api/works/" + pworkid;
    const res = await fetch(urls, {
        method: "DELETE",       
        headers: anyHeader(ptoken) 
    });
    return;
};
export function addWork(pfd, ptoken) {
    const {data} = axios.post("http://localhost:5678/api/works", {
    axios.post("http://localhost:5678/api/works", {
            title: 'Test1',
        categoryId: 1,
        imageUrl: pfd
        },
        {
        headers: {'Authorization': `Bearer ${ptoken}`,
                  'Content-Type': 'multipart/form-data'}
        }
    )
    .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      });
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
