import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss'
})
export class SessionDetailsComponent {
  @Input() session_name: string=''
  @Input() trainer_name: string='';
  @Input() date:string='';
  @Input() start_time: string='';
  @Input() end_time: string='';


}
