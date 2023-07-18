const logf = document.querySelector(".loginform");
//console.log(logf);
const resp = document.getElementById("presult");
let result = "";

function storeResult() {
    const stores = {
        userid: result.userId,
        token: result.token,
        timenow: Date.now()
    }
    const loginfo = JSON.stringify(stores);
    window.localStorage.setItem("loginfo", loginfo);
}

async function postLogin(pbodjson) {
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

logf.addEventListener("submit", function(event) {
    console.log("début listener");
    event.preventDefault();
    const logbodobj = {
        email: event.target.querySelector("[name=login-email]").value,
        password: event.target.querySelector("[name=login-pwd]").value
    }
    const logbodjson = JSON.stringify(logbodobj);
    console.log("logbodjson : " + logbodjson);
//    result = postLogin(logbodjson);
    postLogin(logbodjson);
});
/*
let resbtn = document.getElementById("showresult");
resbtn.addEventListener("click", () => {
    resp.innerHTML = "Résultat : " + result.token + " - " + result.userId;
});
*/