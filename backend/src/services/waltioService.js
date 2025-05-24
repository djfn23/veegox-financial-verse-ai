const { Parser } = require('json2csv');

module.exports = {
  exportTransactionsToCSV(transactions) {
    const fields = [
      'hash',
      'from',
      'to',
      'value',
      'gas',
      'timestamp',
    ];
    const opts = { fields };
    try {
      const parser = new Parser(opts);
      return parser.parse(transactions);
    } catch (err) {
      throw new Error('Erreur export CSV Waltio: ' + err.message);
    }
  }
};
