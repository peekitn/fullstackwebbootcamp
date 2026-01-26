import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
const port = 3000;

let quiz = [];
let totalCorrect = 0;
let currentQuestion = {};

async function startServer() {
  try {
    await db.connect();
    const res = await db.query("SELECT * FROM capitals");
    quiz = res.rows;
    console.log("Data loaded from database");

    // Middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));

    // GET home page
    app.get("/", (req, res) => {
      totalCorrect = 0;
      nextQuestion();
      console.log(currentQuestion);
      res.render("index.ejs", { question: currentQuestion });
    });

    // POST a new post
    app.post("/submit", (req, res) => {
      let answer = req.body.answer.trim();
      let isCorrect = false;
      // Verifica se currentQuestion e currentQuestion.capital existem
      if (currentQuestion && currentQuestion.capital) {
        if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
          totalCorrect++;
          console.log(totalCorrect);
          isCorrect = true;
        }
      } else {
        console.log("currentQuestion or capital is undefined");
      }

      nextQuestion();
      res.render("index.ejs", {
        question: currentQuestion,
        wasCorrect: isCorrect,
        totalScore: totalCorrect,
      });
    });

    function nextQuestion() {
      // Verifica se quiz tem elementos
      if (quiz.length > 0) {
        const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
        currentQuestion = randomCountry;
      } else {
        console.log("Quiz array is empty");
        currentQuestion = {}; // Define como objeto vazio para evitar erros
      }
    }

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
  }
}

// Inicia o servidor
startServer();