import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { CreateaccountmodalComponent } from '../../components/createaccountmodal/createaccountmodal.component';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [TableComponent, CreateaccountmodalComponent, NgFor, NgIf, ReactiveFormsModule],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {

    users: User = { trainees: [], trainers: [], admins: [] };
    roles = ['Admin', 'Trainer', 'Trainee'];
    years = ['2023', '2024', '2025'];
    showYearSelect = false;

    searchControl: FormControl = new FormControl('');
    roleControl: FormControl = new FormControl('Admin');
    yearControl: FormControl = new FormControl('');

    tableColumns: { field: string, header: string, sortable: boolean, display: boolean }[] = [
        { field: 'name', header: 'Name', sortable: true, display: true },
        { field: 'batch', header: 'Batch', sortable: true, display: false },
        // { field: 'year', header: 'Year', sortable: true, display: false },
    ];

    tableData: any[] = [];
    private subscription: Subscription = new Subscription();

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.subscription.add(
            this.userService.getUsers().subscribe(
                (usersData: User | User[]) => {
                    if (Array.isArray(usersData)) {
                        this.users = usersData[0]; // Assuming the first item is the correct user data
                    } else {
                        this.users = usersData; // Single user data
                    }
                    this.updateTableData();
                },
                error => {
                    console.error('Error fetching users:', error);
                }
            )
        );

        this.roleControl.valueChanges.subscribe(role => {
            this.showYearSelect = (role === 'Trainee');
            this.updateTableData();
        });

        this.yearControl.valueChanges.subscribe(() => {
            this.updateTableData();
        });

        this.searchControl.valueChanges.subscribe(() => {
            this.updateTableData();
        });
    }

    updateTableData(): void {

        let data: any[] = [];

        const batchColumn = this.tableColumns.find(col => col.field === 'batch');
        // const yearColumn = this.tableColumns.find(col => col.field === 'year');

        if (this.roleControl.value === 'Trainee') {
            if (batchColumn) batchColumn.display = true;
            //   if (yearColumn) yearColumn.display = false;
            data = this.users.trainees;
            if (this.yearControl.value) {
                data = data.filter(item => item.year === parseInt(this.yearControl.value));
            }
        } else {
            if (batchColumn) batchColumn.display = false;
            //   if (yearColumn) yearColumn.display = false;
            if (this.roleControl.value === 'Admin') {
                data = this.users.admins;
            } else if (this.roleControl.value === 'Trainer') {
                data = this.users.trainers;
            }
        }

        if (this.searchControl.value) {
            data = data.filter(item =>
                this.tableColumns.some(col =>
                    item[col.field]?.toString().toLowerCase().includes(this.searchControl.value.toLowerCase())
                )
            );
        }

        this.tableData = data;
    }

    // editUser(user: any): void {
    //   this.createAccountModal.populateForm(user);
    // }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
