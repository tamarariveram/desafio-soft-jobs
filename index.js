const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { checkConnection } = require("./utils/dbConnection");
const {
  registrarUsuario,
  verificarCredenciales,
  obtenerUsuario,
} = require("./controllers/usuario.controller");
const {
  reportarConsulta,
  validarCredenciales,
  validarToken,
} = require("./middlewares/middlewares");

const app = express();

app.use(express.json());
app.use(cors());
app.use(reportarConsulta);

app.post("/usuarios", validarCredenciales, async (req, res) => {
  try {
    const usuario = req.body;
    await registrarUsuario(usuario);
    res.status(201).json({ message: "Usuario creado con éxito" });
  } catch (error) {
    console.log(error);
    const status = typeof error.code === "number" ? error.code : 500;
    res.status(status).json({ message: error.message });
  }
});

app.post("/login", validarCredenciales, async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, "az_AZ", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.log(error);
    const status = typeof error.code === "number" ? error.code : 500;
    res.status(status).json({ message: error.message });
  }
});

app.get("/usuarios", validarToken, async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    const { email } = jwt.decode(token);
    const usuario = await obtenerUsuario(email);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    const status = typeof error.code === "number" ? error.code : 500;
    res.status(status).json({ message: error.message });
  }
});

app.listen(3000, async () => {
  console.log("🟢 Servidor iniciado en http://localhost:3000");
  try {
    const hora = await checkConnection();
    console.log("💾 Base de datos conectada a las " + hora);
  } catch (error) {
    console.log("🔴 Error en la conexión a la BD: ", error.message);
  }
});
