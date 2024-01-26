import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';

// Define the base parameters for fetching weather data
interface BaseParams {
  latitude: number;
  longitude: number;
  hourly: string[];
  start_date?: string;
  end_date?: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // Method to fetch current weather data based on latitude and longitude
  async getWeatherData(latitude: number, longitude: number) {

    const params = this.getBaseParams(latitude, longitude);
    const responses = await fetchWeatherApi(this.weatherApiUrl, params);

    return this.processWeatherData(responses[0]);
  }

  // Method to fetch historical weather data for a specific date range
  async getHistoricalData(latitude: number, longitude: number, startDate: string, endDate: string) {

    const params = this.getBaseParams(latitude, longitude, startDate, endDate);
    const responses = await fetchWeatherApi(this.weatherApiUrl, params);

    return this.processWeatherData(responses[0]);
  }

  // Helper method to construct base parameters for weather data fetching
  private getBaseParams(
    latitude: number,
    longitude: number,
    startDate?: string,
    endDate?: string
  ): BaseParams {
    const baseParams: BaseParams = {
      latitude,
      longitude,
      hourly: ["temperature_2m", "relative_humidity_2m", "weather_code", "surface_pressure"],
    };

    // Include start_date and end_date if provided (for historical data)
    if (startDate && endDate)
    {
      baseParams.start_date = startDate;
      baseParams.end_date = endDate;
    }

    return baseParams;
  }

  // Helper method to process the raw weather data response
  private processWeatherData(response: any) {

    // Extract UTC offset and hourly data from the response
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;

    // Return processed weather data in a structured format
    return {

      time: this.range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
        (t) => new Date((t + utcOffsetSeconds) * 1000)
      ),

      temperature2m: hourly.variables(0)!.valuesArray()!,
      relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
      weatherCode: hourly.variables(2)!.valuesArray()!,
      surfacePressure: hourly.variables(3)!.valuesArray()!,
    };
  }

  // Helper method to generate an array of numbers within a specified range and step
  private range(start: number, stop: number, step: number): number[] {

    return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  }

  // Base URL for the weather API
  private readonly weatherApiUrl = "https://api.open-meteo.com/v1/forecast";
}
