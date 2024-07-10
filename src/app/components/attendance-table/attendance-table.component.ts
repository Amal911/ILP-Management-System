import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast'
import { HollowButtonComponent } from "../hollow-button/hollow-button.component";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, TableModule, CommonModule, ButtonModule, SplitButtonModule, HollowButtonComponent, ButtonComponent],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.scss'
})
export class AttendanceTableComponent implements OnInit  {

  @Input() columns:  any[] =  [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mark Johnson' },
    { id: 4, name: 'Lucy Brown' },
    { id: 5, name: 'Emma Davis' },
    { id: 6, name: 'Liam Wilson' },
    { id: 7, name: 'Olivia Moore' },
    { id: 8, name: 'Noah Taylor' },
    { id: 9, name: 'Sophia Anderson' },
    { id: 10, name: 'Mason Thomas' },
    { id: 11, name: 'Isabella Jackson' },
    { id: 12, name: 'Ethan White' },
    { id: 13, name: 'Mia Harris' },
    { id: 14, name: 'Aiden Martin' },
    { id: 15, name: 'Ava Lee' }
  ];

  @Input() absentees: any[] = [
  { id: 2},
  { id: 5},
  { id: 11},
  { id: 13}
  ];

  filteredColumns: any[] = [];
  searchControl: FormControl = new FormControl('');
  ngOnInit(): void {
    this.columns.forEach((trainees) => {
      const isAbsent = this.absentees.some(absent => absent.id === trainees.id);
      if (isAbsent) {
        trainees.attendance = false;}
    });
    this.filteredColumns = this.columns.slice();
    this.searchControl.valueChanges.subscribe(searchText => {
    this.filteredColumns = this.columns.filter(column =>
      column.name.toLowerCase().includes(searchText.toLowerCase()));
    });
  }
  onSubmit(): void {
    console.log(this.filteredColumns);
  }


}
