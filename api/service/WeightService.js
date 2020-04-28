const DateWeightMap = require('../model/DateWeightMap');

class WeightService {
  async getWeight({ year, month, day }) {
    try {
      return await DateWeightMap.getWeight({ year, month, day });
    } catch (err) {
      throw err;
    }
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

  async deleteWeight({ year, month, day }) {
    try {
      return await DateWeightMap.deleteWeight({ year, month, day });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new WeightService();