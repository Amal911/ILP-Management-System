import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../../components/button/button.component';
import { HollowButtonComponent } from "../../components/hollow-button/hollow-button.component";
import { Router } from '@angular/router';
import { CreateCriteriaService } from '../../services/API/create-criteria.service';

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

  constructor(private router:Router,private createCriteria:CreateCriteriaService) { }
  searchControl: FormControl = new FormControl('');

  columns:any[] =[];


  ngOnInit(): void {
    this.fetchCriteria();
    this.filteredColumns = [...this.columns];
    this.searchControl.valueChanges.subscribe((searchText) => {
      this.filteredColumns = this.columns.filter((column) =>
        column.assessment_type_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }



  fetchCriteria(){
    this.createCriteria.getAssessmentTypes().subscribe((criteria) => {
      this.columns = criteria;
      this.filteredColumns = [...this.columns];
    })
  }

  toggleEdit(eC: any): void {
    eC.editing = !eC.editing;
  }

  deleteEC(eC: any): void {
    if (confirm('Are you sure you want to delete this assessment type?')) {
      this.createCriteria.deleteAssessmentType(eC.id).subscribe({
        next: () => {
          this.columns = this.columns.filter((column) => column.id !== eC.id);
          this.filteredColumns = this.filteredColumns.filter((column) => column.id !== eC.id);
        },
        error: (err) => {
          console.error('Error deleting assessment type:', err);
          alert('An error occurred while deleting the assessment type. Please try again.');
        }
      });
    }
  }

  saveNewEC(): void {
    if (this.CriteriaForm.valid) {
      const eCName = this.CriteriaForm.get('eCName')?.value;
      const newAssessmentType = { assessmentTypeName: eCName };

      this.createCriteria.addNewAssessmentType(newAssessmentType).subscribe((response) => {
        const newId = response.id; // Assuming the response contains the new ID
        this.columns.push({ id: newId, assessmentTypeName: eCName });
        this.filteredColumns = [...this.columns];
        this.CriteriaForm.reset();
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 3000);
      });
    }
  }


  goBack(): void {
    this.router.navigate(['/batch/create-phase']);
  }
  logEC(): void {
    console.log('Evaluation Criteria with IDs:', this.columns);
  }

}
