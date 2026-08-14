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


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "HADOTI WALE BHAIYA API is running 🚀"
  });

});


/* =========================================================
   DATABASE TEST
========================================================= */

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

    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });

  }

});


/* =========================================================
   ALL DESTINATIONS
========================================================= */

app.get("/api/destinations", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM destinations
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("Destinations API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch destinations"
    });

  }

});


/* =========================================================
   SINGLE DESTINATION
========================================================= */

app.get("/api/destinations/:id", async (req, res) => {

  try {

    const destinationId = Number(req.params.id);

    if (!Number.isInteger(destinationId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid destination ID"
      });

    }

    const result = await pool.query(
      `
      SELECT *
      FROM destinations
      WHERE id = $1
      `,
      [destinationId]
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

    console.error("Single destination error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch destination"
    });

  }

});


/* =========================================================
   CREATE USER
========================================================= */

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

    console.error("Create user error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create user"
    });

  }

});


/* =========================================================
   WORLD LOCATION APIs

   Country
      ↓
   State / Province
      ↓
   District
      ↓
   City
      ↓
   Destination
========================================================= */


/* =========================================================
   ALL COUNTRIES
========================================================= */

app.get("/api/countries", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        id,
        name,
        code,
        slug,
        continent,
        description,
        image_url,
        created_at
      FROM countries
      ORDER BY name ASC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("Countries API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch countries"
    });

  }

});


/* =========================================================
   STATES / PROVINCES
   BY COUNTRY
========================================================= */

app.get("/api/countries/:countryId/states", async (req, res) => {

  try {

    const countryId = Number(req.params.countryId);

    if (!Number.isInteger(countryId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid country ID"
      });

    }

    const result = await pool.query(
      `
      SELECT
        id,
        country_id,
        name,
        slug,
        description,
        image_url,
        created_at
      FROM states
      WHERE country_id = $1
      ORDER BY name ASC
      `,
      [countryId]
    );

    res.json({
      success: true,
      country_id: countryId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("States API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch states"
    });

  }

});


/* =========================================================
   DISTRICTS
   BY STATE
========================================================= */

app.get("/api/states/:stateId/districts", async (req, res) => {

  try {

    const stateId = Number(req.params.stateId);

    if (!Number.isInteger(stateId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid state ID"
      });

    }

    const result = await pool.query(
      `
      SELECT
        id,
        state_id,
        name,
        slug,
        description,
        image_url,
        created_at
      FROM districts
      WHERE state_id = $1
      ORDER BY name ASC
      `,
      [stateId]
    );

    res.json({
      success: true,
      state_id: stateId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("Districts API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch districts"
    });

  }

});


/* =========================================================
   CITIES
   BY DISTRICT
========================================================= */

app.get("/api/districts/:districtId/cities", async (req, res) => {

  try {

    const districtId = Number(req.params.districtId);

    if (!Number.isInteger(districtId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid district ID"
      });

    }

    const result = await pool.query(
      `
      SELECT
        id,
        district_id,
        state_id,
        country_id,
        name,
        slug,
        latitude,
        longitude,
        description,
        image_url,
        created_at
      FROM cities
      WHERE district_id = $1
      ORDER BY name ASC
      `,
      [districtId]
    );

    res.json({
      success: true,
      district_id: districtId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("Cities API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch cities"
    });

  }

});


/* =========================================================
   DESTINATIONS
   BY CITY
========================================================= */

app.get("/api/cities/:cityId/destinations", async (req, res) => {

  try {

    const cityId = Number(req.params.cityId);

    if (!Number.isInteger(cityId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid city ID"
      });

    }

    const result = await pool.query(
      `
      SELECT
        id,
        country_id,
        state_id,
        district_id,
        city_id,
        name,
        slug,
        category,
        short_description,
        description,
        history,
        culture,
        geography,
        architecture,
        best_time,
        weather_info,
        entry_fee,
        opening_time,
        closing_time,
        latitude,
        longitude,
        parking_available,
        image_url,
        video_url,
        map_url,
        average_rating,
        total_reviews,
        is_featured,
        is_verified,
        is_active,
        created_at,
        updated_at
      FROM destinations
      WHERE city_id = $1
        AND is_active = TRUE
      ORDER BY is_featured DESC, name ASC
      `,
      [cityId]
    );

    res.json({
      success: true,
      city_id: cityId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("City destinations API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch city destinations"
    });

  }

});

