'use strict';
const pg             = require('pg');
const transaction    = require('pg-transaction');
const Error =  include('common/exception.js');
pg.defaults.poolSize = 50;

/**
 * Data operations class.
 * This will handle all the operations related to the database.
 */
class Operations {
  /**
   * select query
   * @param query     - query to be executed.
   * @param db        - database on which the query has to be fired.
   * @param callback  - callback method if needed.
   * @returns {*}     - query result.
   */
  fetch(query, db) {
    return new Promises((resolve, reject) => {
      pg.connect(db, (err, client, done) => {
        if (err) {
          done();
          var error = Error.dbConnectionError(err.message);
          return reject(error);
        }

        client.query(query.value, (err, result) => {
          done();
          if (err) {
            var error = Error.queryExecutionError(err.message);
            return reject(error);
          }

          //console.log("response: ", result.rows);
          return resolve(result.rows);
        });
      });
    });
  }
}

module.exports.Operations = Operations;
