import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  // BehaviorSubject to hold and broadcast charts data with an initial value
  private chartsDataSubject = new BehaviorSubject<any>({ temperatureWithDate: [] });

  // Observable to subscribe to for receiving charts data updates
  chartsData$ = this.chartsDataSubject.asObservable();

  // Method to update the charts data and notify subscribers
  updateChartsData(data: any) {

    // Emit the new charts data to all subscribers
    this.chartsDataSubject.next(data);
  }
}
