import { SessionService } from './../../services/API/session.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HollowButtonComponent } from '../../components/hollow-button/hollow-button.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AttendanceTableComponent } from '../../components/attendance-table/attendance-table.component';
import { SessionDetailsComponent } from '../../components/session-details/session-details.component';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from '../../services/API/batch.service';

@Component({
  selector: 'app-session-attendance',
  standalone: true,
  imports: [
    AttendanceTableComponent,
    ButtonComponent,
    HollowButtonComponent,
    SessionDetailsComponent,
  ],
  templateUrl: './session-attendance.component.html',
  styleUrl: './session-attendance.component.scss',
})
export class SessionAttendanceComponent implements OnInit {
  session: any;
  traineeTable: any[] = [];
  absentees: any[] = [];
  searchControl: FormControl = new FormControl('');
  sessionDetails: any;
  attendanceDetails: any;
  batchId: number = 3;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private batchService:BatchService

  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadSessionDetails(+id);
    }
    console.log(this.session);
    
    

    this.absentees = [];
  }

  onSessionDetailsEmit(sessionDetails: any) {
    this.sessionDetails = sessionDetails;
  }

  onAttendanceDetailsEmit(attendanceDetails: any) {
    this.attendanceDetails = attendanceDetails;
  }

  onSubmit() {
    if (this.attendanceDetails && this.sessionDetails) {
      const attendees = this.attendanceDetails.columns.map((trainee: any) => ({
        TraineeId: trainee.id,
        IsPresent: trainee.attendance,
        Remarks: trainee.remarks || '',
      }));

      const output = {
        sessionId: this.session.id,
        attendees: attendees,
      };
      this.sessionService.PostAttendance(output).subscribe(
        (response) => {
          console.log('Attendance added successfully:', response);
        },
        (error) => {
          console.error('Error adding attendance:', error);
        }
      );
    } else {
      console.log('Session or attendance details are missing.');
    }
  }

  loadSessionDetails(id: number) {
    this.sessionService.fetchSession(id).subscribe(
      (response) => {
        if (response.isSuccess) {
          console.log(response);
          this.session = {
            id: response.result.id,
            session_name: response.result.sessionName,
            trainer_name: response.result.trainerName,
            sessionDescription: response.result.sessionDescription,
            date: new Date(response.result.startTime)
              .toISOString()
              .split('T')[0],
            start_time: new Date(response.result.startTime)
              .toTimeString()
              .slice(0, 5),
            end_time: new Date(response.result.endTime)
              .toTimeString()
              .slice(0, 5),
              batchId:response.result.batchId
            };
            this.getTraineeList(this.session.batchId);
        } else {
          console.error('Failed to load session details:', response.message);
        }
      },
      (error) => {
        console.error('Error loading session details:', error);
      }
    );
  }


  getTraineeList(batchId: number): void {
    this.batchService.GetTraineeList(batchId).subscribe(
      (data: any) => {
        console.log('API response:', data);
        if (Array.isArray(data)) {
          const result = data.find(batch => batch.id === batchId)?.traineeList || [];
          this.traineeTable = result;
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching trainee list:', error);
      }
    );
  }
}
