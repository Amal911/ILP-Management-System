import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { AssignmentListingCardComponent } from "../../components/assignment-listing-card/assignment-listing-card.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-assignment-listing',
    standalone: true,
    templateUrl: './assignment-listing.component.html',
    styleUrl: './assignment-listing.component.scss',
    imports: [ButtonComponent, ListingCardComponent, DropdownComponent, AssignmentListingCardComponent,CommonModule]
})
export class AssignmentListingComponent {
  Assignments = [
    {
      assessment_title: 'GG Hospital',
      post_date: new Date('2024-06-20'),
      due_date: new Date('2024-10-11'),
      totalCountOfTrainees: '38',
      totalSubmits: '21',
    },
    {
      assessment_title: 'Portfolio',
      post_date: new Date('2024-06-18'),
      due_date: new Date('2024-06-20T23:00:00'),
      totalCountOfTrainees: '38',
      totalSubmits: '3',
    },
    {
      assessment_title: 'Case Study',
      post_date: new Date('2024-06-01'),
      due_date: new Date('2024-06-13T23:00:00'),
      totalCountOfTrainees: '38',
      totalSubmits: '7',
    },
    {
      assessment_title: 'GG Hospital',
      post_date: new Date('2024-06-20'),
      due_date: new Date('2024-06-23T23:00:00'),
      totalCountOfTrainees: '38',
      totalSubmits: '21',
    },
    {
      assessment_title: 'Portfolio',
      post_date: new Date('2024-06-18'),
      due_date: new Date('2024-06-20T23:00:00'),
      totalCountOfTrainees: '38',
      totalSubmits: '3',
    },
    {
      assessment_title: 'Portfolio',
      post_date: new Date('2024-06-18'),
      due_date: new Date('2024-06-20T23:00:00'),
      totalCountOfTrainees: '38',
      totalSubmits: '3',
    },
  ];

  todayDate: Date = new Date();

  constructor(){}
}
