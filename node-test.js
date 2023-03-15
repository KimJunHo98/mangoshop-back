let http = require("http"); // 노드모듈을 요청해서 변수에 저장
let hostName = "127.0.0.1"; // 아이피 주소
let port = "8080"; // 포트 번호

// 서버생성(요청(request), 응답(response))
const server = http.createServer((req, res) => {
	const path = req.url;
	const method = req.method;

	if (path === "/products") {
        // GET 방식일 때 응답
		if (method === "GET") {
			res.writeHead(200, { "Content-Type": "application/json" });
			const products = JSON.stringify([{ name: "배변패드", price: 50000 }]);

            res.end(products);
        // POST 방식일 때 응답
		}else if(method === "POST"){
            res.end("생성되었습니다")
        }
	}
    res.end("Good Bye");
});
server.listen(port, hostName);
console.log("server on");