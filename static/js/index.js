window.onload = function(){
    // 获取用户信息
    (function(){
        document.getElementById("getUserBtn").onclick = async function(){
            const result = await fetch("/user");
            const resp = await result.json();
            console.log(resp);
        };
    })();


    // 登录
    (function(){
        document.getElementById("loginBtn").onclick = async function(event){
            event.preventDefault();
            const name = document.getElementById("name").value;
            const password = document.getElementById("password").value;

            const response = await fetch("/login", {
                method: "POST",
                // headers: {
                //     "Content-type": "application/x-www-form-urlencoded"
                // },
                headers: new Headers({
                    "Content-type": "application/x-www-form-urlencoded"
                }),
                body: `name=${name}&password=${password}`
            });
            const data = await response.json();
            console.log(data);
        };
    })();

    // 注册
    (function(){
        document.getElementById("registerBtn").onclick = async function(event){
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const age = document.getElementById("age").value;

            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({username, email, age})
            });
            const data = await response.json();
            console.log(data);
        };
    })();


    // 添加新闻
    (function(){
        document.getElementById("addNewsForm").onsubmit = async function(event){
            event.preventDefault();
            const formdata = new FormData(this);

            const response = await fetch(this.action, {
                method: this.method,
                body: formdata
            });
            const data = await response.json();
            console.log(data);
        }
    })();
};