const querystring = require("querystring");
const splitBuffer = require("./libs/splitBuffer");
const fs = require("fs");
const path = require("path");

module.exports = () => {
    return (req, res, next)=>{
        // 解析application/x-www-form-urlencoded数据
        if(req.headers["content-type"] && req.headers["content-type"] === "application/x-www-form-urlencoded"){
            console.log("Content-type:", req.headers["content-type"]);
            const arr = [];
            req.body = {};
            req.on("data", (buffer)=>{
                arr.push(buffer);
            });
            req.on("end", ()=>{
                const buffer = Buffer.concat(arr);
                req.body = querystring.parse(buffer.toString());
                next();
            });
        }else if(req.headers["content-type"] && req.headers["content-type"].startsWith("multipart/form-data")){
            console.log("Content-type:", req.headers["content-type"]);
            // 获取boundary
            const boundary = "--" + req.headers["content-type"].replace("multipart/form-data; boundary=", "");
            const arr = [];
            req.body = {};
            req.on("data", (buffer) =>{
                arr.push(buffer);
            });
            req.on("end", ()=>{
                const buffer = Buffer.concat(arr);
                console.log(buffer.toString());
                // 切割fields
                const fields = splitBuffer(buffer, boundary);
                fields.pop();
                fields.shift();

                fields.forEach((itemBuffer) => {
                    // 获取头部信息，和内容部分
                    const [ header, body ] = splitBuffer(itemBuffer, "\r\n\r\n");
                    const content = splitBuffer(body, "\r\n")[0];
                    // 判断是文本，还是文件， 如果头部信息中content-type，说明是文件，没有则说明是文本
                    if(header.indexOf(Buffer.from("Content-Type")) >= 0){
                        const field = splitBuffer(splitBuffer(header, 'name="')[1], '";')[0];
                        const originalFilename = splitBuffer(splitBuffer(header, 'filename="')[1], '"')[0].toString();
                        const filename = Date.now() + path.extname(originalFilename);
                        // 写入文件
                        fs.writeFile(path.join(__dirname, "./static", filename), content, (err)=>{
                            console.log(err);
                        });
                        req.body[field.toString()] = {
                            filename,
                            url: filename
                        }
                    }else{
                        const field = splitBuffer(splitBuffer(header, 'name="')[1], '"')[0];
                        req.body[field.toString()] = content.toString();
                    }
                    console.log(header.toString());
                });
                console.log(fields);

                next();
            });
        }else if(req.headers["content-type"] === "application/json"){
            // 解析application/json数据
            const arr = [];
            req.body = {};
            req.on("data", (buffer)=>{
                arr.push(buffer);
            });
            req.on("end", ()=>{
                const buffer = Buffer.concat(arr);
                try{
                    req.body = JSON.parse(buffer.toString());
                }catch (e) {
                    req.body = {};
                }
                next();
            });
        } else{
            next();
        }
    };
};