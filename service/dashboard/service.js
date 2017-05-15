'use strict';
const dbAccess    = include('common/dataAccess.js');
const query       = include('dashboard/queries.js');
const transaction = require('pg-transaction');
const Error       = include('common/exception.js');

class Dashboard {
  constructor() {
    this.dBase = new dbAccess.Operations("dashboard-service");
    this.queries = new query.Queries();
  }

  getData(res, method) {
    const base = this;
    return new Promises((resolve, reject) => {
      try {
        const query = this.queries.fetchQueryFor(method);
        base.dBase.fetch(query, dbConnectionSting)
          .then((response) => {
            return resolve({"data": response, query});
          })
          .catch((err) => {
            console.log("error in " + method + " - Service - Line#23", err);
            const error = Error.queryExecutionError(err.message + " " + method);
            return reject(error);
          });
      } catch (err) {
        const error = Error.queryExecutionError(err.message + " " + method);
        return reject(error);
      }
    });
  }
}

module.exports.Dashboard = Dashboard;
