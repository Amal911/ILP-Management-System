import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart, PieController } from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {

  //Data of each batches 
  batches: any[] = [
    {
      name: 'Batch1',
      status: 'completed',
      phase: 'Completed',
      startDate: '2023-10-16',
      endDate: '2024-04-19',
      totalTrainees: 33,
    },
    {
      name: 'Batch2',
      status: 'completed',
      phase: 'Completed',
      startDate: '2023-11-17',
      endDate: '2024-05-17',
      totalTrainees: 31,
    },
    {
      name: 'Batch3',
      status: 'active',
      phase: 'Specialization',
      startDate: '2024-02-29',
      endDate: '2024-08-19',
      totalTrainees: 38,
    },
    {
      name: 'Batch4',
      status: 'active',
      phase: 'Tech fundamentals',
      startDate: '2024-04-24',
      endDate: '2024-10-24',
      totalTrainees: 41,
    },
  ];

  //List of phases covered by each batch
  phases = [
    'E-learning',
    'Tech Fundamentals',
    'Business Orientation',
    'Specialization',
    'On the job training',
  ];
  currentPhaseIndex = this.phases.length - 1;

  //Data about the latest schedule of the batch
  schedule:any={
    module:"Bootstrap",
    session:"Introduction to bootstrap"
  }

  //Data needed for graphs
  phaseProgressData: any;
  phaseProgressOptions: any;
  batchScoreOverviewData: any;
  batchScoreOverviewOptions: any;
  attendanceData: any;
  attendanceOptions: any;
  categoryWiseScoreData: any;
  categoryWiseScoreOptions: any;
  phaseCompletedDays: number = 14;
  phaseTotaldays: number = 26;

  //Function that helps to set the batch to the first batch on startup/refresh
  isFirst(batch: any) {
    return this.batches.indexOf(batch) === 0;
  }

  ngOnInit() {
    this.phaseProgressGraph();
    this.batchScoreOverviewGraph();
    this.attendanceGraph();
    this.categoryWiseScoreGraph();
  }

  //Function to change phases using the arrow buttons
  previousPhaseNav() {
    this.currentPhaseIndex =
      (this.currentPhaseIndex - 1 + this.phases.length) % this.phases.length;
  }

  nextPhaseNav() {
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length;
  }

  //Functions to generate graphs
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

  batchScoreOverviewGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.batchScoreOverviewData = {
      // labels: ['A', 'B', 'C','D'],
      datasets: [
        {
          data: [4, 3, 2, 1],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
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

  attendanceGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.attendanceData = {
      labels: ['May 1', 'May 2', 'May 3', 'May 4', 'May 6'],
      datasets: [
        {
          // label: 'My First dataset',
          backgroundColor: [documentStyle.getPropertyValue('--blue-500')],
          borderColor: [documentStyle.getPropertyValue('--blue-500')],
          data: [65, 59, 80, 81, 56, 55],
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

  categoryWiseScoreGraph() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.categoryWiseScoreData = {
      labels: [
        'Case Study',
        'Module',
        'Live Assessment',
        'Project',
        'Daily',
        'Total',
      ],
      datasets: [
        {
          // label: 'My First dataset',
          backgroundColor: [documentStyle.getPropertyValue('--green-500')],
          borderColor: [documentStyle.getPropertyValue('--green-500')],
          data: [65, 59, 80, 81, 56, 55, 78],
        },
      ],
    };

    this.categoryWiseScoreOptions = {
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
