import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filepath = path.join(__dirname, "..", "data", "movies.json");

//const movies = JSON.parse(readFileSync(filepath)); // se lee el archivo y se parsea porque viene en binario

const readMovies = () => JSON.parse(readFileSync(filepath));

//console.log(readMovies());

const writeMovies = (movies) => {
  writeFileSync(filepath, JSON.stringify(movies));
};

export const getAllMovies = () => readMovies();

//console.log(getAllMovies());

export const getMovieByGenre = (genre) =>
  readMovies().filter((movie) =>
    movie.genre.some((movie) => movie.toLowerCase() === genre.toLowerCase())
  );

//console.log(getMovieByGenre("action"));

export const addMovie = (newMovie) => {
  const movies = readMovies();
  movies.push(newMovie);
  writeMovies(movies);
};

export const updateMovie = (id, updateMovie) => {
  const movies = readMovies();
  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies[index] = { ...movies[index], ...updateMovie };
    writeMovies(movies);
  }
};

export const deleteMovie = (id) => {
  const movies = readMovies();
  const updateMovies = movies.find((movie) => movie.id !== id);
  if (updateMovies.length < 0) return res.status(404).send("id no encontrado");
  writeMovies(updateMovies);
};

//console.log(readMovies());
//console.log(getIdMovies("6a360a18-c645-4b47-9a7b-2a71babbf3e0"));
//addMovie("hola");
