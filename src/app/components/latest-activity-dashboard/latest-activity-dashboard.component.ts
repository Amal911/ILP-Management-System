import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-latest-activity-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './latest-activity-dashboard.component.html',
  styleUrl: './latest-activity-dashboard.component.scss',
})
export class LatestActivityDashboardComponent {
  @Input() schedule = { module: '', session: '' };
}
