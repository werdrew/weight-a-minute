const DateWeightMap = require('../model/DateWeightMap');

class WeightService {
  async getWeight({ year, month, date }) {

  }

  async addWeight({ year, month, day, weight }) {
    try {
      return await DateWeightMap.addWeight({ year, month, day, weight });
    } catch (err) {
      throw err;
    }
  }

  async updateWeight({ year, month, day, weight }) {
    try {
      return await DateWeightMap.updateWeight({ year, month, day, weight });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new WeightService();