import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-doughnut-graph-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './doughnut-graph-chart.component.html',
  styleUrl: './doughnut-graph-chart.component.scss'
})
export class DoughnutGraphChartComponent {
  data: any;
  @Input() title:string = 'Total';
  @Input() value:any = 80;
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      // labels: ['A'],
      datasets: [
        {
          data: [this.value, 100 - this.value],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            '#f5faff',
          ],
          hoverBorderColor: [
            documentStyle.getPropertyValue('--blue-500'),
            '#f5faff',
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            '#f5faff',
          ],
        },
      ],
    };

    this.options = {
      cutout: '70%',
      style:{border:'none'},
      plugins: {
        hover: { enabled: false },
        tooltip: { enabled: false },
        legend: {
          labels: {
            color: '#000',
          },
        },
      },
    };
  }
}
