import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../../components/button/button.component';
import { HollowButtonComponent } from '../../components/hollow-button/hollow-button.component';
import { ApiService } from '../../services/api.service';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-batch-create-phase-table',
  standalone: true,
  imports: [
    TableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ButtonComponent,
    HollowButtonComponent,
    ReactiveFormsModule,
    MultiSelectModule
  ],
  templateUrl: './batch-create-phase-table.component.html',
  styleUrl: './batch-create-phase-table.component.scss',
})






export class BatchCreatePhaseTableComponent {
  filteredColumns: any[] = [];
  newPhase: string = '';
  showMessage: boolean = false;
  phaseForm: FormGroup = new FormGroup({
    phaseName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    phaseDuration:new FormControl('', 
      Validators.required)
  });
  phasesData: any;
  cities!:any;

    selectedCities!:[];
  constructor(public api: ApiService) {
    this.cities = [
      {name: 'Assessments', code: 'NY'},
      {name: 'Session', code: 'RM'},
      // {name: 'London', code: 'LDN'},
      // {name: 'Istanbul', code: 'IST'},
      // {name: 'Paris', code: 'PRS'}
  ];
  }

  searchControl: FormControl = new FormControl('');
  @Input() columns: any[] = [];

  ngOnInit(): void {
    this.api.getPhases().subscribe((res:any) => {
      this.phasesData = res.result;
      console.log(res);
      this.filteredColumns = [...this.phasesData];
    });
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filteredColumns = this.phasesData.filter((column: any) =>
        column.phaseName.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }
  toggleEdit(phase: any): void {
    if (phase.editing) {
      this.api.updatePhase(phase.id, { phaseName: phase.phaseName, phaseDuration: phase.phaseDuration }).subscribe(() => {
        this.api.getPhases().subscribe((res) => {
          this.phasesData = res;
          this.filteredColumns = this.filteredColumns.map(p =>
            p.id === phase.id ? { ...p, phaseName: phase.phaseName, phaseDuration: phase.phaseDuration } : p
          );
        });
      });
    }
    phase.editing = !phase.editing;
  }
  
  

  deletePhase(phase: any): void {
    this.api.deletePhase(phase.id).subscribe(res=>{
      this.api.getPhases().subscribe(res=>{
        this.phasesData = res;
        this.filteredColumns = [...this.phasesData];
      })
    })
  }

  saveNewPhase(): void {
    if (this.phaseForm.valid) {
      const phaseName = this.phaseForm.get('phaseName')?.value;
      const phaseDuraion = this.phaseForm.get('phaseDuraion')?.value;
      this.api.creatNewPhase({phaseName:phaseName,phaseDuraion:phaseDuraion}).subscribe(res=>{
        this.phaseForm.reset();
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
        this.api.getPhases().subscribe(res=>{
          this.phasesData = res;
          this.filteredColumns = [...this.phasesData];
        })
      })
    }
  }
  logPhases(): void {
    console.log('Phases with IDs:', this.columns);
  }
}
