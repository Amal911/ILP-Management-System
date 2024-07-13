import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    TableModule,
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    HollowButtonComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.scss',
})
export class AttendanceTableComponent implements OnInit {
  @Input() columns: any[] = [];
  @Input() absentees: any[] = [];
  @Output() attendanceDetailsEmitter = new EventEmitter<any>();

  filteredColumns: any[] = [];
  searchControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.columns.forEach((trainee) => {
      const isAbsent = this.absentees.some(
        (absent) => absent.id === trainee.id
      );
      if (isAbsent) {
        trainee.attendance = false;
      }
    });
    this.filteredColumns = [...this.columns];
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filteredColumns = this.columns.filter((column) =>
        column.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    this.emitAttendanceDetails();
  }

  emitAttendanceDetails() {
    const attendanceDetails = {
      columns: this.columns,
      absentees: this.absentees,
    };
    this.attendanceDetailsEmitter.emit(attendanceDetails);
  }
}
