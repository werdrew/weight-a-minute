const app = require('../server');
const WeightService = require('../service/WeightService');

class WeightController {
  constructor() {
    app.get('/:date', this.getWeight);
    app.post('/:date', this.addWeight);
    app.put('/:date/:weight', this.updateWeight);
  }

  getWeight(req, res) {
    
  }

  addWeight(req, res) {

  }

  updateWeight(req, res) {

  }
}

module.exports = new WeightController();