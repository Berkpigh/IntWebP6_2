import { buildFetch, anyFetch, storeResult } from "./apifunctions.js";
import { lo }  from "./utilitaires.js";
const logf = document.querySelector(".loginform");
const resp = document.getElementById("presult");
let result = "";

logf.addEventListener("submit", function(event) {
    lo("début listener");
    event.preventDefault();
    const logbodobj = {
        email: event.target.querySelector("[name=login-email]").value,
        password: event.target.querySelector("[name=login-pwd]").value
    }
    const logbodjson = JSON.stringify(logbodobj);
    lo("logbodjson : " + logbodjson);
    const req = buildFetch("http://localhost:5678/api/users/login", "POST", "json", null, logbodjson);
    lo("login request", req);
    const res = anyFetch(req);
    if (res === false) {
        resp.innerHTML = "Erreur : Email ou mot de passe non valables";
    } else {
        storeResult(res);
        //window.location.href="index.html";
    }
});
