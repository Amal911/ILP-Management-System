import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-latest-activity-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './latest-activity-dashboard.component.html',
  styleUrl: './latest-activity-dashboard.component.scss',
})
export class LatestActivityDashboardComponent implements OnChanges {
  @Input() schedule:any;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['schedule']) {
      console.log('Schedule Input Changed:', this.schedule);
    }}
}
