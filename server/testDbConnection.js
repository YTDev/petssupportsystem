const pool = require("./db");

async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connection successful!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  } finally {
    process.exit();
  }
}

testDbConnection();
