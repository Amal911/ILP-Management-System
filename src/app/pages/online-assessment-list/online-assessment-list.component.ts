import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnlineAssessmentListCardComponent } from '../../components/online-assessment-list-card/online-assessment-list-card.component';
import { DatePipe, NgFor } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlineAssessmentTrainerListingService } from '../../services/API/online-assessment-trainer-listing.service';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { AllBatchesService } from '../../services/API/all-batches.service';

@Component({
  selector: 'app-online-assessment-list',
  standalone: true,
  imports: [
    OnlineAssessmentListCardComponent,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './online-assessment-list.component.html',
  styleUrls: ['./online-assessment-list.component.scss'],
})
export class OnlineAssessmentListComponent implements OnInit, OnDestroy {
  assessmentForm!: FormGroup;
  myToken: string = '';
  pendingAssessments: any[] = [];
  completedAssessments: any[] = [];
  formattedDate: string[] = [];
  batchName: string = '';
  Batches: any[] = [];
  userEmail: string | undefined;

  constructor(
    private onlineAssessmentTrainerListingService: OnlineAssessmentTrainerListingService,
    private msalService: MsalService,
    private datePipe: DatePipe,
    private batchListingService: AllBatchesService
  ) {}

  ngOnInit(): void {
    // this.loadAssessments(this.batchName);
    this.loadUserEmailAndBatch();
  }

  private loadUserEmailAndBatch(): void {
    this.getUserEmail().then((email) => {
      if (email) {
        this.loadBatch(email);
      } else {
        console.error('User email not found');
      }
    });
  }

  private getUserEmail(): Promise<string | undefined> {
    return new Promise((resolve) => {
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        const account: AccountInfo = accounts[0];
        resolve(account.username);
        this.userEmail = account.username;
        //console.log(account.username);
      } else {
        console.error('No accounts found');
        resolve(undefined);
      }
    });
  }

  private async loadBatch(userEmail: string): Promise<void> {
    try {
      // Fetch batches and convert to array
      const data: any[] = await this.batchListingService.getBatches().toPromise();
      this.Batches = data;

      console.log('Fetched Data:', data);

      for (const batch of data) {
        // Ensure traineeList is an array
        const traineeList = Array.isArray(batch.traineeList) ? batch.traineeList : [];

        // information for each batch
        console.log('Processing Batch:', batch.batchName);
        console.log('Trainee List:', batch.traineeList);

        // Check if trainee exists in the list
        const traineeExists = traineeList.some((trainee: any) => {
          console.log('Checking Trainee Email:', trainee.emailId);
          console.log('User Email:', userEmail);
          return trainee.emailId === userEmail;
        });

        if (traineeExists) {
          console.log('Match Found in Batch:', batch.batchName);
          await this.loadAssessments(batch.batchName);
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  }

  async loadAssessments(batchName: string): Promise<void> {
    try {
      const token = await this.getToken();
      console.log(batchName, 'It reached assessments');
      this.myToken = token; // Set the token to the class variable

      this.onlineAssessmentTrainerListingService.getAllOnlineAssessments(batchName).subscribe(
        async (data) => {
          console.log('assignments', data);
          data = Array.isArray(data) ? data : [data];

          for (const assessment of data) {
            if (assessment.status === 0) {
              assessment.link = `${assessment.link}/${this.myToken}`;
              const formattedDatePart = this.datePipe.transform(assessment.endDateTime, 'd MMMM yyyy');
              const formattedTimePart = this.datePipe.transform(assessment.endDateTime, 'HH:mm');
              assessment.endDateTime = `${formattedDatePart} at ${formattedTimePart}`;
              this.pendingAssessments.push(assessment);
            } else if (assessment.status === 3) {
              const formattedDatePart = this.datePipe.transform(assessment.endDateTime, 'd MMMM yyyy');
              const formattedTimePart = this.datePipe.transform(assessment.endDateTime, 'HH:mm');
              assessment.endDateTime = `${formattedDatePart} at ${formattedTimePart}`;

              const score = await this.fetchScores(assessment);
              assessment.score = score;
              this.completedAssessments.push(assessment);
              console.log('Completed:', assessment);
            }
          }
        },
        (error) => console.error('Error loading assessments:', error)
      );
    } catch (error) {
      console.error('Error loading assessments or acquiring token:', error);
    }
  }

  getToken(): Promise<string> {
    return this.msalService.instance
      .acquireTokenSilent({
        scopes: ['user.read'],
      })
      .then((response: AuthenticationResult) => {
        return response.accessToken;
      })
      .catch((error) => {
        console.error('Error acquiring token:', error);
        return '';
      });
  }

  async fetchScores(completedAssessment: any): Promise<any> {
    if (!this.userEmail || !completedAssessment.assessmentId) {
      console.error('User email or assessment ID is missing');
      return null;
    }

    try {
      console.log('Fetching scores for:', completedAssessment);
      const data = await this.onlineAssessmentTrainerListingService.getScores(
        this.userEmail,
        completedAssessment.assessmentId
      ).toPromise(); // Ensure the service returns a promise

      console.log('Fetched scores:', data);
      return data;
    } catch (error) {
      console.error('Error fetching scores:', error);
      return null; // Return null in case of an error
    }
  }

  ngOnDestroy(): void {
    this.myToken = '';
  }
}
