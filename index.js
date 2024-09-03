import express from "express";
import { corsMiddleware } from "./middleware/cors.js";
import { movieRouter } from "./router/movies.js";

const app = express();

app.disable("x-powered-by"); // quitar la acbecera que trae por default express esto es por seguridad

app.use(express.json()); //se encarga de guardar la informacion en req.body del post patch put y va en el archivo principal

app.use(corsMiddleware()); // para permitir que la api se conecte a las urls permitidas solamente

app.use("/movies", movieRouter); // cuando acceda a /movies va a realizar todo lo que hay en el archivo movies.js del router

const PUERTO = process.env.PORT || 1234;
app.listen(PUERTO, () => {
  console.log(`el servidor esta escuchando http://localhost:${PUERTO}`);
});

export default app;
