import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { 
    countries: countries, 
    total: countries.length,
    error: req.query.error // Add error handling in template
  });
});

// INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    // First, check if the country exists in the countries table
    const countryResult = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE LOWER($1)",
      [`%${input}%`]
    );

    if (countryResult.rows.length === 0) {
      // Country not found
      return res.redirect("/?error=Country not found. Try again.");
    }

    const countryCode = countryResult.rows[0].country_code;

    // Check if country is already in visited_countries
    const visitedResult = await db.query(
      "SELECT * FROM visited_countries WHERE country_code = $1",
      [countryCode]
    );

    if (visitedResult.rows.length > 0) {
      // Country already exists
      return res.redirect("/?error=Country has already been added.");
    }

    // Insert the new country
    await db.query(
      "INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countryCode]
    );
    
    res.redirect("/");
    
  } catch (err) {
    console.error("Error adding country:", err);
    res.redirect("/?error=Something went wrong. Please try again.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});