function constructHeaders(pcont, ptoken){
    let hea = new Headers();
    switch (pcont) {
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
    return hea;
};
function constructRequest(purl, pmet, phea, pbod) {
  const req = new Request();
    req.url = purl;
    req.method = pmet;
    req.headers = phea;
    req.body = pbod;
    return req;
};
function storeResult(plogresult) {
    const locsto = {
        userid: plogresult.userId,
        token: plogresult.token,
        timenow: Date.now()
    }
    const loginfo = JSON.stringify(locsto);
    window.localStorage.setItem("loginfo", loginfo);
}
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
//    const {data} = axios.post("http://localhost:5678/api/works", {
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
