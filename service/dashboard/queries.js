'use strict';
class Queries{
  fetchQueryFor(id){
    return this[id]();
  }

  getConfiguration(){
    const query = "select * from dashboard.configuration";
    return {
      key   : "getConfiguration",
      value : query
    };
  }
}

module.exports.Queries = Queries;