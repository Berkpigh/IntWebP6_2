const logf = document.querySelector(".loginform");
console.log(logf);
let result = "";

async function postLogin(pbodjson) {
    const res = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: pbodjson
    });
    const resjson = await res.json();
    return resjson;
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
    result = postLogin(logbodjson);
    console.log(result);
});

