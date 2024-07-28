import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AppliedleaveCardsComponent } from '../../components/appliedleave-cards/appliedleave-cards.component';
import { ApplyleavemodalComponent } from '../../components/applyleavemodal/applyleavemodal.component';
import { LeaveService } from '../../services/API/leave.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/API/user.service';

@Component({
  selector: 'app-trainee-leave-request',
  standalone: true,
  imports: [ButtonComponent, AppliedleaveCardsComponent, ApplyleavemodalComponent],
  templateUrl: './trainee-leave-request.component.html',
  styleUrl: './trainee-leave-request.component.scss',
  providers: [DatePipe]
})
export class TraineeLeaveRequestComponent {

  LeaveRequests:any[] = [];
  pendingLeaveRequests: any[] = [];
  leaveRequestHistory: any[] = [];
  traineeName: string =''
  constructor(private datePipe: DatePipe, private router: Router, private leaveService: LeaveService, private userService: UserService) {}

  ngOnInit(): void{
    const trainee = JSON.parse(localStorage.getItem('user') || '{}');
    this.traineeName = trainee.UserName;
    this.loadAppliedLeaves();
  }

  loadAppliedLeaves(): void{
    this.leaveService.getappliedLeaves().subscribe(async (data: any[]) => {
      for (let leaveRequest of data) {
        if (leaveRequest.traineeId) {
          const trainee = await this.userService.getUserById(leaveRequest.traineeId).toPromise();
          leaveRequest.traineeName = `${trainee.firstName} ${trainee.lastName}`;
          console.log(trainee)
        }
      }
    // this.leaveService.getappliedLeaves().subscribe((data: any[]) => {
    //   this.LeaveRequests = data;
      this.LeaveRequests = data.filter(leave => leave.traineeName === this.traineeName);
      this.pendingLeaveRequests = data.filter(leave => leave.isPending);
      this.leaveRequestHistory = data.filter(leave => !leave.isPending);
      this.LeaveRequests.forEach(request => {
        request.leaveDateFrom = this.formatDate(request.leaveDateFrom);
        request.leaveDateTo = this.formatDate(request.leaveDateTo);
        request.leaveDate = this.formatDate(request.leaveDate);
        request.createdDate = this.formatDate(request.createdDate);
      })
    },
  error =>{console.error('Error:', error)})
  }

  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'MMMM d, y');
    return formattedDate || '';
  }

  // LeaveRequests = [
  //   {
  //     name: 'Amal E A',
  //     batch_name: 'ILP Batch 03 2023-24',
  //     description: 'Hospital Emergency and need a consultation',
  //     leave_date_from: '2024-07-11',
  //     leave_date_to: '2024-07-12',
  //     requested_date: '2024-07-01',
  //     reason: 'Sick Leave',
  //     is_approved_trainer: true,
  //     is_approved_l_and_d: false,
  //   },
  //   {
  //     name: 'Dharsan C Sajeev',
  //     batch_name: 'ILP Batch 03 2023-24',
  //     description: 'Hospital Emergency and need a consultation',
  //     leave_date_from: '2024-07-11',
  //     leave_date_to: '2024-07-12',
  //     requested_date: '2024-07-01',
  //     reason: 'Sick Leave',
  //     is_approved_trainer: false,
  //     is_approved_l_and_d: false,
  //   },
  //   {
  //     name: 'Reshmi M',
  //     batch_name: 'ILP Batch 03 2023-24',
  //     description: 'Hospital Emergency and need a consultation',
  //     leave_date_from: '2024-07-11',
  //     leave_date_to: '2024-07-12',
  //     requested_date: '2024-07-01',
  //     reason: 'Sick Leave',
  //     is_approved_trainer: true,
  //     is_approved_l_and_d: true,
  //   }];

}
