import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-forzen-column-table',
  standalone: true,
  imports: [TableModule, ToggleButtonModule],
  templateUrl: './forzen-column-table.component.html',
  styleUrl: './forzen-column-table.component.scss',
  styles: [
    `:host ::ng-deep  .p-frozen-column {
        font-weight: bold;
    }
    :host ::ng-deep .p-datatable-frozen-tbody {
        font-weight: bold;
    }`
],  
})
export class ForzenColumnTableComponent {

  @Input() tableTitle:string='Total Score'
  balanceFrozen: boolean = false;

    // customers!: Customer[];

    constructor() {}

    ngOnInit() {
       
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } 

    customer = [
      {
        "name": "John Doe",
        "id": "001",
        "country": "USA",
        "date": "2024-06-15",
        "company": "ABC Inc.",
        "status": "Active",
        "activity": "Meeting",
        "representative": "Jane Smith",
        "balance": 5000.00
      },
      {
        "name": "Jane Smith",
        "id": "002",
        "country": "Canada",
        "date": "2024-06-20",
        "company": "XYZ Corp.",
        "status": "Inactive",
        "activity": "Call",
        "representative": "John Doe",
        "balance": 3200.50
      },
      {
        "name": "Michael Brown",
        "id": "003",
        "country": "UK",
        "date": "2024-06-25",
        "company": "123 Ltd.",
        "status": "Active",
        "activity": "Email",
        "representative": "Sarah Johnson",
        "balance": 7800.75
      },
      {
        "name": "Sarah Johnson",
        "id": "004",
        "country": "Australia",
        "date": "2024-06-30",
        "company": "MNO Ltd.",
        "status": "Active",
        "activity": "Visit",
        "representative": "Michael Brown",
        "balance": 10500.00
      },
      {
        "name": "John Doe",
        "id": "001",
        "country": "USA",
        "date": "2024-06-15",
        "company": "ABC Inc.",
        "status": "Active",
        "activity": "Meeting",
        "representative": "Jane Smith",
        "balance": 5000.00
      },
      {
        "name": "Jane Smith",
        "id": "002",
        "country": "Canada",
        "date": "2024-06-20",
        "company": "XYZ Corp.",
        "status": "Inactive",
        "activity": "Call",
        "representative": "John Doe",
        "balance": 3200.50
      },
      {
        "name": "Michael Brown",
        "id": "003",
        "country": "UK",
        "date": "2024-06-25",
        "company": "123 Ltd.",
        "status": "Active",
        "activity": "Email",
        "representative": "Sarah Johnson",
        "balance": 7800.75
      },
      {
        "name": "Sarah Johnson",
        "id": "004",
        "country": "Australia",
        "date": "2024-06-30",
        "company": "MNO Ltd.",
        "status": "Active",
        "activity": "Visit",
        "representative": "Michael Brown",
        "balance": 10500.00
      },
      {
        "name": "John Doe",
        "id": "001",
        "country": "USA",
        "date": "2024-06-15",
        "company": "ABC Inc.",
        "status": "Active",
        "activity": "Meeting",
        "representative": "Jane Smith",
        "balance": 5000.00
      },
      {
        "name": "Jane Smith",
        "id": "002",
        "country": "Canada",
        "date": "2024-06-20",
        "company": "XYZ Corp.",
        "status": "Inactive",
        "activity": "Call",
        "representative": "John Doe",
        "balance": 3200.50
      },
      {
        "name": "Michael Brown",
        "id": "003",
        "country": "UK",
        "date": "2024-06-25",
        "company": "123 Ltd.",
        "status": "Active",
        "activity": "Email",
        "representative": "Sarah Johnson",
        "balance": 7800.75
      },
      {
        "name": "Sarah Johnson",
        "id": "004",
        "country": "Australia",
        "date": "2024-06-30",
        "company": "MNO Ltd.",
        "status": "Active",
        "activity": "Visit",
        "representative": "Michael Brown",
        "balance": 10500.00
      },
      {
        "name": "John Doe",
        "id": "001",
        "country": "USA",
        "date": "2024-06-15",
        "company": "ABC Inc.",
        "status": "Active",
        "activity": "Meeting",
        "representative": "Jane Smith",
        "balance": 5000.00
      },
      {
        "name": "Jane Smith",
        "id": "002",
        "country": "Canada",
        "date": "2024-06-20",
        "company": "XYZ Corp.",
        "status": "Inactive",
        "activity": "Call",
        "representative": "John Doe",
        "balance": 3200.50
      },
      {
        "name": "Michael Brown",
        "id": "003",
        "country": "UK",
        "date": "2024-06-25",
        "company": "123 Ltd.",
        "status": "Active",
        "activity": "Email",
        "representative": "Sarah Johnson",
        "balance": 7800.75
      },
      {
        "name": "Sarah Johnson",
        "id": "004",
        "country": "Australia",
        "date": "2024-06-30",
        "company": "MNO Ltd.",
        "status": "Active",
        "activity": "Visit",
        "representative": "Michael Brown",
        "balance": 10500.00
      },
    ]
    
}
