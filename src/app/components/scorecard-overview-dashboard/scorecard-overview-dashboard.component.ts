import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-scorecard-overview-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './scorecard-overview-dashboard.component.html',
  styleUrl: './scorecard-overview-dashboard.component.scss',
})
export class ScorecardOverviewDashboardComponent {
  @Input() batchScores: number[] = [];
  batchScoreOverviewData: any;
  batchScoreOverviewOptions: any;

  ngOnInit(): void {
    this.batchScoreOverviewGraph();
  }

  batchScoreOverviewGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.batchScoreOverviewData = {
      // labels: ['A', 'B', 'C','D'],
      datasets: [
        {
          data: this.batchScores,
          backgroundColor: [
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--red-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--red-400'),
          ],
        },
      ],
    };

    this.batchScoreOverviewOptions = {
      cutout: '70%',
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
    };
  }
}
