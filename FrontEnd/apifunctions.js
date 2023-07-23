function anyHeader(ptoken) {
    const head = new Headers();
    head.append('Content-Type', 'application/json');
    head.append('Authorization', `Bearer ${ptoken}`);
    return head;
}
export async function postLogin(pbodjson) {
    resp.innerHTML = "";
    const res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: pbodjson
    });
    console.log(res);
    if (res.ok === false) {
        resp.innerHTML = "Erreur : Email ou mot de passe non valables";
    } else {
        result = await res.json();
        console.log(result);
        storeResult();
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
export async function addWork(pfd, ptoken) {
    const urls = "http://localhost:5678/api/works";
    const myHeaders = new Headers();
    //myHeaders.append('Content-Type', 'multipart/form-data');
    myHeaders.append('Authorization', `Bearer ${ptoken}`);
    console.log("pfd : " + pfd);
    const res = await fetch(urls, {
        method: "POST", 
        headers: myHeaders,
        body: pfd
    });
    return;
};