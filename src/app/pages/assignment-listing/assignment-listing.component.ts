import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { AssignmentListingCardComponent } from "../../components/assignment-listing-card/assignment-listing-card.component";

@Component({
    selector: 'app-assignment-listing',
    standalone: true,
    templateUrl: './assignment-listing.component.html',
    styleUrl: './assignment-listing.component.scss',
    imports: [ButtonComponent, ListingCardComponent, DropdownComponent, AssignmentListingCardComponent]
})
export class AssignmentListingComponent {
  pendingAssignments = [
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      assessment_title: 'GG Hospital',
      post_date: '20-June 2024',
      due_date: '11/10/2024',
      totalCountOfTrainees: '38',
      totalSubmits:'21',
      cardLeftIcon: 'bi bi-people-fill fs-5',
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      assessment_title: 'Portfolio',
      post_date: '18-June 2024',
      due_date: '20-June-2024 11:00 PM',
      totalCountOfTrainees: '38',
      totalSubmits: '3',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      assessment_title: 'Case Study',
      post_date: '1-June 2024',
      due_date: '13-June-2024 11:00 PM',
      totalCountOfTrainees: '38',
      totalSubmits: '7',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    }
  ];

  completedAssessments = [
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      assessment_title: 'GG Hospital',
      post_date: '20-June 2024',
      due_date: '23-June-2024 11:00 PM',
      totalCountOfTrainees: '38',
      totalSubmits: '21',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      assessment_title: 'Portfolio',
      post_date: '18-June 2024',
      due_date: '20-June-2024 11:00 PM',
      totalCountOfTrainees: '38',
      totalSubmits: '3',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      assessment_title: 'Portfolio',
      post_date: '18-June 2024',
      due_date: '20-June-2024 11:00 PM',
      totalCountOfTrainees: '38',
      totalSubmits: '3',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    },
  ];
  constructor(){}
}
