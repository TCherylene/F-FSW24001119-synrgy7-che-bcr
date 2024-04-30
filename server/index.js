/**
 * Impor HTTP Standar Library dari Node.js
 * Hal inilah yang nantinya akan kita gunakan untuk membuat
 * HTTP Server
 * */
const http = require('http');
const URL = "127.0.0.1";
const { PORT = 8000 } = process.env; // Ambil port dari environment variable

const fs = require('fs');
const path = require('path');
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');

function getHTML(htmlFileName) {
    const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName);
    return fs.readFileSync(htmlFilePath, 'utf-8')
}

// Request handler
// Fungsi yang berjalan ketika ada request yang masuk.
function onRequest(req, res) {
    const urlParts = req.url.split('?');
    const urlPath = urlParts[0];

    switch (urlPath) {
        case "/":
            res.writeHead(200)
            res.end(getHTML("index.html"))
            return;
        case "/cars":
            res.writeHead(200)
            res.end(getHTML("cars.html"))
            return;
        default:
            // Jika bukan static files dan tidak ada route yang cocok, kirim 404
            const filePath = path.join(PUBLIC_DIRECTORY, req.url);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end(getHTML("404.html"));
                } else {
                    if (filePath.endsWith(".svg")) {
                        contentType = "image/svg+xml";
                        res.writeHead(200, { "Content-Type": contentType });
                    } else {
                        res.writeHead(200);
                    }

                    res.end(data);
                }
            });
            return;
    }
}

const server = http.createServer(onRequest);

// Jalankan server
server.listen(PORT, URL, () => {
    console.log(`Server sudah berjalan, silahkan buka http://${URL}:${PORT}`);
})