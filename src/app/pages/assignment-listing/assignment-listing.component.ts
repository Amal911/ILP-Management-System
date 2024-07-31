import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { ListingCardComponent } from '../../components/batch-listing-card/batch-listing-card.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { AssignmentListingCardComponent } from '../../components/assignment-listing-card/assignment-listing-card.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProgramService } from '../../services/API/assessment-listing.service';

interface Assignment {
  id: number;
  assessmentTitle: string;
  createdDate: string;
  dueDateTime: string;
  totalCountOfTrainees: number;
  totalSubmits: number;
}

@Component({
  selector: 'app-assignment-listing',
  standalone: true,
  templateUrl: './assignment-listing.component.html',
  styleUrl: './assignment-listing.component.scss',
  imports: [
    ButtonComponent,
    ListingCardComponent,
    DropdownComponent,
    AssignmentListingCardComponent,
    CommonModule,
  ],
  providers:[DatePipe]
})
export class AssignmentListingComponent {

  programs: any[] = [];
  batches: any[] = [];
  programNames: string[] = [];
  batchNames: string[] = [];
  selectedProgram: any;
  selectedBatch: any;
  Assignments: any = [];
  todayDate: Date = new Date();
  userRole: string = '';
  userId: number = 0;

  constructor(private router: Router,private programService: ProgramService,private datePipe: DatePipe) {
    this.userRole = localStorage.getItem('roleName') || '';
    this.userId = parseInt(localStorage.getItem('UserId') || '0', 10);
  }

  ngOnInit() {
    if (this.userRole.toLowerCase() === 'trainee') {
      this.loadTraineeBatchAndAssignments();
    } else {
      this.loadPrograms();
    }
  }

  loadPrograms() {
    this.programService.getAllPrograms().subscribe(
      (data) => {
        this.programs = data;
        this.programNames = this.programs.map(p => p.programName);
        if (this.programs.length > 0) {
          this.selectedProgram = this.programs[0];
          this.loadBatches(this.selectedProgram.id);
        }
      },
      (error) => console.error('Error loading programs:', error)
    );
  }

  loadBatches(programId: number) {
    this.programService.getBatchesByProgramId(programId).subscribe(      
      (data) => {        
        this.batches = data;
        this.batchNames = this.batches.map(b => b.batchName);
        if (this.batches.length > 0) {
          this.selectedBatch = this.batches[0];
          this.loadAssignments(this.selectedBatch.id);
        } else {
          this.selectedBatch = null;
          this.Assignments = [];
        }
      },
      (error) => console.error('Error loading batches:', error)
    );
  }

  loadTraineeBatchAndAssignments() {
    this.programService.getBatchIdForTrainee(this.userId).subscribe(
      (batchId) => {
        if (batchId) {
          this.selectedBatch = { id: batchId };
          this.loadAssignments(batchId);
        } else {
          console.error('No batch found for trainee');
        }
      },
      (error) => console.error('Error loading trainee batch:', error)
    );
  }

  loadAssignments(batchId: number) {
    this.programService.getAssessmentsByBatchId(batchId).subscribe(
      (data) => {
        console.log('assignments', data);
        
        this.Assignments = data.map(assessment => ({
          id: assessment.id,
          assessment_title: assessment.assessmentTitle,
          post_date: new Date(assessment.createdDate),
          due_date: new Date(assessment.dueDateTime),
          totalCountOfTrainees: assessment.totalCountOfTrainees.toString(),
          totalSubmits: assessment.totalSubmits.toString(),
        }));
      },
      (error) => console.error('Error loading assignments:', error)
    );
  }

  onProgramChange(programName: string) {
    const program = this.programs.find(p => p.programName === programName);
    if (program) {
      this.selectedProgram = program;
      this.loadBatches(program.id);
    }
  }

  onBatchChange(batchName: string) {
    const batch = this.batches.find(b => b.batchName === batchName);
    if (batch) {
      this.selectedBatch = batch;
      this.loadAssignments(batch.id);
    }
  }

  navigateToCreateNew() {
    this.router.navigate(['assessments/create']);
  }
  navigateToEvaluateAssessment(id:number) {
    this.router.navigate(['handed-in',id]);
  }
  
}
