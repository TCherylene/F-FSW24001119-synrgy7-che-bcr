/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * 
 * Keep dulu 
 * Notes: belum pakai di challenge ini
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

console.log(params);

if (params.driver && params.date && params.time) {
    const app = new App();
    app.init(params).then(app.run);
}