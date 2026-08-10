require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HADOTI WALE BHAIYA API is running 🚀"
  });
});


/* =========================
   DATABASE TEST
========================= */

app.get("/api/db-test", async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT NOW() AS time"
    );

    res.json({
      success: true,
      message: "Database connected successfully",
      time: result.rows[0].time
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });

  }

});


/* =========================
   DESTINATIONS
========================= */

app.get("/api/destinations", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM destinations
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch destinations"
    });

  }

});


/* =========================
   SINGLE DESTINATION
========================= */

app.get("/api/destinations/:id", async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM destinations
      WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        success: false,
        message: "Destination not found"
      });

    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch destination"
    });

  }

});


/* =========================
   CREATE USER
========================= */

app.post("/api/users", async (req, res) => {

  try {

    const {
      name,
      email,
      phone
    } = req.body;

    if (!name) {

      return res.status(400).json({
        success: false,
        message: "Name is required"
      });

    }

    const result = await pool.query(
      `
      INSERT INTO users
      (name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, phone, created_at
      `,
      [
        name,
        email || null,
        phone || null
      ]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create user"
    });

  }

});


/* =========================
   404
========================= */

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "API route not found"
  });

});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

  console.log(
    `HADOTI WALE BHAIYA API running on port ${PORT}`
  );

});