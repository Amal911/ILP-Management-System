import { Component } from '@angular/core';
import { DoughnutGraphCarouselComponent } from '../../components/doughnut-graph-carousel/doughnut-graph-carousel.component';
import { ForzenColumnTableComponent } from '../../components/forzen-column-table/forzen-column-table.component';

@Component({
  selector: 'app-dashboard-scorecard',
  standalone: true,
  imports: [DoughnutGraphCarouselComponent,ForzenColumnTableComponent],
  templateUrl: './dashboard-scorecard.component.html',
  styleUrl: './dashboard-scorecard.component.scss'
})
export class DashboardScorecardComponent {

}
