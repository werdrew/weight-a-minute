const app = require('../server');
const WeightService = require('../service/WeightService');

class WeightController {
  constructor() {
    app.get('/:year/:month/:day', this.getWeight);
    app.post('/:year/:month/:day', this.addWeight);
    app.put('/:year/:month/:day/', this.updateWeight);
  }

  getWeight(req, res) {
    const { year, month, day } = req.params;
  }

  addWeight(req, res) {
    const { year, month, day } = req.params;
    const { weight } = body;
  }

  updateWeight(req, res) {
    const { year, month, day } = req.params;
    const { weight } = req.body;
  }
}

module.exports = new WeightController();