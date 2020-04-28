const app = require('../server');
const WeightService = require('../service/WeightService');

class WeightController {
  constructor() {
    app.get('/:year/:month/:day', this.getWeight);
    app.post('/:year/:month/:day', this.addWeight);
    app.put('/:year/:month/:day/', this.updateWeight);
    app.delete('/:year/:month/:day/', this.deleteWeight);

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
      const response = await WeightService.getAllWeight({ from, to });
      res.send(response);
    } catch (err) {
      console.error(err);
      res.send(err);
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
      res.send(err);
    }
  }

  async updateWeight(req, res) {
    const { year, month, day } = req.params;
    const { weight } = req.body;
    try {
      const response = await WeightService.updateWeight({ year, month, day, weight });
      res.send(response);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }

  async deleteWeight(req, res) {
    const { year, month, day } = req.params;
    try {
      const response = await WeightService.deleteWeight({ year, month, day });
      res.send(response);
    } catch (err) {
      console.error(err);
      res.send(err);
    }
  }
}

module.exports = new WeightController();