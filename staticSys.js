const fs = require("fs");
const url = require("url");
const path = require("path");
const zlib = require("zlib");
const extEnums = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/x-javascript",
    ".png": "image/png",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    '.gif': "image/gif"
};
module.exports = (baseDir) => {
    return (req, res, next) => {
        // 获取pathname
        const { pathname } = url.parse(req.url);
        // 将静态资源存储在static目录中
        const filepath = path.join(__dirname, baseDir, pathname);
        const extname = path.extname(filepath);

        // 判断文件是否存在
        fs.access(filepath, fs.constants.F_OK, (err) => {
            // 如果err存在，则表示文件不存在，
            if(err){
                return next();
            }

            // 第一种方式

            /*
            fs.readFile(filepath, (err, buffer) => {
                 res.setHeader("Content-type", extEnums[extname] || "text/plain");
                 res.setHeader("Cache-Control", "max-age=60");
                 res.write(buffer);
                 res.end();
            });
            */

            // 第二种方法
            const readStream = fs.createReadStream(filepath);
            const gzip = zlib.createGzip();
            res.setHeader("Content-type", extEnums[extname] || "text/plain");
            res.setHeader("Cache-Control", "max-age=60");
            res.setHeader("Content-Encoding", "gzip");
            readStream.pipe(gzip).pipe(res);

        });
    };
};