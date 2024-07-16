import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../../components/button/button.component';
import { HollowButtonComponent } from "../../components/hollow-button/hollow-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-batch-create-evaluation-criteria',
  standalone: true,
  imports: [TableModule, ButtonComponent, FormsModule, ReactiveFormsModule, CommonModule, HollowButtonComponent],
  templateUrl: './batch-create-evaluation-criteria.component.html',
  styleUrl: './batch-create-evaluation-criteria.component.scss'
})
export class BatchCreateEvaluationCriteriaComponent implements OnInit{
  filteredColumns: any[] = [];
  showMessage: boolean = false;
  CriteriaForm: FormGroup = new FormGroup({
    eCName: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private router:Router) { }
  searchControl: FormControl = new FormControl('');
  columns: any[] = [
    { id: 1, assessment_type_name: 'Live Assessment' },
    { id: 2, assessment_type_name: 'Module Assessment' },
    { id: 3, assessment_type_name: 'Case Study' },
    { id: 4, assessment_type_name: 'Live Assessment' },
    { id: 5, assessment_type_name: 'Module Assessment' },
    { id: 6, assessment_type_name: 'Case Study' },
    { id: 7, assessment_type_name: 'Live Assessment' },
    { id: 8, assessment_type_name: 'Module Assessment' }
  ];

  ngOnInit(): void {
    this.filteredColumns = [...this.columns];
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filteredColumns = this.columns.filter((column) =>
        column.assessment_type_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }

  toggleEdit(eC: any): void {
    eC.editing = !eC.editing;
  }

  deleteEC(eC: any): void {
    this.columns = this.columns.filter((column) => column.id !== eC.id);
    this.filteredColumns = this.filteredColumns.filter(columns => columns.id !== eC.id);
  }

  saveNewEC(): void {
    if (this.CriteriaForm.valid) {
      const eCName = this.CriteriaForm.get('eCName')?.value;
      const newId = this.columns.length ? Math.max(...this.columns.map(c => c.id)) + 1 : 1;
      this.columns.push({ id: newId, assessment_type_name: eCName });
      this.filteredColumns = [...this.columns];
      this.CriteriaForm.reset();
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
  }


  goBack(): void {
    this.router.navigate(['/batch/create-phase']);
  }
  logEC(): void {
    console.log('Evaluation Criteria with IDs:', this.columns);
  }



}
