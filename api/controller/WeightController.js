const app = require('../server');
const WeightService = require('../service/WeightService');

class WeightController {
  constructor() {
    app.get('/:year/:month/:day', this.getWeight);
    app.post('/:year/:month/:day', this.addWeight);
    app.put('/:year/:month/:day/', this.updateWeight);
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
}

module.exports = new WeightController();