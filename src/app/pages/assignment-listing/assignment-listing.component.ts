import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/listing-card/listing-card.component";
import { DropdownComponent } from "../../components/dropdown/dropdown.component";

@Component({
    selector: 'app-assignment-listing',
    standalone: true,
    templateUrl: './assignment-listing.component.html',
    styleUrl: './assignment-listing.component.scss',
    imports: [ButtonComponent, ListingCardComponent, DropdownComponent]
})
export class AssignmentListingComponent {
  pendingAssignments = [
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      cardMainTitle: 'GG Hospital',
      cardFirstSubTitle: '20-June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 23-June-2024',
      cardLeftText: '21/38',
      cardLeftIcon: 'bi bi-people-fill fs-5',
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      cardMainTitle: 'Portfolio',
      cardFirstSubTitle: '18-June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 20-June-2024',
      cardLeftText: '3/38',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      cardMainTitle: 'Case Study',
      cardFirstSubTitle: '1-June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 13-June-2024',
      cardLeftText: '7/38',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    }
  ];

  completedAssignments = [
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      cardMainTitle: 'GG Hospital',
      cardFirstSubTitle: '20-June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 23-June-2024',
      cardLeftText: '21/38',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      cardMainTitle: 'Portfolio',
      cardFirstSubTitle: '18-June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 20-June-2024',
      cardLeftText: '3/38',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    },
    {
      cardMainIconSRC: 'assets/AssignmentListingMainIcon.png',
      cardMainTitle: 'Case Study',
      cardFirstSubTitle: '1-June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 13-June-2024',
      cardLeftText: '7/38',
      cardLeftIcon: 'bi bi-people-fill fs-5'
    }
  ];
  constructor(){}
}
