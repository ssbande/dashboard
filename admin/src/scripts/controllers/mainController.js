import mainService from './../services/mainService.js';

export default class mainController {
  constructor($http, $q, $timeout, $window, $interval, underscore) {
    this.http = $http;
    this.q = $q;
    this.timeout = $timeout;
    this.window = $window;

    this.baseLanguage = localStorage.getItem('baseLanguage') || "en-US";  // ja-JP
    console.log("base language: ", this.baseLanguage);
    this.service = new mainService($http, $q);

    this.mainLoadingDivText = this.baseLanguage === "ja-JP" ? "取得の設定 ..." : "Getting Configurations ...";
    this.allDataLoaded = false;

    // Refreshing time every minute for all timezones.
    const me = this;
    $interval(function () {
      me.timeZones = _.map(me.allTimeZones, (tz) => {
        return {
          name: tz.key_text,
          time: me.getTimeZoneDate(tz.key_text, tz.value_text)
        };
      });
    }, 60000);



    // const loadingMessages = ["Getting Configuration ...", "Setting up environment ...", "Fetching data ...", "Preparing charts ... ", "Almost done ...", "Still Loading. Please wait ..."];
    // let tick = 0;
    // const base = this;
    // $interval(function () {
    //   tick++;
    //   if(tick <= 4 && !base.dataLoaded){
    //     base.mainLoadingDivText = loadingMessages[tick];
    //   } else{
    //     if(!base.dataLoaded){
    //       base.mainLoadingDivText = loadingMessages[5];
    //     }
    //   }
    // }, 1000);
    this.doAdelay()
    .then((delayOver) => {
      this.getAllDataSetup();
    });
  }

  doAdelay(){
    const base = this;
    return base.q((resolve, resject) => {
      setTimeout(function(){
        console.log("now waiting");
        return resolve(true);
      }, 5000);
    });
  }

  translate(){
    this.baseLanguage === "en-US" ? localStorage.setItem('baseLanguage', 'ja-JP') : localStorage.setItem('baseLanguage', 'en-US');
  }

  getConfigurationForArea(data, criteria, key){
    const orderByKey = key || 'id';
    return _.sortBy(_.where(data, {area: criteria}), orderByKey);

    // if(firstOnly){
    //   return _.findWhere(data, {[firstOnly.key]: firstOnly.value});
    // }else{
    //
    // }
  }

  getTimeZoneDate(timeZone, zone) {
   if(timeZone === 'UTC'){
     const utcZone     = timeZone;
     const utcFullDate = moment().utc().format();
     const utcTime     = moment(utcFullDate).utc().format("HH:mm");
     const utcDay      = moment(utcFullDate).utc().format("dddd");
     const utcDate     = moment(utcFullDate).utc().format("DD MMM YYYY");

     return {
       zone: utcZone, zoneDate: utcFullDate, time: utcTime, day: utcDay, date: utcDate
     };
   }

   //const zone     = this.constants.getZoneFromTimeZone(timeZone);
   const zoneDate = moment().tz(zone).format();
   const time     = moment(zoneDate).tz(zone).format("HH:mm");
   const day      = moment(zoneDate).tz(zone).format("dddd");
   const date     = moment(zoneDate).tz(zone).format("DD MMM YYYY");

   return {
     zone, zoneDate, time, day, date
   };
 }

  getAllDataSetup(){
    const isJapanese = this.baseLanguage === "ja-JP";
    this.service.getDataFromApi("GET", "getConfiguration")
      .then((result) => {
        if(result.resultCode === 0){
          const resultData = result.response.data;
          this.loadingMessages = this.getConfigurationForArea(resultData, "LT", "key_text"); //_.sortBy(_.where(result.response.data, {area: "LT"}), 'key_text');

          // Manage the app heading
          const headRow = _.findWhere(result.response.data, {key_text: "dashboard_name"}); // this.getConfigurationForArea(resultData, "", "", {key: "key_text", value: "dashboard_name"}); //
          this.appHeading = isJapanese ? headRow.jpn_value : headRow.value_text;

          // Get timezone details
          this.allTimeZones = this.getConfigurationForArea(resultData, "TZ"); //_.sortBy(_.where(result.response.data, {area: "TZ"}), 'id');
          this.timeZones = _.map(this.allTimeZones, (tz) => {
            return {
              name: tz.key_text,
              time: this.getTimeZoneDate(tz.key_text, tz.value_text)
            };
          });

          console.log("timezones: ", JSON.stringify(this.timeZones));
          // Chaging the Loading Text as per the language selected.
          this.mainLoadingDivText = isJapanese ? this.loadingMessages[1].jpn_value : this.loadingMessages[1].value_text;

          // Assign the result and show the header and footer.
          this.configurations = result.response.data;
          this.showHeaderAndFooter = true;
          return this.doAdelay();
        }
      })
      .then((delayOver) => {
        this.mainLoadingDivText = isJapanese ? this.loadingMessages[2].jpn_value : this.loadingMessages[2].value_text;
      })
      .catch((error) => {

      });
  }
}
