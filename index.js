const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middleware/jwt_verify");
const Cliente = require("./model/client");

const app = express();
app.use(express.json());

const url = (database_url =
  "mongodb+srv://guiguimarcel51:senha1ncorreta@microsservicesapi.6lhi2h1.mongodb.net/?retryWrites=true&w=majority");

mongoose.connect(url, { useUnifiedTopology: true });

app.post("/api/cliente/add", auth, (req, res) => {
  const data = new Cliente(req.body);
  data
    .save()
    .then((data) => {
      res.status(201).send({ output: `New client inserted`, payload: data });
    })
    .catch((erro) =>
      res.status(400).send({ output: `Insertion Fail -> ${erro}` })
    );
});

app.put("/api/cliente/update/:id", auth, (req, res) => {
  const id = req.params.id;
  const updateClient = req.body

  try{
    Cliente.findOneAndUpdate({ _id: id }, updateClient, {new: true}).then((data) => {
      if (!data) return res.status(400).send({ output: `Find client error` });
        res.status(201).send({ output: `Client updated`, payload: data });
      })
    }catch(error){
      res.status(400).send({ output: `Client update change Fail -> ${error}` })
    }
});

app.listen(5533, () => console.log(`Servidor online in http://localhost:5533`));
