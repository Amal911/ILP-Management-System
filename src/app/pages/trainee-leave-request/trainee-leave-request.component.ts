import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AppliedleaveCardsComponent } from '../../components/appliedleave-cards/appliedleave-cards.component';
import { ApplyleavemodalComponent } from '../../components/applyleavemodal/applyleavemodal.component';
import { LeaveService } from '../../services/API/leave.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/API/user.service';
import { LeaveRequest } from '../../interfaces/leave';

@Component({
  selector: 'app-trainee-leave-request',
  standalone: true,
  imports: [ButtonComponent, AppliedleaveCardsComponent, ApplyleavemodalComponent],
  templateUrl: './trainee-leave-request.component.html',
  styleUrl: './trainee-leave-request.component.scss',
  providers: [DatePipe]
})
export class TraineeLeaveRequestComponent {

  LeaveRequests:LeaveRequest[] = [];
  pendingLeaveRequests: LeaveRequest[] = [];
  leaveRequestHistory: LeaveRequest[] = [];
  traineeName: string =''
  traineeId: number = 0;
  constructor(private datePipe: DatePipe, private router: Router, private leaveService: LeaveService, private userService: UserService) {}

  ngOnInit(): void{
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.traineeId = user.UserId;
    this.loadAppliedLeaves();
  }

  loadAppliedLeaves(): void{
    this.leaveService.getLeavesByUserId(this.traineeId).subscribe(
      (data: LeaveRequest[]) => {
          this.LeaveRequests = data;
          this.pendingLeaveRequests = data.filter(leave => leave.isPending);
          this.leaveRequestHistory = data.filter(leave => !leave.isPending);
          this.LeaveRequests.forEach(request => {
              request.leaveDateFrom = this.formatDate(request.leaveDateFrom);
              request.leaveDateTo = this.formatDate(request.leaveDateTo);
              request.leaveDate = this.formatDate(request.leaveDate);
              request.createdDate = this.formatDate(request.createdDate);
          });
      },
      error => { console.error('Error:', error) }
  );
}

  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'MMMM d, y');
    return formattedDate || '';
  }

}
