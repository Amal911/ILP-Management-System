import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormsModule, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from "../../components/button/button.component";
import { HollowButtonComponent } from "../../components/hollow-button/hollow-button.component";

@Component({
  selector: 'app-batch-create-phase-table',
  standalone: true,
  imports: [TableModule, ReactiveFormsModule, CommonModule, FormsModule, ButtonComponent, HollowButtonComponent,ReactiveFormsModule],
  templateUrl: './batch-create-phase-table.component.html',
  styleUrl: './batch-create-phase-table.component.scss'
})
export class BatchCreatePhaseTableComponent implements OnInit {
  filteredColumns: any[] = [];
  newPhase:string = '';
  showMessage: boolean = false;
  phaseForm: FormGroup = new FormGroup({
    phaseName: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  searchControl: FormControl = new FormControl('');
  @Input() columns: any[] = [
    { id: 1, phase_name: 'E-learning' },
    { id: 2, phase_name: 'Tech fundamentals' },
    { id: 3, phase_name: 'Business Orientation' },
    { id: 4, phase_name: 'Softskills' },
    { id: 5, phase_name: 'Specialization' },
    { id: 6, phase_name: 'On the Job training' },
    { id: 7, phase_name: 'Advanced Programming' },
    { id: 8, phase_name: 'Database Management' }
  ];


  ngOnInit(): void {


    this.filteredColumns = [...this.columns];
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filteredColumns = this.columns.filter((column) =>
        column.phase_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });


  }
  toggleEdit(phase:any):void{
    phase.editing = !phase.editing;
  }


  deletePhase(phase: any): void {
    this.columns=this.columns.filter((column) =>column.id!==phase.id);
    this.filteredColumns = this.filteredColumns.filter(columns => columns.id !== phase.id);
  }

  saveNewPhase(): void {
    if (this.phaseForm.valid) {
      const phaseName = this.phaseForm.get('phaseName')?.value;
      const newId = this.columns.length ? Math.max(...this.columns.map(c => c.id)) + 1 : 1;
      this.columns.push({ id: newId, phase_name: phaseName });
      this.filteredColumns = [...this.columns];
      this.phaseForm.reset();
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);

    }
  }
  logPhases(): void {
    console.log('Phases with IDs:', this.columns);
  }

}