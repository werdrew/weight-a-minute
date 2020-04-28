const sqlite3 = require('sqlite3');

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS "date_weight_map" (
	"year"	INTEGER NOT NULL,
	"month"	INTEGER NOT NULL,
	"day"	INTEGER NOT NULL,
	"weight"	INTEGER NOT NULL,
	PRIMARY KEY("year","month","day")
);`

class DateWeightMap {
  constructor() {
    this.db = new sqlite3.Database('db.local');
    this.db.run(CREATE_TABLE);
  }

  async getWeight({ year, month, day }) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT weight FROM date_weight_map
      WHERE year = ?
      AND month = ?
      AND day = ?`, [
        year,
        month,
        day
      ], (err, row) => {
        if (err) reject(err)
        else resolve(row || { data: { weight: -1 }});
      });
    });
  }

  async addWeight({ year, month, day, weight }) {
    return new Promise((resolve, reject) => {
      this.db.run(`INSERT INTO date_weight_map (year, month, day, weight) 
      VALUES (?, ?, ?, ?)`, [
        year,
        month,
        day,
        weight
      ], (err, row) => {
        console.log(err, row);
        if (err) reject(err)
        else resolve();
      });
    });
  }

  async updateWeight({ year, month, day, weight }) {
    return new Promise((resolve, reject) => {
      this.db.run(`UPDATE date_weight_map
      SET weight = ?
      WHERE year = ? AND month = ? AND day = ?`, [
        weight,
        year,
        month,
        day,
      ], (err, row) => {
        console.log(err, row);
        if (err) reject(err)
        else resolve();
      });
    });
  }

  async deleteWeight({ year, month, day }) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM date_weight_map
      WHERE year = ?
      AND month = ?
      AND day = ?`, [
        year,
        month,
        day
      ], (err, row) => {
        console.log(err, row);
        if (err) reject(err)
        else resolve();
      });
    });
  }
}

module.exports = new DateWeightMap();