const sqlite3 = require('sqlite3');

const CREATE_TABLE = `CREATE TABLE "date_weight_map" (
	"date"	INTEGER NOT NULL UNIQUE,
	"weight"	INTEGER NOT NULL,
	PRIMARY KEY("date")
);`

class DateWeightMap {
  constructor() {
    this.db = new sqlite3.Database('db.local');
    this.db.run(CREATE_TABLE);
  }

  getWeight() {
    
  }

  addWeight() {

  }

  updateWeight() {

  }
}

module.exports = new DateWeightMap();