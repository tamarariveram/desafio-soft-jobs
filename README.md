# Desafío - Soft Jobs 🔐

Servidor backend para la plataforma **Soft Jobs**, que permite registrar usuarios, iniciar sesión y consultar el perfil del usuario autenticado usando **JWT** y contraseñas encriptadas con **bcryptjs**.

## 🛠️ Tecnologías

- Node.js + Express
- PostgreSQL (`pg`)
- `jsonwebtoken` para firmar, verificar y decodificar tokens
- `bcryptjs` para encriptar contraseñas
- `cors`

## 📁 Estructura

```
desafio-soft-jobs/
├── controllers/
│   └── usuario.controller.js   → consultas a la base de datos
├── middlewares/
│   └── middlewares.js          → reportarConsulta, validarCredenciales, validarToken
├── utils/
│   └── dbConnection.js         → conexión a PostgreSQL
├── index.js                    → servidor y rutas
├── script.sql                  → creación de la base de datos
└── package.json
```

## 🚀 Instalación

1. Crear la base de datos:
   ```bash
   psql -U postgres -f script.sql
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. En `utils/dbConnection.js`, reemplazar `tu_contraseña` por la contraseña de PostgreSQL.
4. Levantar el servidor:
   ```bash
   node index.js
   ```

El servidor queda disponible en `http://localhost:3000`.

## 📌 Rutas

| Método | Ruta | Middleware | Descripción |
|---|---|---|---|
| POST | `/usuarios` | `validarCredenciales` | Registra un usuario con la contraseña encriptada |
| POST | `/login` | `validarCredenciales` | Verifica credenciales y devuelve `{ token }` con el email en el payload |
| GET | `/usuarios` | `validarToken` | Devuelve los datos del usuario autenticado |

Todas las consultas se reportan en la terminal con el middleware `reportarConsulta`.

## ✅ Requerimientos cumplidos

1. Registro y obtención de usuarios desde la base de datos.
2. Middlewares para verificar credenciales, validar el token y reportar consultas.
3. Firma (`jwt.sign`), verificación (`jwt.verify`) y decodificación (`jwt.decode`) de tokens.
4. Captura de errores con `try/catch`, devolviendo código de estado y `{ message }`.
5. Contraseñas encriptadas con `bcrypt.hashSync` y comparadas con `bcrypt.compareSync`.