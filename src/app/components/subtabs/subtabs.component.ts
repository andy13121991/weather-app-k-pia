import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-subtabs',
  templateUrl: './subtabs.component.html',
  styleUrls: ['./subtabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubtabsComponent {

  @Input() data: any[] = [];

}
