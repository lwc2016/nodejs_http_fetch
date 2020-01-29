const http = require("http");
const staticSys = require("./staticSys");
const bodyParser = require("./body-parser");
const router = require("./router");

const server = http.createServer((req, res) => {
    // 静态资源文件
    staticSys("./static")(req, res, ()=>{

        // 解析post请求的数据
        bodyParser()(req, res, next=>{

            // 处理路由
            router()(req, res, next=>{
                res.writeHead(404, {
                    "Content-type": "text/plain"
                });
                res.write("the source is not found!");
                res.end();
            })
        });
    });
});

server.listen(3030, ()=>{
   console.log("Server is running at port: 3030");
});