const logf = document.querySelector(".loginform");
//console.log(logf);
let result = "";

async function postLogin(pbodjson) {
    const res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: pbodjson
    });
    console.log(res);
    if (res.ok === false) {
        alert("email ou mot de passe non valables");
    } else {
        result = await res.json();
        console.log(result);
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
let resbtn = document.getElementById("showresult");
resbtn.addEventListener("click", () => {
    let resp = document.getElementById("presult");
    resp.innerHTML = "Résultat : " + result.token + " - " + result.userId;
});