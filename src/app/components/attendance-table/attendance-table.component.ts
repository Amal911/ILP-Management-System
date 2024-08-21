import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    console.log(this.columns);
    this.initializeColumns();
    console.log(this.absentees);

    this.filteredColumns = [...this.columns];
    console.log(this.columns);

    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filteredColumns = this.columns.filter((column) =>
        column.firstName.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    this.emitAttendanceDetails();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns'] && changes['columns'].currentValue) {
      this.columns = changes['columns'].currentValue || [];
      this.initializeColumns();
      this.filteredColumns = [...this.columns];
      this.emitAttendanceDetails();
    }
  }

  initializeColumns() {
    this.columns.forEach((trainee) => {
      const isAbsent = this.absentees.some(
        (absent) => absent.id === trainee.id
      );
      trainee.attendance = !isAbsent;
    });
  }
  emitAttendanceDetails() {
    const attendanceDetails = {
      columns: this.columns,
      absentees: this.absentees,
    };

    this.attendanceDetailsEmitter.emit(attendanceDetails);
  }
}
