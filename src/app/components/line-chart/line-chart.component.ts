import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChartDataset, ChartOptions } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  providers: [DatePipe]
})
export class LineChartComponent implements OnInit, OnDestroy {

  // Hold charts data received from the shared service
  chartsData: any = { temperatureWithDate: [] };

  // Subscription to the shared service for receiving updates
  chartsDataSubscription: Subscription;

  // Data and options for the line chart
  lineChartData: ChartDataset[] = [{ data: [], label: '°C' }];
  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartType = 'line';

  constructor(private sharedService: SharedService, private datePipe: DatePipe) {

    // Subscribe to the shared service to receive updates
    this.chartsDataSubscription = this.sharedService.chartsData$.subscribe(data => {
      this.chartsData = data;
      this.updateChart();
    });
  }

  ngOnInit() {

    // Initial chart update
    this.updateChart();
  }

  ngOnDestroy() {

    // Unsubscribe to avoid memory leaks
    this.chartsDataSubscription.unsubscribe();
  }

  // Method to update the line chart with new data
  private updateChart() {
    // Clear previous data
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];


    // Update with new data
    this.chartsData.temperatureWithDate.forEach((dataPoint: any) => {

      // Format date and time for chart labels
      const formattedDateTime = this.formatDateTime(dataPoint.date);

      // Parse and format temperature
      const temperature = parseFloat(dataPoint.temperature);
      const formattedTemperature = this.formatTemperature(temperature);

      // Add data to the line chart arrays
      this.lineChartData[0].data.push(formattedTemperature);
      this.lineChartLabels.push(`${formattedDateTime.date} ${formattedDateTime.time}`);

    });
  }

  // Method to format date and time from a string
  formatDateTime(date: string | null): { date: string, time: string } {
    if (date)
    {

      const formattedDate = this.datePipe.transform(date, 'dd.MM.yyyy') || '';
      const formattedTime = this.datePipe.transform(date, 'HH:mm') || '';
      return { date: formattedDate, time: formattedTime };
    }

    else
    {
      return { date: '', time: '' };
    }
  }

  // Method to format temperature to one decimal place
  formatTemperature(temperature: number | null): number {
    if (temperature !== null && !isNaN(temperature))
    {

      // Round the temperature to one decimal place
      const roundedTemperature = Math.round(temperature * 10) / 10;
      return roundedTemperature;
    }

    else
    {
      return NaN; // or handle the case where the temperature is not valid
    }
  }
}
