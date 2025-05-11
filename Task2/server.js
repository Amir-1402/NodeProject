const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

// יצירת חיבור למסד הנתונים
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // שנה לפי הסיסמה שלך
  database: "articles_db", // ודא שהמסד קיים
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

app.post("/articles", (req, res) => {
  const { title, content, author } = req.body;
  const sql = `INSERT INTO articles (title, content, author) VALUES (?, ?, ?)`;
  db.query(sql, [title, content, author], (err, result) => {
    if (err) throw err;
    res.send({ message: "Article added successfully", id: result.insertId });
  });
});

app.get("/articles", (req, res) => {
  db.query(`SELECT * FROM articles`, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/articles/:id", (req, res) => {
  db.query(
    `SELECT * FROM articles WHERE id = ?`,
    [req.params.id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
});
app.delete("/articles/:id", (req, res) => {
  db.query(
    `DELETE FROM articles WHERE id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send({ message: "Article deleted successfully" });
    }
  );
});

app.get("/articles/author/:author", (req, res) => {
  db.query(
    `SELECT * FROM articles WHERE author = ?`,
    [req.params.author],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get("/articles/after/:date", (req, res) => {
  db.query(
    `SELECT * FROM articles WHERE created_at > ?`,
    [req.params.date],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get("/articles/sorted/by-date", (req, res) => {
  db.query(
    `SELECT * FROM articles ORDER BY created_at DESC`,
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get("/articles/count", (req, res) => {
  db.query(`SELECT COUNT(*) AS count FROM articles`, (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.get("/articles/search/:keyword", (req, res) => {
  db.query(
    `SELECT * FROM articles WHERE title LIKE ?`,
    [`%${req.params.keyword}%`],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.get("/articles/authors", (req, res) => {
  db.query(`SELECT DISTINCT author FROM articles`, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});



// התחלת השרת
app.listen(9000, () => {
  console.log("Server running on http://localhost:9000");
});









