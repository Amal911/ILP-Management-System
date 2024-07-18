import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-criteriawise-graph-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './criteriawise-graph-dashboard.component.html',
  styleUrl: './criteriawise-graph-dashboard.component.scss'
})
export class CriteriawiseGraphDashboardComponent {

  categoryWiseScoreData: any;
  categoryWiseScoreOptions: any;
  @Input() modules:string[]=[];
  @Input() scores:number[]=[];

  ngOnInit(): void {
    this.categoryWiseScoreGraph();
  }

  categoryWiseScoreGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.categoryWiseScoreData = {
      labels: this.modules,
      datasets: [
        {
          // label: 'My First dataset',
          backgroundColor: [documentStyle.getPropertyValue('--green-500')],
          borderColor: [documentStyle.getPropertyValue('--green-500')],
          data: this.scores,
        },
      ],
    };
    this.categoryWiseScoreOptions = {
      maintainAspectRatio: true,
      aspectRatio: 1.8,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
