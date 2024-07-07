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

  tatal_sore = [
      {
        "id": 1,
        "name": "John Doe",
        "daily_assessment": 85,
        "live_assessment": 78,
        "module_assessment": 92,
        "case_study": 88,
        "project": 95
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "daily_assessment": 90,
        "live_assessment": 82,
        "module_assessment": 88,
        "case_study": 90,
        "project": 93
      },
      {
        "id": 3,
        "name": "Michael Johnson",
        "daily_assessment": 79,
        "live_assessment": 85,
        "module_assessment": 91,
        "case_study": 87,
        "project": 90
      },
      {
        "id": 4,
        "name": "Emily Brown",
        "daily_assessment": 88,
        "live_assessment": 76,
        "module_assessment": 85,
        "case_study": 82,
        "project": 91
      },
      {
        "id": 5,
        "name": "William Wilson",
        "daily_assessment": 82,
        "live_assessment": 89,
        "module_assessment": 94,
        "case_study": 85,
        "project": 88
      },
      {
        "id": 6,
        "name": "Sophia Martinez",
        "daily_assessment": 91,
        "live_assessment": 83,
        "module_assessment": 87,
        "case_study": 92,
        "project": 94
      },
      {
        "id": 7,
        "name": "James Thompson",
        "daily_assessment": 84,
        "live_assessment": 90,
        "module_assessment": 89,
        "case_study": 86,
        "project": 92
      },
      {
        "id": 8,
        "name": "Olivia Davis",
        "daily_assessment": 87,
        "live_assessment": 88,
        "module_assessment": 93,
        "case_study": 89,
        "project": 87
      },
      {
        "id": 9,
        "name": "Daniel Garcia",
        "daily_assessment": 83,
        "live_assessment": 91,
        "module_assessment": 90,
        "case_study": 83,
        "project": 89
      },
      {
        "id": 10,
        "name": "Isabella Rodriguez",
        "daily_assessment": 89,
        "live_assessment": 84,
        "module_assessment": 86,
        "case_study": 91,
        "project": 90
      },
      {
        "id": 11,
        "name": "Liam Martinez",
        "daily_assessment": 92,
        "live_assessment": 80,
        "module_assessment": 84,
        "case_study": 93,
        "project": 88
      },
      {
        "id": 12,
        "name": "Mia Wilson",
        "daily_assessment": 80,
        "live_assessment": 86,
        "module_assessment": 92,
        "case_study": 84,
        "project": 91
      },
      {
        "id": 13,
        "name": "Alexander Thompson",
        "daily_assessment": 86,
        "live_assessment": 79,
        "module_assessment": 87,
        "case_study": 88,
        "project": 93
      },
      {
        "id": 14,
        "name": "Charlotte Harris",
        "daily_assessment": 81,
        "live_assessment": 87,
        "module_assessment": 85,
        "case_study": 90,
        "project": 89
      },
      {
        "id": 15,
        "name": "Benjamin Scott",
        "daily_assessment": 88,
        "live_assessment": 81,
        "module_assessment": 83,
        "case_study": 87,
        "project": 92
      }
    ]
}
