import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss'],
  providers: [DatePipe, DecimalPipe], // Add DatePipe as a provider
})
export class WeatherTableComponent {
  @Input() data: any = {};

  // Mapping of weather condition codes to human-readable descriptions
  weatherConditionMap: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog and depositing rime fog',
    48: 'Fog and depositing rime fog',
    51: 'Drizzle: Light intensity',
    53: 'Drizzle: Moderate intensity',
    55: 'Drizzle: Dense intensity',
    56: 'Freezing Drizzle: Light intensity',
    57: 'Freezing Drizzle: Dense intensity',
    61: 'Rain: Slight intensity',
    63: 'Rain: Moderate intensity',
    65: 'Rain: Heavy intensity',
    66: 'Freezing Rain: Light intensity',
    67: 'Freezing Rain: Heavy intensity',
    71: 'Snow fall: Slight intensity',
    73: 'Snow fall: Moderate intensity',
    75: 'Snow fall: Heavy intensity',
    77: 'Snow grains',
    80: 'Rain showers: Slight intensity',
    81: 'Rain showers: Moderate intensity',
    82: 'Rain showers: Violent intensity',
    85: 'Snow showers: Slight intensity',
    86: 'Snow showers: Heavy intensity',
    95: 'Thunderstorm: Slight or moderate',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };

  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe) {}

  // Format date and time from a string
  formatDateTime(date: string | null): { date: string, time: string } {

    if (date)
    {
      const formattedDate = this.datePipe.transform(date, 'dd.MM.yyyy');
      const formattedTime = this.datePipe.transform(date, 'HH:mm');
      return { date: formattedDate || '', time: formattedTime || '' };
    }

    else
    {
      return { date: '', time: '' };
    }
  }

  // Format temperature to a string with one decimal place
  formatTemperature(temperature: number | null): string {

    if (temperature !== null && !isNaN(temperature))
    {

      // Round the temperature to one decimal place
      const roundedTemperature = Math.round(temperature * 10) / 10;

      // Format the rounded temperature
      return this.decimalPipe.transform(roundedTemperature, '1.0-1') + ' °C';
    }

    else
    {
      return '';
    }
  }

  // Format surface pressure to a string with two decimal places
  formatSurfacePressure(surfacePressure: number | null): string {

    if (surfacePressure !== null && !isNaN(surfacePressure))
    {

      // Round the surface pressure to two decimal places
      const roundedSurfacePressure = Math.round(surfacePressure * 100) / 100;

      // Format the rounded surface pressure
      return this.decimalPipe.transform(roundedSurfacePressure, '1.2-2') + ' hPa';
    }

    else
    {
      return '';
    }
  }

  // Map weather condition code to its description or return 'Unknown'
  mapWeatherCondition(code: number): string {
    return this.weatherConditionMap[code] || 'Unknown';
  }
}
