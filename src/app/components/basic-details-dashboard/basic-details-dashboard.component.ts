import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-details-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './basic-details-dashboard.component.html',
  styleUrl: './basic-details-dashboard.component.scss'
})
export class BasicDetailsDashboardComponent {
  @Input() title:string="";
  @Input() details:string="";

}
