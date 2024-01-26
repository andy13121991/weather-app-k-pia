import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { WeatherTableComponent } from './components/weather-table/weather-table.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { HeatIndexCalculatorComponent } from './components/heat-index-calculator/heat-index-calculator.component';
import { SubtabsComponent } from './components/subtabs/subtabs.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    WeatherTableComponent,
    LineChartComponent,
    HeatIndexCalculatorComponent,
    SubtabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    NgChartsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
