import { Component } from '@angular/core';
import { SessionDetailsComponent } from "../../components/session-details/session-details.component";
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../components/table/table.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AttendanceTableComponent } from "../../components/attendance-table/attendance-table.component";


@Component({
  selector: 'app-session-attendance',
  standalone: true,
  imports: [SessionDetailsComponent, TableModule, CommonModule, TableComponent, ReactiveFormsModule, AttendanceTableComponent],
  templateUrl: './session-attendance.component.html',
  styleUrl: './session-attendance.component.scss'
})
export class SessionAttendanceComponent {
  tableData: any[] = [];
  searchControl: FormControl = new FormControl('');

  tableColumns: { field: string, header: string, sortable: boolean, display: boolean }[] = [
    { field: 'batch', header: 'Batch', sortable: true, display: false },



];






}
