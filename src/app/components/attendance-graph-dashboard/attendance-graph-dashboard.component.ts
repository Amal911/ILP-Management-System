import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-attendance-graph-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './attendance-graph-dashboard.component.html',
  styleUrl: './attendance-graph-dashboard.component.scss'
})
export class AttendanceGraphDashboardComponent {

  attendanceData: any;
  attendanceOptions: any;
  @Input() graphLabels:string[]= [];
  @Input() graphData:number[]= [];

  ngOnInit(): void {
    this.attendanceGraph();
  }

  attendanceGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.attendanceData = {
      labels: this.graphLabels,
      datasets: [
        {
          // label: 'My First dataset',
          backgroundColor: [documentStyle.getPropertyValue('--blue-500')],
          borderColor: [documentStyle.getPropertyValue('--blue-500')],
          data: this.graphData,
        },
      ],
    };

    this.attendanceOptions = {
      maintainAspectRatio: true,
      aspectRatio: 1.2,
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
