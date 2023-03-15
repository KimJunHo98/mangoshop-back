module.exports = (sequelize, dataTypes) => {
    const product = sequelize.define("Product", 
        {
            // 테이블 내용
            name: {
                type: dataTypes.STRING(100),
                allowNull: false, // allowNull : 컬럼의 값이 없어도 되는지 여부 (default: true), false면 값 입력 필수
            }, 
            price: {
                type: dataTypes.INTEGER(10), // INTEGER: 숫자 자료형
                allowNull: false,
            },
            seller: {
                type: dataTypes.STRING(30),
                allowNull: false,
            },
            desc: {
                type: dataTypes.STRING(300),
                allowNull: false,
            },
            imgUrl: {
                type: dataTypes.STRING(300),
                allowNull: true,
            },
            // soldOut: {
            //     type: dataTypes.STRING(10),
            //     allowNull: false,
            // },
        }
    );

    return product;
};