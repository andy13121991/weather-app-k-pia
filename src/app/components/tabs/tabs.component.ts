import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabsComponent implements OnInit {

  // Hold current weather data
  weatherData: any = {};

  // Hold historical weather data
  historicalData: any = {};

  // Hold data for charts, initially containing only temperatureWithDate
  chartsData: any = {
    temperatureWithDate: []
  };

  // Combined data for displaying in tabs
  combinedData: { label: string, data: any }[] = [];

  constructor(private weatherService: WeatherService, private sharedService: SharedService) {}

  ngOnInit() {

    // NYC coordinates for demonstration
    const latitude = 40.7143;
    const longitude = -74.006;

    // Fetch current weather data
    this.weatherService.getWeatherData(latitude, longitude).then((data) => {
      this.weatherData = data;

      // Extract temperatures and dates from weatherData
      const temperatures = this.weatherData.temperature2m || [];
      const dates = this.weatherData.time || [];

      // Ensure that both temperature and date arrays have the same length
      const minLength = Math.min(temperatures.length, dates.length);

      // Create data structure for charts
      for (let i = 0; i < minLength; i++) {
        this.chartsData.temperatureWithDate.push({
          date: new Date(dates[i]),
          temperature: temperatures[i]
        });
      }

      // Update shared service with charts data
      this.sharedService.updateChartsData(this.chartsData);

      // Update combinedData
      this.updateCombinedData();
    });

    // Fetch historical weather data
    const startDate = "2024-01-15";
    const endDate = "2024-01-21";

    this.weatherService.getHistoricalData(latitude, longitude, startDate, endDate).then((historicData) => {
      this.historicalData = historicData;

      // Update combinedData
      this.updateCombinedData();
    });
  }

  // Helper method to update combinedData when both weatherData and historicalData are available
  private updateCombinedData() {

    // Ensure both weatherData and historicalData are available before updating combinedData
    if (this.weatherData && this.historicalData)
    {
      // Combine current weather data and historical data for displaying in tabs
      this.combinedData = [
        { label: 'Weather Table', data: this.weatherData },
        { label: 'Historical Table', data: this.historicalData }
      ];
    }
  }
}
