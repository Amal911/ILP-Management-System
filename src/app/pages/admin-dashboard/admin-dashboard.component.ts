import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LatestActivityDashboardComponent } from '../../components/latest-activity-dashboard/latest-activity-dashboard.component';
import { PhaseProgressDashboardComponent } from '../../components/phase-progress-dashboard/phase-progress-dashboard.component';
import { ScorecardOverviewDashboardComponent } from '../../components/scorecard-overview-dashboard/scorecard-overview-dashboard.component';
import { AttendanceGraphDashboardComponent } from '../../components/attendance-graph-dashboard/attendance-graph-dashboard.component';
import { CriteriawiseGraphDashboardComponent } from "../../components/criteriawise-graph-dashboard/criteriawise-graph-dashboard.component";
import { BasicDetailsDashboardComponent } from "../../components/basic-details-dashboard/basic-details-dashboard.component";
import {BrowserCacheLocation} from "@azure/msal-browser";
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    LatestActivityDashboardComponent,
    PhaseProgressDashboardComponent,
    ScorecardOverviewDashboardComponent,
    AttendanceGraphDashboardComponent,
    CriteriawiseGraphDashboardComponent,
    BasicDetailsDashboardComponent
],
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
  schedule: any = {
    module: 'Bootstrap',
    session: 'Introduction to bootstrap',
  };

  //Data needed for graphs
  phaseCompletedDays: number = 14;
  phaseTotaldays: number = 26;
  batchScoreOverviewData: number[] = [2, 4, 3, 1];
  //Data for attendance graph
  thisWeekDays: string[] = [
    'May 1',
    'May 2',
    'May 3',
    'May 4',
    'May 5',
    'May 6',
  ];
  attendanceThisWeek: number[] = [89, 91, 91, 78, 99, 65];
  categoryWiseModules: string[] = [
    'Case Study',
    'Module',
    'Live Assessment',
    'Project',
    'Daily',
    'Total',
  ];
  categoryWiseScores: number[] = [65, 59, 80, 81, 56, 78];

  //Function that helps to set the batch to the first batch on startup/refresh
  isFirst(batch: any) {
    return this.batches.indexOf(batch) === 0;
  }

  ngOnInit(): void {}

  //Function to change phases using the arrow buttons
  previousPhaseNav() {
    this.currentPhaseIndex =
      (this.currentPhaseIndex - 1 + this.phases.length) % this.phases.length;
  }

  nextPhaseNav() {
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length;
  }
}
