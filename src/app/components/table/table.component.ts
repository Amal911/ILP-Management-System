import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, NgIf, NgFor, ReactiveFormsModule, ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() columns: { field: string, header: string, sortable: boolean, display: boolean }[] = [];
  @Input() data: any[] = [];
  @Input() searchControl: FormControl = new FormControl('');


}
