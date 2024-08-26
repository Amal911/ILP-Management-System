import { ScheduleService } from './../../services/schedule.service';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { LatestActivityDashboardComponent } from '../../components/latest-activity-dashboard/latest-activity-dashboard.component';
import { PhaseProgressDashboardComponent } from '../../components/phase-progress-dashboard/phase-progress-dashboard.component';
import { ScorecardOverviewDashboardComponent } from '../../components/scorecard-overview-dashboard/scorecard-overview-dashboard.component';
import { AttendanceGraphDashboardComponent } from '../../components/attendance-graph-dashboard/attendance-graph-dashboard.component';
import { CriteriawiseGraphDashboardComponent } from "../../components/criteriawise-graph-dashboard/criteriawise-graph-dashboard.component";
import { BasicDetailsDashboardComponent } from "../../components/basic-details-dashboard/basic-details-dashboard.component";

import { DatePipe } from '@angular/common';


import { BehaviorSubject } from 'rxjs';
import { BatchListingService } from '../../services/API/batch-listing.service';

import {BrowserCacheLocation} from "@azure/msal-browser";
import { SessionService } from '../../services/API/session.service';
import { BatchService } from '../../services/API/batch.service';




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
 providers: [DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  //Data of each batches
  phaseCompletedDays: number = 0;
  phaseTotaldays: number = 0;
  schedule: any = {};
  currentBatchId: number = 1;
  batches: any;

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

  constructor(private scheduleService: ScheduleService,
              private sessionService:SessionService,
             private batchService : BatchService,
             private datePipe: DatePipe ) {}

  ngOnInit(): void {
    this.fetchBatchDetails(1);
   
    this.fetchSchedule(1);
  }


  fetchSchedule(batchId:number) {
    this.sessionService.getTodaysSession(batchId).subscribe({
      next: (data) => {
        console.log('Fetched Data:', data);
        if (data.isSuccess && data.result) {
          if(data.result.length!=0){
            this.schedule = data.result;
            
            this.schedule[0].sessionDescription = `${data.result[0].sessionDescription.split(" ").slice(0,10).join(" ")}...`
            
          }
          else{
            this.schedule = [
              {
                sessionName:"No Active Sessions Now"
              }
            ]
          }

        } else {
          console.error('Error fetching data:', data.message);
        }
      },
      error: (err) => {
        console.error('HTTP Error:', err);
      }
    });}





    onBatchChange(batchId: number): void {
      this.currentBatchId = batchId;
      this.fetchSchedule(batchId);
      this.loadBatchPhaseProgress(batchId);
      console.log(batchId);
      console.log(this.batches);
      
      // this.fetchBatchDetails();
    }
    loadBatchPhaseProgress(batchId: number): void {
      this.batchService.getBatchById(batchId).subscribe({
        next: (data) => {
          console.log('Entire Batch Data:', data);

          if (Array.isArray(data) && data.length > 0) {
            const batchData = data[0];
            console.log('Batch Data:', batchData);

            const batchPhases = batchData.batchPhases;

            if (batchPhases) {
              console.log('Batch Phases:', batchPhases);

              if (Array.isArray(batchPhases) && batchPhases.length > 0) {
                const batchPhase = batchPhases[0];
                console.log('Batch Phase:', batchPhase);
                console.log('Start Date:', batchPhase.startDate);
                console.log('Number of Days:', batchPhase.numberOfDays);
                this.loadPhaseProgress(batchPhase);
              } else {
                console.error('No batch phases found or batch phases array is empty');
              }
            } else {
              console.error('Batch phases property is missing');
            }
          } else {
            console.error('No data received or data is not an array');
          }
        },
        error: (err) => {
          console.error('HTTP Error:', err);
        }
      });
    }






    loadPhaseProgress(batchPhase: any) {


      const currentDate = new Date();
      const startDate = new Date(batchPhase.startDate);

      const completedDays = Math.ceil((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

      this.phaseCompletedDays = Math.min(completedDays, batchPhase.numberOfDays);
      this.phaseTotaldays = batchPhase.numberOfDays;
      // this.phaseCompletedDays = 100;
      // this.phaseTotaldays = 200;

      console.log('Phase Progress:', { phaseCompletedDays: this.phaseCompletedDays, phaseTotaldays: this.phaseTotaldays });
    }

    //function to fetch batchlist-details
    fetchBatchDetails(programId:number){
      this.batchService.getBatchByProgram(programId).subscribe({
        next:(data:any) =>{
          this.batches =data;
          
          console.log('Batch Data :',this.batches);
        },
        error(error) {
          console.log('Error fetching in Batch Data :', error);

        },
      })
    }
    formatDate(date: string): string {
      const formattedDate = this.datePipe.transform(date, 'MMM d, y');
      return formattedDate || '';
    }

    
  //Data needed for graphs

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
    // return this.batches.indexOf(batch) === 0;
    return this.batches.filter((batch:any)=>batch.id==this.currentBatchId);
  }



  //Function to change phases using the arrow buttons
  previousPhaseNav() {
    this.currentPhaseIndex =
      (this.currentPhaseIndex - 1 + this.phases.length) % this.phases.length;
  }

  nextPhaseNav() {
    this.currentPhaseIndex = (this.currentPhaseIndex + 1) % this.phases.length;
  }
}
