const mongoose = require("mongoose");
const table = new mongoose.Schema({
  nomecliente: { type: String, unique: true },
  endereco: { type: String },
  cep: { type: String },
  telefone: { type: String },
  datacadastro: { type: Date, default: Date.now },
});

module.exports = mongoose.model("client", table);
