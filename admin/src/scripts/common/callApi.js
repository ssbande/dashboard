export default class callApi{
  constructor($http, $q){
    console.log("http: ");
    this.http = $http;
    this.promises = $q;
  }

  post(url, request, headers){
    return this.promises((resolve, reject) => {
      this.http({
        method: "POST",
        url   : url,
        data  : request,
        headers: headers
      }).success(function (data) {
        return resolve(data);
      }).error(function(error){
        return reject(error);
      });
    });
  }

  get(url){
    return this.promises((resolve, reject) => {
      this.http({
        method: "GET",
        url   : url
      }).success(function (data) {
        return resolve(data);
      }).error(function(error){
        return reject(error);
      });
    });
  }
}