/* =========================================================
   WORLD LOCATION APIs
   Country → State/Province → District → City → Destination
========================================================= */


/* =========================================================
   ALL COUNTRIES
========================================================= */

app.get("/api/countries", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT
        id,
        name,
        code,
        slug,
        continent,
        description,
        image_url,
        created_at
      FROM countries
      ORDER BY name ASC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("Countries API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch countries"
    });

  }

});


/* =========================================================
   STATES / PROVINCES BY COUNTRY
========================================================= */

app.get("/api/countries/:countryId/states", async (req, res) => {

  try {

    const countryId = Number(req.params.countryId);

    if (!Number.isInteger(countryId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid country ID"
      });

    }

    const result = await pool.query(`
      SELECT
        id,
        country_id,
        name,
        slug,
        description,
        image_url,
        created_at
      FROM states
      WHERE country_id = $1
      ORDER BY name ASC
    `, [countryId]);

    res.json({
      success: true,
      country_id: countryId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("States API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch states"
    });

  }

});


/* =========================================================
   DISTRICTS BY STATE
========================================================= */

app.get("/api/states/:stateId/districts", async (req, res) => {

  try {

    const stateId = Number(req.params.stateId);

    if (!Number.isInteger(stateId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid state ID"
      });

    }

    const result = await pool.query(`
      SELECT
        id,
        state_id,
        name,
        slug,
        description,
        image_url,
        created_at
      FROM districts
      WHERE state_id = $1
      ORDER BY name ASC
    `, [stateId]);

    res.json({
      success: true,
      state_id: stateId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("Districts API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch districts"
    });

  }

});


/* =========================================================
   CITIES BY DISTRICT
========================================================= */

app.get("/api/districts/:districtId/cities", async (req, res) => {

  try {

    const districtId = Number(req.params.districtId);

    if (!Number.isInteger(districtId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid district ID"
      });

    }

    const result = await pool.query(`
      SELECT
        id,
        district_id,
        state_id,
        country_id,
        name,
        slug,
        latitude,
        longitude,
        description,
        image_url,
        created_at
      FROM cities
      WHERE district_id = $1
      ORDER BY name ASC
    `, [districtId]);

    res.json({
      success: true,
      district_id: districtId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("Cities API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch cities"
    });

  }

});


/* =========================================================
   DESTINATIONS BY CITY
========================================================= */

app.get("/api/cities/:cityId/destinations", async (req, res) => {

  try {

    const cityId = Number(req.params.cityId);

    if (!Number.isInteger(cityId)) {

      return res.status(400).json({
        success: false,
        message: "Invalid city ID"
      });

    }

    const result = await pool.query(`
      SELECT
        id,
        country_id,
        state_id,
        district_id,
        city_id,
        name,
        slug,
        category,
        short_description,
        description,
        history,
        culture,
        geography,
        architecture,
        best_time,
        weather_info,
        entry_fee,
        opening_time,
        closing_time,
        latitude,
        longitude,
        parking_available,
        image_url,
        video_url,
        map_url,
        average_rating,
        total_reviews,
        is_featured,
        is_verified,
        is_active,
        created_at,
        updated_at
      FROM destinations
      WHERE city_id = $1
        AND is_active = TRUE
      ORDER BY is_featured DESC, name ASC
    `, [cityId]);

    res.json({
      success: true,
      city_id: cityId,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {

    console.error("City destinations API error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch city destinations"
    });

  }

});
/* =========================================================
   404 HANDLER

   IMPORTANT:
   यह सभी API routes के बाद होना चाहिए।
========================================================= */

app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "API route not found"
  });

});


/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {

  console.log(
    `HADOTI WALE BHAIYA API running on port ${PORT}`
  );

});