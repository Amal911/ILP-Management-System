import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent implements OnInit {
  @Input() session: any;
  @Input() editPageLink:string="";
  @Output() sessionDetailEmitter = new EventEmitter<any>();

  emitSessionDetails() {
    this.sessionDetailEmitter.emit(this.session);
  }

  ngOnInit() {
    this.emitSessionDetails();
  }
}
