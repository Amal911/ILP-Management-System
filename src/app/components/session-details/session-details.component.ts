import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent implements OnInit {
  @Input() session: any = '';
  @Output() sessionDetailEmitter = new EventEmitter<any>();

  emitSessionDetails() {
    this.sessionDetailEmitter.emit(this.session);
  }

  ngOnInit() {
    this.emitSessionDetails();
  }
}
