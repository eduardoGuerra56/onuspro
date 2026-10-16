const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

class Database {

    constructor(){
        this.connect();
    }

    connect(){
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            console.error("Variável MONGODB_URI não definida. Copie .env.example para .env e preencha a conexão.");
            return;
        }

        mongoose.connect(uri)
        .then(() => {
            console.log("Conexão com o banco de dados realizada");
        })
        .catch((err) => {
            console.log("Conexão falhou: " + err);
        })
    }
}

module.exports = new Database();
