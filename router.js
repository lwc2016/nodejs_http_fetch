const url = require("url");
module.exports = ()=>{
    return (req, res, next)=>{
        const { pathname } = url.parse(req.url);
        if(pathname === "/user" && req.method === "GET"){
            res.setHeader("Content-type", "application/json;charset=utf-8");
            res.write(JSON.stringify({
                code: 0,
                result: {
                    name: "Jack",
                    id: 12,
                    age: 36,
                    email: "jack2012@hotmail.com"
                }
            }));
            res.end();
        }else if(pathname === "/login" && req.method  === "POST"){
            res.setHeader("Content-type", "application/json;charset=utf-8");
            const {name, password} = req.body || {};
            if(name === "admin" && password === "123456"){
                res.write(JSON.stringify({
                    code: 0,
                    result: ""
                }));
            }else{
                res.write(JSON.stringify({
                    code: 1001,
                    result: "",
                    errorMsg: "用户名或密码错误"
                }));
            }
            res.end();
        }else if(pathname === "/register" && req.method === "POST"){
            console.log(req.headers["content-type"]);
            res.setHeader("Content-type", "application/json;charset=utf-8");
            res.write(JSON.stringify({
                code: 0,
                result: req.body
            }));
            res.end();
        }else if(pathname === "/addNews" && req.method === "POST"){
            console.log(req.headers["content-type"]);
            res.setHeader("Content-type", "application/json;charset=utf-8");
            res.write(JSON.stringify({
                code: 0,
                result: req.body
            }));
            res.end();
        }else if(pathname === "/upload" && req.method === "POST"){
            console.log(req.headers["content-type"]);
            res.setHeader("Content-type", "application/json;charset=utf-8");
            res.write(JSON.stringify({
                code: 0,
                result: req.body
            }));
            res.end();
        }else{
            return next();
        }
    };
};