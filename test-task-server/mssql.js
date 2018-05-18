var config = require("./config");

const sql = require('mssql')
const pool = sql.connect(config.mssql);

async function Read (callback) {
  try {
    const result = await sql.query`select * from things`
    callback(result.recordset)
  } catch (err) {
    // ... error checks
  }
}

async function Write (data, callback) {
  try {
    const result = await sql.query`insert into things values(${data.column1},${data.column2})`
    callback()
  } catch (err) {
    // ... error checks
  }
}

async function Remove (id, callback) {
  try {
    const result = await sql.query`delete from things where id = ${id}`
    callback()
  } catch (err) {
    // ... error checks
  }
}

module.exports = {
  "Read": Read,
  "Write": Write,
  "Remove": Remove
};