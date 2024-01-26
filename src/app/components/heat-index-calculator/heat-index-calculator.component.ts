import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-heat-index-calculator',
  templateUrl: './heat-index-calculator.component.html',
  styleUrls: ['./heat-index-calculator.component.scss'],
  providers: [MatSnackBar]
})
export class HeatIndexCalculatorComponent {

  // Initial values for air temperature, relative humidity, and heat index
  airTemperature: number = 0;
  relativeHumidity: number = 0;
  heatIndex: number | undefined;

  // Temperature unit selection (Celsius or Fahrenheit)
  temperatureUnit: 'Celsius' | 'Fahrenheit' = 'Celsius';

  // Method to calculate the heat index
  calculateHeatIndex(): void {

    // Convert temperature to Celsius for calculation
    const temperatureCelsius = this.temperatureUnit === 'Celsius'
      ? this.airTemperature
      : this.fahrenheitToCelsius(this.airTemperature);

    // Check if temperature is below the minimum threshold
    if (temperatureCelsius < 26.7)
    {
      this.heatIndex = undefined;

      // Display a snackbar message if the temperature is below the minimum threshold
      if (this.heatIndex == undefined)
      {
        this.openSnackBar('You must set a temperature greater than 26.7°C (80°F) for heat index calculation.');
      }
    }

    else
    {
      // Calculate Heat Index based on the original temperature unit
      this.heatIndex = this.calculateHeatIndexFormula(temperatureCelsius, this.relativeHumidity);
    }
  }

  constructor(private _snackBar: MatSnackBar) {}

  // Method to display a snackbar message
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 5000, // Snackbar display duration in milliseconds (5 seconds in this case)
    });
  }

  // Helper method to convert Fahrenheit to Celsius
  private fahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5 / 9;
  }

  // Helper method to calculate the heat index using the provided formula
  private calculateHeatIndexFormula(temperatureCelsius: number, humidity: number): number {
    const T = temperatureCelsius;
    const rh = humidity;

    // Heat index calculation formula
    const heatIndex = -42.379 + (2.04901523 * T) + (10.14333127 * rh)
      - (0.22475541 * T * rh) - (6.83783e-03 * T * T)
      - (5.481717e-02 * rh * rh) + (1.22874e-03 * T * T * rh)
      + (8.5282e-04 * T * rh * rh) - (1.99e-06 * T * T * rh * rh);

    return heatIndex;
  }
}
