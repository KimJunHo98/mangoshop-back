// React의 import와 같은 맥락
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");

// json형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
app.use(cors());

// path설정
app.get("/products", (req, res) => {
    models.Product.findAll()
    .then((result) => {
        console.log("product 조회결과:", result);

        res.send({product: result});
    }).catch((error) => {
        console.error(error);

        res.send("에러가 발생했습니다.");
    });
})

// 상품 생성 데이터를 DB에 추가
app.post("/products", (req, res) => {
    const body = req.body;
    // body에 전달받은 값을 디스쳐럭처링(구조분해할당)
    const {name, price, desc, seller} = body;

    // 필수 입력사항중 하나라도 입력을 안 해서 에러가 나는 경우 방어코드 작성
    if(!name || !price || !desc || !seller){
        res.send("모든 필드를 입력해주세요");
    }
    
    // 레코드 생성
    models.Product.create({ // Product: product.js의 테이블 이름
        name, 
        price, 
        desc, 
        seller, 
    }).then((result) => {
        console.log("상품생성결과", result);
        
        res.send({result});
    }).catch((error) => {
        console.error(error);

        res.send('상품 업로드에 문제가 발생했습니다.')
    });
})

app.post("/login", (req, res) => {
    res.send("로그인이 완료되었습니다.");
})


// app실행
app.listen(port, () => {
    console.log("server on");

    // sequelize.sync() DB에 필요한 테이블 생성
    models.sequelize.sync()
    .then(() => {
        console.log("DB연결 성공");
    }).catch((error) => {
        console.error(error);

        // 에러시 서버 종료
        process.exit();
    });
})