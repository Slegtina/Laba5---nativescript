import { Http, HttpResponse } from '@nativescript/core'

export class weatherAPI {
    static lat = 55.7522;
    static lon = 37.6156;

    static today;
    static tomorrow;
    static thirdday;

    static change_coord(lat,lon): void{
      this.lat = lat;
      this.lon = lon;
      //console.log("Coord changed lat=" + lat + " lon=" + lon);
    }

    static update_weathers(){
        Http.request({
            url: 'https://api.weather.yandex.ru/v2/forecast?lat='+this.lat+'&lon='+this.lon+'&lang=ru_RU&limit=3',
            method: 'GET',
            headers: {
              "X-Yandex-API-Key": "887c72b5-bb3d-4d07-9214-fc6e07a26ff9"
            }
          }).then(
            (response: HttpResponse) => {
              const content = response.content
              // The toJSON method allows you to parse the received content to JSON object
              const obj = content.toJSON();
              this.today = {
                date: obj.forecasts[0].date,
                temp_min: obj.forecasts[0].parts.evening.temp_min,
                temp_max: obj.forecasts[0].parts.evening.temp_max,
                wind_speed: obj.forecasts[0].parts.evening.wind_speed,
                humidity: obj.forecasts[0].parts.evening.humidity,
                feels_like: obj.forecasts[0].parts.evening.feels_like
              }

              this.tomorrow = {
                date: obj.forecasts[1].date,
                temp_min: obj.forecasts[1].parts.evening.temp_min,
                temp_max: obj.forecasts[1].parts.evening.temp_max,
                wind_speed: obj.forecasts[1].parts.evening.wind_speed,
                humidity: obj.forecasts[1].parts.evening.humidity,
                feels_like: obj.forecasts[1].parts.evening.feels_like
              }

              this.thirdday = {
                date: obj.forecasts[2].date,
                temp_min: obj.forecasts[2].parts.evening.temp_min,
                temp_max: obj.forecasts[2].parts.evening.temp_max,
                wind_speed: obj.forecasts[2].parts.evening.wind_speed,
                humidity: obj.forecasts[2].parts.evening.humidity,
                feels_like: obj.forecasts[2].parts.evening.feels_like
              }
            },
            e => {}
          );

        // console.log('today = ' + this.today);
        // console.log('tomorrow = ' + this.tomorrow);
        // console.log('thirdday = ' + this.thirdday);
    }
    
}