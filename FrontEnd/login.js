import { postLogin } from "./apifunctions.js";
const logf = document.querySelector(".loginform");
const resp = document.getElementById("presult");
let result = "";

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
    postLogin(logbodjson, resp);
});
