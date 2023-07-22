function anyHeader(ptoken) {
    const head = new Headers();
    head.append('Content-Type', 'application/json');
    head.append('Authorization', `Bearer ${ptoken}`);
    return head;
}
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