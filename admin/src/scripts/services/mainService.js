import callApi from './../common/callApi.js';

export default class mainService{
  constructor($http, $q){
    this.http = $http;
    this.promise = $q;
    this.api = new callApi($http, $q);
    this.baseUrl = "http://localhost:3131/";
  }

  getDataFromApi(restMethod, action){
    const url = this.baseUrl + action;
    return this.promise((resolve, reject) => {
      if(restMethod.toUpperCase() === "GET"){
        return this.api.get(url)
            .then((response) => {
              if(response.resultCode == 0){
                return resolve(response);
              }

              if(response.resultCode == 1){
                return reject(response);
              }
            })
            .catch((err) => {
              console.log("error occurred - " + action, JSON.stringify(err));
              return reject(err);
            });
      }
    });
  }
}
