import { Observable } from '@nativescript/core'
import { Item } from './shared/item'
import { Http, HttpResponse } from '@nativescript/core'

export class thirddayModel extends Observable {
  // items: Array<Item>
  date: String
  feels_like: String
  temp: String
  wind_speed: String
  humidity: String

  loaded() {
    Http.request({
      url: 'https://api.weather.yandex.ru/v2/forecast?lat=61.0042&lon=69.0019&lang=ru_RU&limit=3',
      method: 'GET',
      headers: {
        "X-Yandex-API-Key": "887c72b5-bb3d-4d07-9214-fc6e07a26ff9"
      }
    }).then(
      (response: HttpResponse) => {
        const content = response.content
        // The toJSON method allows you to parse the received content to JSON object
        const obj = content.toJSON();
        console.log(obj.forecasts[2].date)
        this.set('date', obj.forecasts[2].date);
        this.set('temp_min', obj.forecasts[2].parts.evening.temp_min);
        this.set('temp_max', obj.forecasts[2].parts.evening.temp_max);
        this.set('wind_speed', obj.forecasts[2].parts.evening.wind_speed);
        this.set('humidity', obj.forecasts[2].parts.evening.humidity);
        this.set('feels_like', obj.forecasts[2].parts.evening.feels_like);
      },
      e => {}
    );
  }
}
