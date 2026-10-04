const jwt = require("jsonwebtoken");

const reportarConsulta = (req, res, next) => {
  const fecha = new Date().toLocaleString();
  console.log(`📥 ${fecha} - Consulta recibida: ${req.method} ${req.url}`);
  next();
};

const validarCredenciales = (req, res, next) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Debes enviar email y contraseña" });
  }
  next();
};

const validarToken = (req, res, next) => {
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    return res.status(401).json({ message: "Debes enviar un token" });
  }

  const token = Authorization.split("Bearer ")[1];

  try {
    jwt.verify(token, "az_AZ");
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o vencido" });
  }

  next();
};

module.exports = { reportarConsulta, validarCredenciales, validarToken };
