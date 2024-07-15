import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainee-table',
  standalone: true,
  imports: [ NgIf,NgFor,TableModule,ReactiveFormsModule,CommonModule,ButtonModule,HollowButtonComponent,ButtonComponent,FormsModule,RouterModule],
  templateUrl: './trainee-table.component.html',
  styleUrl: './trainee-table.component.scss'
})
export class TraineeTableComponent {
  @Input() columns: any[] = [];
  @Output() traineeHandedInDetailsEmitter = new EventEmitter<any>();

  filteredColumns: any[] = [];
  searchControl: FormControl = new FormControl('');
  constructor(private router: Router) {}

  ngOnInit(): void {


    this.filteredColumns = [...this.columns];
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filteredColumns = this.columns.filter((column) =>
        column.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });


  }
  onRowClick(rowData: any): void {
    this.router.navigate(['schedule/id'], { queryParams: { data: JSON.stringify(rowData) } });
  }

}
