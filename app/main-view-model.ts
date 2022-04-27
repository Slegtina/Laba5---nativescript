import { EventData, ListPicker, Observable } from '@nativescript/core'

import { weatherAPI } from './shared/weather_api'

const cities = ['Москва', 'Санкт-Петербург', 'Ханты-Мансийск'];
const coordinates = {
    'Москва': {lat: 55.7522, lon: 37.6156},
    'Санкт-Петербург': {lat: 59.9386, lon: 30.3141},
    'Ханты-Мансийск': {lat: 61.0042, lon: 69.0019},
}

export class MainViewModel extends Observable {
    cities = ['Москва', 'Санкт-Петербург', 'Ханты-Мансийск'];

    date1: String;
    feels_like1: String;
    temp_min1: String;
    temp_max1: String;
    wind_speed1: String;
    humidity1: String;

    date2: String;
    feels_like2: String;
    temp_min2: String;
    temp_max2: String;
    wind_speed2: String;
    humidity2: String;

    date3: String;
    feels_like3: String;
    temp_min3: String;
    temp_max3: String;
    wind_speed3: String;
    humidity3: String;

    id = setInterval(() => {
        weatherAPI.update_weathers();
        const today = weatherAPI.today;
        const tomorrow = weatherAPI.tomorrow;
        const thirdday = weatherAPI.thirdday;
        if (today !== undefined){
            this.set('date1', today.date);
            this.set('temp_min1', today.temp_min);
            this.set('temp_max1', today.temp_max);
            this.set('feels_like1', today.feels_like);
            this.set('wind_speed1', today.wind_speed);
            this.set('humidity1', today.humidity);
        }

        if (tomorrow !== undefined){
            this.set('date2', tomorrow.date);
            this.set('temp_min2', tomorrow.temp_min);
            this.set('temp_max2', tomorrow.temp_max);
            this.set('feels_like2', tomorrow.feels_like);
            this.set('wind_speed2', tomorrow.wind_speed);
            this.set('humidity2', tomorrow.humidity);
        }

        if (thirdday !== undefined){
            this.set('date3', thirdday.date);
            this.set('temp_min3', thirdday.temp_min);
            this.set('temp_max3', thirdday.temp_max);
            this.set('feels_like3', thirdday.feels_like);
            this.set('wind_speed3', thirdday.wind_speed);
            this.set('humidity3', thirdday.humidity);
        }
        }, 1000);

    constructor() {
        super()
    }

    onListPickerLoaded(args){
        const listPicker = args.object;
        listPicker.on('selectedIndexChange', (event: EventData) => {
            const picker = event.object as ListPicker;
            const city = cities[picker.selectedIndex];
            weatherAPI.change_coord(coordinates[city].lat, coordinates[city].lon);
        })
   }

   
}