const { pool } = require("../utils/dbConnection");
const bcrypt = require("bcryptjs");

async function registrarUsuario(usuario) {
  const { email, password, rol, lenguage } = usuario;

  const { rowCount } = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email],
  );
  if (rowCount) throw { code: 400, message: "Ese email ya está registrado" };

  const passwordEncriptada = bcrypt.hashSync(password);

  const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
  const values = [email, passwordEncriptada, rol, lenguage];
  await pool.query(consulta, values);
}

async function verificarCredenciales(email, password) {
  const { rows, rowCount } = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email],
  );
  if (!rowCount) throw { code: 401, message: "Email o contraseña incorrecta" };

  const usuario = rows[0];
  const passwordEsCorrecta = bcrypt.compareSync(password, usuario.password);
  if (!passwordEsCorrecta)
    throw { code: 401, message: "Email o contraseña incorrecta" };
}

async function obtenerUsuario(email) {
  const consulta =
    "SELECT id, email, rol, lenguage FROM usuarios WHERE email = $1";
  const { rows, rowCount } = await pool.query(consulta, [email]);
  if (!rowCount) throw { code: 404, message: "Usuario no encontrado" };
  return rows;
}

module.exports = { registrarUsuario, verificarCredenciales, obtenerUsuario };
