import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-handed-in-assignments',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,FileUploadModule,ToastModule],
  templateUrl: './handed-in-assignments.component.html',
  styleUrl: './handed-in-assignments.component.scss',
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HandedInAssignmentsComponent {

  workForm: FormGroup;
  submitted: boolean = false;
  
  constructor(private fb: FormBuilder,private messageService: MessageService) {
    this.workForm = this.fb.group({
      links: this.fb.array([this.createLink()]),
      comments: ['', Validators.required],
      fileUpload: ['']

    });
  }
  createLink(): FormGroup {
    return this.fb.group({
      link: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  get links(): FormArray {
    return this.workForm.get('links') as FormArray;
  }

  addLink(): void {
    this.links.push(this.createLink());
  }

  removeLink(index: number): void {
    this.links.removeAt(index);
  }

  onSubmit() {
    debugger
    
      console.log({
        ...this.workForm.value,
        uploadedFiles: this.uploadedFiles
      });
      this.submitted = true;
   
  }
  show(){
    this.submitted = true;

  }
  

  onCancel() {
    if (this.workForm.valid) {
      this.submitted = true;
    } else {
      this.submitted = false;
    }
  }
  uploadedFiles: any[] = [];


  onUpload(event:FileUploadEvent) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
  
}
