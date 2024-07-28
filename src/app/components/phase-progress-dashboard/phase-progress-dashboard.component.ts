import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-phase-progress-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './phase-progress-dashboard.component.html',
  styleUrl: './phase-progress-dashboard.component.scss',
})
export class PhaseProgressDashboardComponent {
  @Input() phaseCompletedDays: number = 0;
  @Input() phaseTotaldays: number = 0;
  phaseProgressData: any;
  phaseProgressOptions: any;
  ngOnInit(): void {
    this.phaseProgressGraph();
    console.log('PhaseProgressDashboardComponent initialized with:', this.phaseCompletedDays, this.phaseTotaldays);
  }
  phaseProgressGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.phaseProgressData = {
      // labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [
            this.phaseCompletedDays,
            this.phaseTotaldays - this.phaseCompletedDays,
          ],
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

    this.phaseProgressOptions = {
      cutout: '70%',
      style: { border: 'none' },
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
