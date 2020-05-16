const app = require('../server');
const WeightService = require('../service/WeightService');

class WeightController {
  constructor() {
    app.get('/weight/:year/:month/:day', this.getWeight);
    app.post('/weight/:year/:month/:day', this.addWeight);
    app.put('/weight/:year/:month/:day/', this.updateWeight);
    app.delete('/weight/:year/:month/:day/', this.deleteWeight);

    app.get('/weight', this.getAllWeight);
  }

  async getWeight(req, res) {
    const { year, month, day } = req.params;
    try {
      const response = await WeightService.getWeight({ year, month, day });
      res.send(response);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }

  async getAllWeight(req, res) {
    const { from, to } = req.query;
    try {
      const [fromYear, fromMonth, fromDay] = from.split('/').map(intStr => parseInt(intStr));
      const [toYear, toMonth, toDay] = to.split('/').map(intStr => parseInt(intStr));

      if (fromYear > toYear) {
        throw `Error: Invalid range. From year {${fromYear}} must be <= to year {${toYear}}!`;
      }
      else if (fromYear === toYear && fromMonth > toMonth) {
        throw `Error: Invalid range. From month {${fromMonth}} must be <= to month {${toMonth}}!`;
      }
      else if (fromMonth === toMonth && fromDay > toDay) {
        throw `Error: Invalid range. From day {${fromDay}} must be <= to day {${toDay}}!`;
      };
      
      const response = await WeightService.getAllWeight({ 
        fromYear,
        fromMonth,
        fromDay,
        toYear,
        toMonth,
        toDay
       });
      res.send({ rows: response });
    } catch (err) {
      console.error(err);
      res.send({ rows: [], err });
    }
  }

  async addWeight(req, res) {
    const { year, month, day } = req.params;
    const { weight } = req.body;
    try {
      const response = await WeightService.addWeight({ year, month, day, weight });
      res.send(response);
    } catch (err) {
      console.error(err);
      res.send({ err: `Error: A weight has already been submitted for this date. Please update instead of submitting.` });
    }
  }

  async updateWeight(req, res) {
    const { year, month, day } = req.params;
    const { weight } = req.body;
    try {
      const response = await WeightService.updateWeight({ year, month, day, weight });
      if (!response.changes) {
        throw `Error: No changes made. Please submit a weight for this date before trying to update it.`
      }
      res.send(response);
    } catch (err) {
      console.error(err);
      res.send({ err });
    }
  }

  async deleteWeight(req, res) {
    const { year, month, day } = req.params;
    try {
      const response = await WeightService.deleteWeight({ year, month, day });
      if (!response.changes) {
        throw `Error: No changes made. Please submit a weight for this date before trying to delete it.`
      }
      res.send(response);
    } catch (err) {
      console.error(err);
      res.send({ err });
    }
  }
}

module.exports = new WeightController();