const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",      // your MySQL password
  database: "glodias_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

app.get("/verify/:credentialId", (req, res) => {
  const { credentialId } = req.params;

  db.query(
    "SELECT * FROM certificates WHERE credential_id = ?",
    [credentialId],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.json({ success: false });
      }

      res.json({ success: true, data: result[0] });
    }
  );
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
