'use strict';
const service = include('dashboard/service.js');

class Controller{
  constructor(){
    this.svc = new service.Dashboard();
  }

  get(res, method){
    this.svc.getData(res, method)
      .then((response) => {
        // received success response from the service
        res.send({"resultCode": 0, response});
      })
      .catch((error) => {
        console.log("error occurred in controller - " + method, error);
        res.send(error);
      })
  }
}

module.exports.Controller = Controller;