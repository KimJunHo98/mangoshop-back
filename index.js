// React의 import와 같은 맥락
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // callback
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
// storage서버

// json형식의 데이터를 처리할 수 있게 설정
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// path설정
app.get("/products", (req, res) => {
  models.Product.findAll({
    // limit:1
    order: [["createdAt", "DESC"]],
    attribute: ["id", "name", "price", "seller", "imageUrl", "createAt"],
  })
    .then((result) => {
      console.log("product 조회결과:", result);

      res.send({ product: result });
    })
    .catch((error) => {
      console.error(error);

      res.send("에러가 발생했습니다.");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;

  //단일상품조회는 findOne
  models.Product.findOne({
    //조건문 where 사용 => id가 상수 id와 같은것
    where: {
      id: id,
    },
  })
    .then((result) => {
      //통신성공시 콘솔에 product 객체를 출력하고
      console.log("prodcut:", result);

      //res.send로 product 객체에 result 를 저장
      res.send({ product: result });
    })
    .catch((error) => {
      //통신 실패시 res에 메시지 전달
      console.error(error);

      res.send("상품조회시 에러가 발생했습니다.");
    });
});

// 상품 생성 데이터를 DB에 추가
app.post("/products", (req, res) => {
  const body = req.body;
  // body에 전달받은 값을 디스쳐럭처링(구조분해할당)
  const { name, price, desc, seller, imageUrl } = body;

  // 필수 입력사항중 하나라도 입력을 안 해서 에러가 나는 경우 방어코드 작성
  if (!name || !price || !desc || !seller) {
    res.send("모든 필드를 입력해주세요");
  }

  // 레코드 생성
  models.Product.create({
    // Product: product.js의 테이블 이름
    name,
    price,
    desc,
    imageUrl,
    seller,
  })
    .then((result) => {
      console.log("상품생성결과", result);

      res.send({ result });
    })
    .catch((error) => {
      console.error(error);

      res.send("상품 업로드에 문제가 발생했습니다.");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;

  res.send({
    imageUrl: file.path,
  });
});

app.post("/login", (req, res) => {
  res.send("로그인이 완료되었습니다.");
});

// app실행
app.listen(port, () => {
  console.log("server on");

  // sequelize.sync() DB에 필요한 테이블 생성
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB연결 성공");
    })
    .catch((error) => {
      console.error(error);

      // 에러시 서버 종료
      process.exit();
    });
});
