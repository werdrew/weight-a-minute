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
    this.db = new sqlite3.Database(process.env.DB_PATH);
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

  async getAllWeight({ fromYear, fromMonth, fromDay, toYear, toMonth, toDay }) {
    let sql = ``;
    let params = [];
    const union = 'UNION\n';
    if (fromYear !== toYear) {
      const fromSql = `SELECT * FROM date_weight_map
      WHERE year = ?
      AND month = ?
      AND day >= ?
      ${union}
      SELECT * FROM date_weight_map
      WHERE year = ?
      AND month > ?\n`;
      const toSql = `SELECT * FROM date_weight_map
      WHERE year = ?
      AND month = ?
      AND day <= ?
      ${union}
      SELECT * FROM date_weight_map
      WHERE year = ?
      AND month < ?`;
      sql = fromSql + union + toSql;
      params = params.concat([
        fromYear, fromMonth, fromDay,
        fromYear, fromMonth,
        toYear, toMonth, toDay,
        toYear, toMonth
      ]);
    }
    else if (fromMonth !== toMonth) {
      const fromSql = `SELECT * FROM date_weight_map
      WHERE year = ?
      AND month = ?
      AND day >= ?\n`;
      const toSql = `SELECT * FROM date_weight_map
      WHERE year = ?
      AND month = ?
      AND day <= ?`;
      sql = fromSql + union + toSql;
      params = params.concat([
        fromYear, fromMonth, fromDay,
        toYear, toMonth, toDay
      ]);
    }
    else {
      sql = `SELECT * FROM date_weight_map
      WHERE year >= ? AND year <= ?
      AND month >= ? AND month <= ?
      AND day >= ? AND day <= ?;`
      params = params.concat([
        fromYear, toYear,
        fromMonth, toMonth,
        fromDay, toDay
      ]);
    };
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, row) => {
        if (err) reject (err);
        else resolve(row || { data: []});
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
        if (err) reject(err)
        else resolve();
      });
    });
  }
}

module.exports = new DateWeightMap();